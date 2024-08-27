import {Register} from "../Core/Register";
import {State} from "../Core/State";
import {_map} from "../Core/Util";

export class StateMachineModel {

    handlers = [];
    state = {name:'default'};
    currentState = null;
    stateStack = [];
    actions = [];
    activeActions = {};

    constructor(engine) {
        this.engine = engine;
    }

    addStateHandler(h){
        h.connect(this.engine);
        this.handlers.push(h);

        if (!this.currentState) this.setState(this.state);
    }

    //
    // reduce(state, action) {
    //     switch (action.type) {
    //         case 'changeState':
    //             return {...state, name: action.name};
    //         default:
    //             return state;
    //     }
    // }
    //
    // setState(state) {
    //     const prevState = this.state?.name;
    //     const nextState = state.name;
    //     if (prevState !== nextState) {
    //         this.changeState(nextState);
    //     }
    //     this.state = state;
    // }

    setState(nextState, event) {
        if (this.currentState) {
            //remove old actions
            // this.actions = this.actions.filter(a => !this.currentState.actions.includes(a));
            this.currentState.deactivate();
        }
        this.currentState = this.handlers.find(s => (s instanceof State) && s.name === nextState.name);
        // if (this.currentState) {
        //     //apply new actions
        //     this.actions = this.actions.concat(this.currentState.actions);
        // }
        this.state = nextState;
        if ( this.currentState ) {
            this.currentState.activate(event, nextState);
            this.updateListeners();
        }
    }

    pushState(nextState, event){
        this.stateStack.push(this.state);
        this.setState(nextState, event);
        if (!this.currentState) {
            console.error('Diagram state is unknown, fallback to previous state', nextState);
            this.popState();
        }
    }

    popState() {
        if (this.stateStack.length === 0) {
            console.error('Diagram state have no previous state, state not changed');
            return;
        }
        const nextState = this.stateStack.pop();
        this.setState(nextState);
    }

    initCanvas(canvas) {
        if (this.canvas === canvas) return;
        this.canvas = canvas;
        this.activeActions = {};
        this.updateListeners();
    }

    deinitCanvas() {
        _map(this.activeActions, (value, key) => this.canvas.node.removeEventListener(key, value));
        this.activeActions = {};
        this.canvas = null;
    }



    updateListeners() {
        if (!this.canvas) return;
        const names = [];
        this.actions.concat(this.currentState?.actions||[]).forEach(a => {
            if (!names.includes(a.event)) names.push(a.event);
        });
        const activeNames = Object.keys(this.activeActions);
        const add = names.filter(k => !activeNames.includes(k));
        const rm = activeNames.filter(k => !names.includes(k));
        // console.log('update event handlers', {names, activeNames, add, rm});
        rm.forEach(k => {
            this.canvas.node.removeEventListener(k, this.activeActions[k]);
            delete this.activeActions[k];
        });
        add.forEach(k => {
            this.activeActions[k] = this.runAction.bind(this);
            this.canvas.node.addEventListener(k, this.activeActions[k]);
        });
    }

    runAction(event) {
        const run = i => {
            if (i.event === event.type && !event.isPropagationStopped) {
                i.handle(event, this.state);
            }
        };
        this.actions.forEach(run);
        (this.currentState?.actions || []).forEach(run);
    }
}