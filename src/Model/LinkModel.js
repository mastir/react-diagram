

export class LinkModel {

    source = null;
    target = null;

    constructor(model, source, xy, offset=[0,0]) {
        this.model = model;
        this.source = source;
        this.points = [xy, xy];
        this.offsets = [offset, offset.map(o=>0-o)];
    }

    setTargetPoint(p){
        this.points[1] = p;
    }

}