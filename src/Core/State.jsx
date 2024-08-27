export class State {

    actions = [];

    connect(engine){
        this.engine = engine;
    }


    activate(){

    }

    deactivate(){

    }

    nextState(state){
        this.engine.state.pushState(state);
    }

    prevState() {
        this.engine.state.popState();
    }



    findTargetElement(t, type) {
        if (!this.engine.canvas.node.contains(t)) return null;
        let found;
        while (t) {
            found = t.dataset?.rg;
            if (found !== undefined) {
                if (found === type || type === undefined) return t;
                if (found === 'canvas') return null;
            }
            t = t.parentNode;
        }
    }

    findModel(element) {
        if (!element) return null;
        const type = element.dataset.rg;
        if (type === undefined) return null;
        if (type === 'canvas') return this.engine.canvas;
        return this.engine.canvas.refs[type].find( i => i.ref === element);
    }



}