import {State} from "../Core/State";

export class DragCanvasState extends State {

    constructor() {
        super();
        this.name = 'dragCanvas';
        this.actions = [{
            event: 'mouseup',
            handle: (event,state) => {
                this.prevState();
            }
        } , {
            event: 'mousemove',
            handle: (event,state) => {
                let move = [
                    this.orig_point[0] - event.offsetX,
                    this.orig_point[1] - event.offsetY
                ];
                this.engine.canvas.node.parentNode.scrollBy(...move);
            }
        }];
    }

    activate(event) {
        this.engine.canvas.lockInnerEvents(true);
        this.old_cursor = this.engine.canvas.setCursor('all-scroll');
        this.orig_point = [event.offsetX, event.offsetY];
    }

    deactivate() {
        this.engine.canvas.lockInnerEvents(false);
        this.engine.canvas.setCursor(this.old_cursor);
        delete this.old_cursor;
    }

}