import  {useContext} from "react";
import {NodeContext} from "./Node";
import {CanvasContext} from "./Canvas";

export function NodeDragZone({children, onMove=(x,y)=>{}, ...props}) {

    const node = useContext(NodeContext);
    const canvas = useContext(CanvasContext);
    return <div
        data-rg="node-drag"
        ref={e=>canvas.setNodeDragRef(node,e, onMove)}
        style={{cursor:'grab'}}
        {...props}
    >{children}</div>;

}