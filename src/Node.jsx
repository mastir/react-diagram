import React, {createContext, useContext, useEffect} from "react";
import {CanvasContext} from "./Canvas";

export const NodeContext = createContext(null);

export function Node({node, children}) {
    const canvas = useContext(CanvasContext);
    let [top, left] = canvas.pointToOffset(node.x,node.y);
    return <div
        className={'rd-node'}
        data-rg={'node'}
        style={{position:"absolute",top,left}}
        ref={e => canvas.setNodeRef(node, e) }
    >
        <NodeContext.Provider value={node}>
            {children}
        </NodeContext.Provider>
    </div>;
}