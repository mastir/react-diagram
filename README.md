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

    return <Diagram engine={engine} style={{minHeight:'100vh'}} links={links}>
        <Node model={node} position={[node.x,node.y]}>
              <NodeDragZone onMove={(x,y)=>{node.x=x;node.y=y}}>
                  <h1>Hello world!</h1>
              </NodeDragZone>
              {node.ports.map( (port,i) =>  <div key={i}>
                  <Port
                      key={i}
                      model={port}
                      canConnect={port2=>true}
                      onConnect={(port2,link) => {console.log('connect', port, port2, link); links.push(link)}}
                  >
                      <div style={{background:'#00F',width:16,height:16,display:'inline-block'}}/>
                  </Port>
                  {port.name}
              </div>)}
        </Node>
    </Diagram>;
```

# Components

## User defined types

TNode, TPort, TLink - any object representing element, please avoid object creation or duplication

## Diagram

Root component

| prop         | type             | description                                                                                          |
|--------------|------------------|------------------------------------------------------------------------------------------------------|
| engine*      | EngineModel      | Main diagram container                                                                               |
| links*       | TLink[]          | List of all links to display                                                                         |
| createLink   | (TPort)=>TLink   | TLink factory                                                                                        |
| getLinkStyle | (TLink) => style | default {color:'#FFF', width: 2, curviness: 50}                                                      | 
| linksLayer   | React.Element    | You can pass LinksLayer state handler wrap component (to avoid whole diagram redraw on link updates) |

## Node

Container for any element placed in Diagram

| prop      | type            | description                            |
|-----------|-----------------|----------------------------------------|
| model*    | TNode           | any object represented by this element |
| position* | [number,number] | node position x axis                   |
| key       | string          | required for all nodes, its recomended to use any generated id|

## Port

Container for connectors in Node

| prop   | type  | description                            |
|--------|-------|----------------------------------------|
| model* | TPort | any object represented by this element |

## NodeDragZone

| prop   | type        | description                    |
|--------|-------------|--------------------------------|
| onMove  | (x,y)=>void | callback for node moved action |

## LinksLayer

react component to render links in svg

## EngineModel

This is core container of the diagram. Engine contains 3 services: canvas, state, links

### CanvasModel

Contain information about currently rendered elements and provide methods to work with coordinates and elements

### StateMachineModel

Event processing service, active state handler can trigger state transitions. 
All of the action logic ([zoom](src/State/ZoomHandler.js), [drag canvas](src/State/DragCanvasState.js), [move node](src/State/DragNodeState.js), [create link](src/State/CreateLinkState.js)) realised in state handlers and can be extended and customized.

### LinkListModel

Contain information about rendered TLink[] models and methods to redraw them