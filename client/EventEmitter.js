'use strict';

class EventEmitter {
    constructor() {
        this.events = {}; // hash of array of function
    }
    
    on(name, fn) {
        if (this.events[name])
            this.events[name].push(fn);
        else
            this.events[name] = [fn];
    }
    emit(name, ...data) {
        if(this.events[name]) {
            this.events[name].forEach(element => {
                element(...data);
            });
        } else {
            return;
        }
    }
}

export default EventEmitter;
