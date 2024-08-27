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
		//
		// // this.childStates = [new SelectingState()];
		// this.dragCanvas = new DragCanvasState();
		// this.dragNewLink = new DragNewLinkState({allowLooseLinks: false});
		// this.dragItems = new DragDiagramItemsState();
		//
        // // determine what was clicked on
		// this.registerAction(
		// 	new Action({
		// 		type: InputType.MOUSE_DOWN,
		// 		fire: (event) => {
		// 			if (event.event.button !== 0) {
		// 				return;
		// 			}
		// 			const element = this.engine.getActionEventBus().getModelForEvent(event);
		//
		// 			// the canvas was clicked on, transition to the dragging canvas state
		// 			if (!element) {
		// 				this.transitionWithEvent(this.dragCanvas, event);
		// 			}
		// 			// initiate dragging a new link
		// 			else if (element instanceof PortModel) {
		// 				if (element instanceof DataPortModel && element.port_type === PORT_TYPE.target){
		// 					if (Object.keys(element.getLinks()).length === 0){
		// 						//@todo show context menu
		// 					} else {
		// 						this.transitionWithEvent(new DragSourceLinkState(), event);
		// 					}
		// 				} else {
		// 					this.transitionWithEvent(this.dragNewLink, event);
		// 				}
		// 			}
		// 			// move the items (and potentially link points)
		// 			else {
		// 				this.transitionWithEvent(this.dragItems, event);
		// 			}
		// 		}
		// 	})
		// );
		// //
		// // this.registerAction(
		// //
		// // )
		//
		//
		// // touch drags the canvas
		// this.registerAction(
		// 	new Action({
		// 		type: InputType.TOUCH_START,
		// 		fire: (event) => {
		// 			this.transitionWithEvent(new DragCanvasState(), event);
		// 		}
		// 	})
		// );
        // //
		// // this.registerAction(
		// // 	new Action({
		// // 		type: InputType.MOUSE_UP,
		// // 		fire: (event) => {
		// // 			const element = this.engine.getActionEventBus().getModelForEvent(event);
        // //
		// // 			if (element instanceof PortModel) this.transitionWithEvent(this.createLink, event);
		// // 		}
		// // 	})
		// // );
	}
}