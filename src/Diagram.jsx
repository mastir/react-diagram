import {createContext} from "react";
import {Canvas} from "./Canvas";
import {LinksLayer} from "./LinksLayer";

export const EngineContext = createContext(null);


export function Diagram({children, engine, style={}, size=[4000,4000], ...opts}){
    return <EngineContext.Provider value={engine}>
        <div className={"rd-root"} style={{...style, display:'flex', flexDirection:'column'}} ref={(e => engine.setRoot(e))}  {...opts}>
            <Canvas width={size[0]} height={size[1]}>
              <LinksLayer />
                    {children}
            </Canvas>
        </div>
    </EngineContext.Provider>;
}


