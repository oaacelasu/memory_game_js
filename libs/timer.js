class Timer {
    constructor() {
        this._timer = null;
        this.elapsed = 0;
        this.listeners = [];
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    restart() {
        this.stop();
        this.start();
    }

    start() {
        console.log("Starting timer");
        if (!this._timer) {
            console.log("Starting...");
            this._timer = setInterval(() => {
                this.elapsed++;
                this.listeners.forEach(listener => listener(this.toString()));
            }, 1000);
        }
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