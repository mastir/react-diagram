import {Diagram} from "./Diagram";
import React, {memo, useMemo} from "react";
import {Node} from "./Node";
import {Port} from "./Port";
import {EngineModel} from "./Model/EngineModel";
import {DefaultState} from "./State/DefaultState";
import {CreateLinkState} from "./State/CreateLinkState";
import './app.css';
import {DragNodeState} from "./State/DragNodeState";
import {ZoomHandler} from "./State/ZoomHandler";
import {NodeDragZone} from "./NodeDragZone";
import {DragCanvasState} from "./State/DragCanvasState";


function App() {


    const engine = useMemo(() => {
        const engine = new EngineModel();
        engine.state.addStateHandler(new DefaultState());
        engine.state.addStateHandler(new CreateLinkState());
        engine.state.addStateHandler(new DragNodeState());
        engine.state.addStateHandler(new DragCanvasState());
        engine.state.actions.push(new ZoomHandler(engine));
        window.engine = engine;
        return engine;
    }, []);


    let node = {
        x: -85,
        y: -60,
        ports: [
          {name: 'First port!'},
          {name: 'Second port'},
        ]
    }

    return <Diagram engine={engine} style={{minHeight:'100vh'}}>
        <Node node={node}>
              <NodeDragZone onMove={(x,y)=>{node.x=x;node.y=y}}>
                  <h1>Hello world!</h1>
              </NodeDragZone>
              {node.ports.map( (port,i) =>  <div key={i}>
                  <Port
                      key={i}
                      port={port}
                      canConnect={()=>true}
                      onConnect={port2 => {console.log('connect', port, port2)}}
                  >
                      <div style={{background:'#00F',width:16,height:16,display:'inline-block'}}/>
                  </Port>
                  {port.name}
              </div>)}
        </Node>
    </Diagram>;
}

const memoApp = memo(App);

export default memoApp;
