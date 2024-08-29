import {State} from "../Core/State";
import {point_sum} from "../Core/Util.js";

export class DragNodeState extends State {

       constructor() {
        super();
        this.name = 'dragNode';
        this.actions = [{
            event: 'mouseup',
            handle: (event,state) => {
                state.node.onMove(...this.engine.canvas.offsetToPoint(...this.target_pos));
                this.cleanup();

                this.prevState();
            }
        } , {
            event: 'mousemove',
            handle: (event,state) => {
                let move = [
                    (event.clientX - this.orig_point[0]) / this.engine.canvas.zoom,
                    (event.clientY - this.orig_point[1]) / this.engine.canvas.zoom,
                ];
                this.target_pos = [
                    this.orig_position[0] + move[0],
                    this.orig_position[1] + move[1],
                ];

                this.ref.style.left = this.target_pos[0]+'px';
                this.ref.style.top = this.target_pos[1]+'px';
                if (!this.links) {
                    //detect ports
                    const ports = this.engine.canvas.refs.port.filter(p => p.parent === state.node.model).map(p => p.model);
                    //move links
                    this.links = {
                        source: this.findNodeLinks('source', ports),
                        target: this.findNodeLinks('target', ports),
                    };
                }

                let has_links = false;
                const move_links = (links,idx)=>links.forEach(l => {
                    has_links = true;
                    if (undefined === l._points)l._points = l.points.slice();
                    l.points[idx] = point_sum(l._points[idx], move);
                });

                move_links(this.links.source, 0);
                move_links(this.links.target, 1);

                if (has_links) this.engine.links.redraw();
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

    findNodeLinks(type, ports){
        return this.engine.links.items.filter( l => ports.indexOf(l[type]) !== -1)
    }

    cleanup(){
        if (this.links){
            Object.values(this.links).forEach(
                a => a.forEach(
                    l => delete l._points
                )
            );
        }
    }

}