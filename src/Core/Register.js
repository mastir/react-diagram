export class Register {

    items = [];

    register(item){
        this.items.push(item);
        if(typeof(item.onRegister) === 'function')item.onRegister(this);
    }

    unregister(item) {
        const idx = this.items.indexOf(item);
        if (idx === -1) return;
        this.items.splice(idx, 1);
        if(typeof(item.onUnregister) === 'function')item.onUnregister(this);
    }

    trigger(name, ...args){
        let target = this.items.filter( i => typeof(i[name]) === 'function');
        // console.log('trigger', name, target);
        target.forEach( i=> i[name](...args));
    }

}