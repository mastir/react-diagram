export class LinkListModel {

    items = [];
    update = (items) => {
    }

    add(link) {
        this.update(items => items.concat(link));
    }

    remove(link) {
        this.update(items => items.filter( i => i !== link));
    }

    redraw(){

    }

    on_remove_port(port){
        const unlink = !!this.items.find(l => l.source === port.model || l.target === port.model);
        if (unlink){
            this.update(items => items.filter(l => !(l.source === port.model || l.target === port.model)));
        }
    }


}