

export class LinkModel {


    constructor(sx,sy,ox=sx,oy=sy) {
        this.target = this.source = [[sx, sy], [ox,oy]];
    }

    setTargetPoint(x,y,ox=x,oy=y){
        this.target = [[x,y], [ox,oy]];
    }


}