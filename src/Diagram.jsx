import {createContext} from "react";
import {Canvas} from "./Canvas";
import {LinksLayer} from "./LinksLayer";

export const EngineContext = createContext(null);


export function Diagram({
    engine,
    style={},
    size=[4000,4000],
    children,
    linksLayer,
    ...other
}){
    let {
        links = [],
        createLink=port=>[port,null],
        getLinkStyle=model=>({color:'#4393E4',width:2,curviness:50}),
        ...opts
    } = other;
    return <EngineContext.Provider value={engine}>
        <div className={"rd-root"} style={{height:'100%', ...style, display:'flex', flexDirection:'column'}} ref={(e => engine.setRoot(e))}  {...opts}>
            <Canvas width={size[0]} height={size[1]}>
                {linksLayer ? linksLayer : <LinksLayer { ...{links, createLink,getLinkStyle}} />}
                {children}
            </Canvas>
        </div>
    </EngineContext.Provider>;
}


