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
                        this.link.setTargetPoint(this.calcPortConnectorLocation(elem, port.linkOffset));
                        this.link.target = port.model;
                        this.link.offsets[1] = port.linkOffset;
                        this.engine.links.redraw();
                        state.port.onConnect(port.model, this.link.model);
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
                this.link.setTargetPoint( [event.offsetX, event.offsetY]);
                (this.link.redraw  || this.engine.links.redraw)();
            }
        }];

    }

    calcPortConnectorLocation(port, offset = [0,0]){

        let n = this.engine.canvas.node.getBoundingClientRect();
        let p = port.getBoundingClientRect();



        let ox = 0;
        let x = (p.x - n.x + (offset[0] + 1) * p.height / 2 ) / this.engine.canvas.zoom;
        let y = (p.y - n.y + (offset[1] + 1) * p.height / 2 ) / this.engine.canvas.zoom;

        return [x, y];
    }

    activate(event,state) {
        let model = state.port.createLink();
        if (!model) return this.prevState();
        const p = this.calcPortConnectorLocation(state.ref, state.port.linkOffset);
        this.link = new LinkModel(model, state.port.model, p, state.port.linkOffset);
        this.engine.links.add(this.link);
        this.engine.canvas.lockInnerEvents(true);
    }

    deactivate() {
        this.engine.canvas.lockInnerEvents(false);
    }

}