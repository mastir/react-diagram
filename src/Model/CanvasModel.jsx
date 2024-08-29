import {_map} from "../Core/Util";

export class CanvasModel {

    refs = {};
    dx = 0;
    dy = 0;
    zoom = 1;

    onRegister(engine) {
        this.engine = engine;
        if (this.node) this.engine.trigger('initCanvas', this.node);
    }

    setSize(w,h){
        this.w = w;
        this.h = h;
    }

    offsetToPoint(x,y){
        return [Math.round(x - this.w/2), Math.round(y - this.h / 2)];
    }

    pointToOffset(x,y){
        return [Math.round(x + this.w/2), Math.round(y + this.h / 2)];
    }

    lockInnerEvents(lock = true){
        this.inner.style.pointerEvents = lock ? 'none' : 'all';
    }

    setCursor(cursor){
        let old = this.node.style.cursor;
        this.node.style.cursor = cursor;
        return old;
    }

    updateStyle() {
        if (!this.node) return;

        let size = this.zoom < 1 ? [this.w, this.h] :[Math.round(this.w / this.zoom), Math.round(this.h / this.zoom)];
        let offset = [size[0] * (this.zoom - 1) / 2, size[1] * (this.zoom - 1) / 2, ]

        this.node.style.transform = ' scale(' + this.zoom + ')';
        this.node.style.top = offset[1]+'px';
        this.node.style.left =  offset[0]+'px';
        this.node.style.width = size[0] +'px';
        this.node.style.height = size[1]+'px';
        // translate(' +  + 'px,' + offset.y + 'px)
        this.node.parentNode.scrollBy(-this.dx, -this.dy);
        this.dx = this.dy = 0;
    }

    update(zoom,dx, dy) {
        this.zoom = zoom;
        this.dx = dx;
        this.dy = dy;
        this.updateStyle();
    }

    setRootNode(node) {
        if (this.engine && this.node) {
            this.engine.trigger('deinitCanvas', this);
        } else {
            //initial scroll
            let r = node.parentNode.getBoundingClientRect();
            node.parentNode.scroll((this.w-r.width)/2,(this.h-r.height)/2);
        }
        this.node = node;
        if (!node) return;
        if (this.engine) this.engine.trigger('initCanvas', this);
        this.updateStyle();
    }

    setNodeRef(node, ref) {
        return this.setRef('node', {model: node, ref});
    }

    setNodeDragRef(node, ref, onMove) {
        return this.setRef('node-drag', {model:node, ref, onMove});
    }

    updateRef(type, model, opts) {
        let ref = this.refs[type].find(n => model === n.model);
        if (ref){
            _map(opts, (value,key)=>ref[key] = value);
        }
    }

    setRef(type, {ref, ...opt}) {
        if (this.refs[type] === undefined) {
            this.refs[type] = [];
        }
        let current = this.refs[type].find(n => opt.model === n.model);
        if (!ref) {
            const idx = this.refs[type].indexOf(current);
            if (!idx) {
                return current;
            }
            this.refs[type].splice(idx, 1);
            // this.engine && this.engine.trigger('remove_' + type, current);
        } else {
            if (!current) {
                current = {ref, ...opt};
                this.refs[type].push(current);
                // this.engine && this.engine.trigger('add_' + type, current);
            } else {
                if (ref !== current) {
                    // this.engine.trigger('remove_' + type, current);
                    current.ref = ref;
                    _map(opt, (value, key) => current[key] = value);
                    // this.engine && this.engine.trigger('add_' + type, current);
                } else {
                    _map(opt, (value, key) => current[key] = value);
                }
            }
        }
        return current;
    }
}