import {createContext, useContext, useReducer} from "react";
import {EngineContext} from "./Diagram";


const StateMachineContext = createContext(null);

export function StateMachine({defaultState, children}) {
    const engine = useContext(EngineContext);
    const model = engine.state;
    const [state, dispatch] = useReducer(model.reduce, {name:defaultState||'default'});
    model.setState(state);
    model.dispatch = dispatch;
    return <StateMachineContext.Provider value={dispatch}>{children}</StateMachineContext.Provider>;
}