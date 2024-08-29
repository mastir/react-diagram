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


}