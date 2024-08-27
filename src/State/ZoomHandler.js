export class ZoomHandler {


    event = 'wheel';

    constructor(engine) {
        this.engine = engine;
    }
    handle(event){
        if (!event.ctrlKey)return;
        let canvas = this.engine.canvas;
        let zoom = canvas.zoom + (event.deltaY / -1200 );
        if (zoom < 0.05 || zoom > 5) return;
        let x = event.offsetX;
        let y = event.offsetY;
        if (event.target !== canvas.node){
            let cr = canvas.node.getBoundingClientRect();
            x = Math.round((event.clientX - cr.x) / canvas.zoom);
            y = Math.round((event.clientY - cr.y) / canvas.zoom);
        }

        let dz =  (canvas.zoom - zoom);
        let dx = x*dz;
        let dy = y*dz;
        canvas.update(zoom,dx, dy);
            event.preventDefault();
    }
}