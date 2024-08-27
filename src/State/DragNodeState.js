import {State} from "../Core/State";

export class DragNodeState extends State {

    constructor() {
        super();
        this.name = 'dragNode';
        this.actions = [{
            event: 'mouseup',
            handle: (event,state) => {
                state.node.onMove(...this.engine.canvas.offsetToPoint(...this.target_pos));
                this.prevState();
            }
        } , {
            event: 'mousemove',
            handle: (event,state) => {
                //skip initial
                // if (event.target !== this.engine.canvas.node) return;
                let move = [
                    event.clientX - this.orig_point[0],
                    event.clientY - this.orig_point[1]
                ];
                this.target_pos = [
                    this.orig_position[0] + move[0] / this.engine.canvas.zoom,
                    this.orig_position[1] + move[1] / this.engine.canvas.zoom,
                ];
                // console.log('move', this.orig_position, target_pos);
                this.ref.style.left = this.target_pos[0]+'px';
                this.ref.style.top = this.target_pos[1]+'px';

            }
        }];
    }

    activate(event, state) {
        this.engine.canvas.lockInnerEvents(true);
        this.old_cursor = this.engine.canvas.setCursor('grabbing');
        this.orig_point = [event.clientX, event.clientY];
        this.ref = this.findTargetElement(state.ref, 'node');
        this.orig_position = [parseInt(this.ref.style.left), parseInt(this.ref.style.top)];
    }

    deactivate() {
        this.engine.canvas.lockInnerEvents(false);
        this.engine.canvas.setCursor(this.old_cursor);
        delete this.old_cursor;
    }
}