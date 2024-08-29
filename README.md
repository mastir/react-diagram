This project created as simple replacement for [projectstorm/react-diagrams](https://github.com/projectstorm/react-diagrams).

# What is it

React diagram is a collection of base components to create flow chart or process flow.

# What is included

 - React components to implement base logic: Diagram, Node, Port, NodeDragZone
 - callbacks to handle business logic: Port.canConnect, Port.onConnect, NodeDragZone.onMove
 - base state handlers for: scroll, zoom, drag view, move nodes, connect ports.

# How to use

```js

    const engine = useMemo(() => {
        const engine = new EngineModel();
        engine.state.addStateHandler(new DefaultState());
        engine.state.addStateHandler(new CreateLinkState());
        engine.state.addStateHandler(new DragNodeState());
        engine.state.addStateHandler(new DragCanvasState());
        engine.state.actions.push(new ZoomHandler(engine));
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
    
    let links = [];

    return <Diagram engine={engine} style={{minHeight:'100vh'}} getLinks={()=>links}>
        <Node node={node}>
              <NodeDragZone onMove={(x,y)=>{node.x=x;node.y=y}}>
                  <h1>Hello world!</h1>
              </NodeDragZone>
              {node.ports.map( (port,i) =>  <div key={i}>
                  <Port
                      key={i}
                      port={port}
                      canConnect={()=>true}
                      onConnect={port2 => {console.log('connect', port, port2); links.push([port,port2])}}
                  >
                      <div style={{background:'#00F',width:16,height:16,display:'inline-block'}}/>
                  </Port>
                  {port.name}
              </div>)}
        </Node>
    </Diagram>;
```

# Why not react-diagrams?

| feature             | react-diagrams             | react-diagram    |
|---------------------|----------------------------|------------------|
| component structure | complicated                | react components |
| models              | strictly typed             | any js object    |
| serialization       | in models                  | -                |
| deserialization     | in models                  | -                |
| business logic      | in models                  | react components |
| factories           | for models and components  | -                |
| state machine       | complicated, many features | simple           |
| state handlers      | default (replaceable)      | optional         |
| canvas model        | 4 packages                 | minimal          |
| time to learn       | 3 days                     | <1 hour          |

