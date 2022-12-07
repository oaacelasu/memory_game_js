

const library_scores = {
    triesCount:0,
    matchedCount: 0,
    bestScore: 0,
    lastScore: 0,
    name: "",
    // load the session settings and library_scores from session storage by the player name
    load() {
        this.bestScore = parseInt(sessionStorage.getItem(`bestScore_${this.name}`)) || 0;
        this.lastScore = parseInt(sessionStorage.getItem(`lastScore_${this.name}`)) || 0;

        if (Number.isNaN(this.bestScore)) {
            this.bestScore = 0;
        }

        if (isNaN(this.lastScore)) {
            this.lastScore = 0;
        }
    },

    // save the score for the current player
    updateScores() {
        let score = Math.round((this.matchedCount / this.triesCount) * 100);

        // update the best score and last score in the session storage
        if (score > this.bestScore || this.bestScore === 0) {
            sessionStorage.setItem(`bestScore_${this.name}`, score.toString());
        }
        sessionStorage.setItem(`lastScore_${this.name}`, score.toString());
        this.load()
    },

    updateScoreView() {
        $("#tries").text(this.triesCount);
        $("#matched").text(this.matchedCount);
    },
    setScoresVisibility() {
        let scoresVisibility = this.bestScore === 0 ? 'hidden' : 'visible';
        $(".high-score-container").css('visibility', scoresVisibility);
        $(".correct-container").css('visibility', scoresVisibility);
    },
}