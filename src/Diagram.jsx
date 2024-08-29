import {createContext} from "react";
import {Canvas} from "./Canvas";
import {LinksLayer} from "./LinksLayer";

export const EngineContext = createContext(null);


export function Diagram({
    engine,
    style={},
    size=[4000,4000],
    children,
    ...other
}){
    let {
        links = [],
        getLinkPorts=link=>link,
        createLink=port=>[port,null],
        ...opts
    } = other;
    return <EngineContext.Provider value={engine}>
        <div className={"rd-root"} style={{height:'100%', ...style, display:'flex', flexDirection:'column'}} ref={(e => engine.setRoot(e))}  {...opts}>
            <Canvas width={size[0]} height={size[1]}>
              <LinksLayer { ...{links, getLinkPorts, createLink}} />
                    {children}
            </Canvas>
        </div>
    </EngineContext.Provider>;
}


