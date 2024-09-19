import React from "react";

import EngineModel from "./Model/EngineModel";
import Diagram from "./Diagram";
import Node from "./Node";
import Port from "./Port";
import NodeDragZone from "./NodeDragZone";
import State from "./Core/State";
import DefaultState from "./State/DefaultState";
import CreateLinkState from "./State/CreateLinkState";
import DragNodeState from "./State/DragNodeState";
import DragCanvasState from "./State/DragCanvasState";
import ZoomHandler from "./State/ZoomHandler";

const engine = useMemo(() => {
  const engine = new EngineModel();
  engine.state.addStateHandler(new DefaultState());
  engine.state.addStateHandler(new CreateLinkState());
  engine.state.addStateHandler(new DragNodeState());
  engine.state.addStateHandler(new DragCanvasState());
  engine.state.actions.push(new ZoomHandler(engine));
  return engine;
}, []);

const node = {
  x: -85,
  y: -60,
  ports: [{ name: "First port!" }, { name: "Second port" }],
};

const links = [];

function App() {
  return (
    <Diagram engine={engine} style={{ minHeight: "100vh" }} links={links}>
      <Node model={node} position={[node.x, node.y]}>
        <NodeDragZone
          onMove={(x, y) => {
            node.x = x;
            node.y = y;
          }}
        >
          <h1>Hello world!</h1>
        </NodeDragZone>
        {node.ports.map((port, i) => (
          <div key={i}>
            <Port
              key={i}
              model={port}
              canConnect={(port2) => true}
              onConnect={(port2, link) => {
                console.log("connect", port, port2, link);
                links.push(link);
              }}
            >
              <div
                style={{
                  background: "#00F",
                  width: 16,
                  height: 16,
                  display: "inline-block",
                }}
              />
            </Port>
            {port.name}
          </div>
        ))}
      </Node>
    </Diagram>
  );
}

export default App;
