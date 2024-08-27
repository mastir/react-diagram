import {State} from "../Core/State";
import {LinkModel} from "../Model/LinkModel";

export class CreateLinkState extends State {
    constructor() {
        super();
        this.name = 'createLink';
        this.actions = [{
            event: 'mouseup',
            handle: (event, state) => {
                this.engine.canvas.lockInnerEvents(false);
                if (this.link){
                    let target = document.elementFromPoint(event.clientX, event.clientY);
                    const elem = this.findTargetElement(target , 'port');
                    const port = this.findModel(elem);
                    // const type = elem.dataset.rg;
                    let canLink = port && state.port.model !== port.model;
                    canLink = canLink && port.canConnect(state.port.model);
                    canLink = canLink && state.port.canConnect(port.model);
                    if (canLink) {
                        this.link.setTargetPoint(...this.calcPortConnectorLocation(elem));
                        this.link.ports = [state.port.model, port.model];
                        this.engine.links.redraw();
                        state.port.onConnect(port.model, this.link);
                        port.onConnect(state.port.model, this.link);
                    } else {
                        this.engine.links.remove(this.link);
                    }
                }
                this.link = null;
                this.prevState();
            }
        },{
            event: 'mousemove',
            handle: (event,state)=>{
                this.link.setTargetPoint(event.offsetX, event.offsetY);
                this.engine.links.redraw();
            }
        }];

    }

    calcPortConnectorLocation(port){

        let n = this.engine.canvas.node.getBoundingClientRect();
        let p = port.getBoundingClientRect();

        // let ox = node.x + node.width / 2 > p.x ? p.width : 0;
        let ox = 0;
        let x = (p.x - n.x) / this.engine.canvas.zoom + ox;
        let y = (p.y - n.y + p.height / 2) / this.engine.canvas.zoom;

        return [ x, y, ox === 0 ? x - 50 : x + 50, y ];
    }

    activate(event,state) {
        const p = this.calcPortConnectorLocation(state.ref);
        this.link = new LinkModel(...p);
        this.engine.links.add(this.link);
        this.engine.canvas.lockInnerEvents(true);
    }

    deactivate() {
        this.engine.canvas.lockInnerEvents(false);
    }

}