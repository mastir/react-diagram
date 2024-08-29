import {useContext} from "react";
import {NodeContext} from "./Node";
import {CanvasContext} from "./Canvas";

export function Port({
     model,
     children,
     style={},
     linkOffset = [0,0],
     canConnect=(port, link)=>true,
     onConnect=(port, link)=>{link.target = port},
     createLink=()=>({source: model}),
}) {
    const node = useContext(NodeContext);
    const canvas = useContext(CanvasContext);

    return <div
        className={'rd-port'}
        data-rg={'port'}
        ref={ref=>canvas.setRef('port', {model, parent: node, ref, onConnect, canConnect, createLink, linkOffset})}
        style={{...style,display:"inline-block", lineHeight:0}}
    >{children}</div>;
}