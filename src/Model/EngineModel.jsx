import {Register} from "../Core/Register";
import {StateMachineModel} from "./StateMachineModel";
import {LinkListModel} from "./LinkListModel";
import {CanvasModel} from "./CanvasModel";

export class EngineModel extends Register {

    constructor() {
        super();
        this.state = new StateMachineModel(this);
        this.links = new LinkListModel();
        this.canvas = new CanvasModel(this);
        this.register(this.state);
        this.register(this.links);
        this.register(this.canvas);
    }

    setRoot(root) {
        this.trigger(root ? 'initDom' : 'deinitDom', this.root);
        this.root = root;
    }

}