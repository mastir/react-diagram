import {useContext} from "react";
import {NodeContext} from "./Node";
import {CanvasContext} from "./Canvas";

export function Port({
     port,
     children,
     style={},
     canConnect=(port, link)=>true,
     onConnect=(port, link)=>{}
}) {
    const node = useContext(NodeContext);
    const canvas = useContext(CanvasContext);

    return <div
        className={'rd-port'}
        data-rg={'port'}
        ref={e=>canvas.setNodePortRef(node,port,e,onConnect,canConnect)}
        style={{...style,display:"inline-block", lineHeight:0}}
    >{children}</div>;
}