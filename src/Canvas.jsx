import {createContext, useContext} from "react";
import {EngineContext} from "./Diagram";

export const CanvasContext = createContext(null);

export function Canvas({children,width=4000,height=4000,getLinks}) {
    const engine = useContext(EngineContext);
    const model = engine.canvas;
    model.setSize(width, height);
    return <div
        className={"rd-view"}
        style={{
            width:'100%',
            height:'100%',
            position: 'relative',
            overflow: 'auto',
            margin:0,
            padding:0,
            flex:'1 1'
    }}
    >
        <div
            style={{position:"absolute", top:0, left:0, overflow:"visible"}}
            ref={e => model.setRootNode(e)}
        >
            <div
                data-rg={'canvas'}
                className={'rd-canvas'}
                style={{width,height,position:'relative'}}
            >
                <div style={{width,height}}  ref={r => {model.inner = r}}>
                    <CanvasContext.Provider value={model}>
                        {children}
                    </CanvasContext.Provider>
                </div>
            </div>
        </div>
    </div>;
}