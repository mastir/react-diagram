import {State} from "../Core/State";

export class DefaultState extends State {
    constructor() {
		super();
		this.name = 'default';
		this.actions = [{
			event: 'mousedown',
			handle: (event) =>{
				document.elementFromPoint(event.x, event.y);
				const elem = this.findTargetElement(event.target/* , 'port' */);
				if (!elem) return;
				const type = elem.dataset.rg;
				let model = this.findModel(elem);
				// console.log('default state event', {elem, model, event});

				if (type === 'port') {
					this.engine.state.pushState({name:'createLink', port: model, ref: elem}, event);
					event.stopPropagation();
					event.preventDefault();
				}
				if (type === 'node-drag') {
					this.engine.state.pushState({name:'dragNode', node: model, ref: elem}, event);
				}
				if (type === 'canvas') {
					this.engine.state.pushState({name: 'dragCanvas', ref:elem, node: model}, event);
				}
			}
		}
		]
	}
}