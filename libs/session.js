class Session {
    constructor() {
        this.name = "";
        this.numberOfCards = 0;
        this.volume = 50;
        this.bestScore = 0;
        this.lastScore = 0;
    }
    load() {
        // load the settings from session storage
        this.name = sessionStorage.getItem("name") || "Guest";
        this.numberOfCards = sessionStorage.getItem(`numberOfCards_${this.name}`) || 48;
        this.volume = sessionStorage.getItem(`volume_${this.name}`) || 50;
        this.bestScore = parseInt(sessionStorage.getItem(`bestScore_${this.name}`)) || 0;
        this.lastScore = parseInt(sessionStorage.getItem(`lastScore_${this.name}`)) || 0;
        if (Number.isNaN(this.bestScore)) {
            this.bestScore = 0;
        }

        if (isNaN(this.lastScore)) {
            this.lastScore = 0;
        }
    };
    saveSettings(playerName, numberOfCards, volume) {
        // save the settings to session storage
        sessionStorage.setItem("name", playerName);
        sessionStorage.setItem(`numberOfCards_${playerName}`, numberOfCards);
        sessionStorage.setItem(`volume_${playerName}`, volume);
        this.load()
    };
    updateScores(tries, matched) {
        let score = Math.round((matched / tries) * 100);
        // update the best score and last score
        if (score > this.bestScore || this.bestScore === 0) {
            sessionStorage.setItem(`bestScore_${this.name}`, score.toString());
        }
        sessionStorage.setItem(`lastScore_${this.name}`, score.toString());
        this.load()
    }
}