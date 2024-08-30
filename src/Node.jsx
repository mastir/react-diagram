import {createContext, useContext} from "react";
import {CanvasContext} from "./Canvas";

export const NodeContext = createContext(null);

export function Node({model, position:[x, y], children}) {
    const canvas = useContext(CanvasContext);
    let [left, top] = canvas.pointToOffset(x,y);
    return <div
        className={'rd-node'}
        data-rg={'node'}
        style={{position:"absolute",top,left}}
        ref={e => canvas.setNodeRef(model, e) }
    >
        <NodeContext.Provider value={model}>
            {children}
        </NodeContext.Provider>
    </div>;
}