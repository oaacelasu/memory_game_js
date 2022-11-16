"use strict";
/*
 * Memory Game - Timer class
 */
// this class is used to create a timer
class Timer {

    //constructor that defines properties for _timer, elapsed, listeners
    constructor() {
        this._timer = null;
        this.elapsed = 0;
        this.listeners = [];
    }

    // this method is used to add a listener to the timer
    addListener(listener) {
        this.listeners.push(listener);
    }

    restart() {
        this.stop();
        this.start();
    }

    start() {
        if (!this._timer) {
            this._timer = setInterval(() => {
                this.elapsed++;
                this.listeners.forEach(listener => listener(this.toString()));
            }, 1000);
        }
    }

    pause() {
        clearInterval(this._timer);
        this._timer = null;
    }

    stop() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
        this.elapsed = 0;
    }

    toString() {
        let t = new Date(1970, 0, 1)
        t.setSeconds(this.elapsed); // Epoch
        return t.toTimeString().replace(/.*(\d{2}:\d{2}).*/, "$1");
    }
}