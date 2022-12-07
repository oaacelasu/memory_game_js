"use strict";
/*
 * Memory Game - View Controller and Audio Controller classes
 */

const uiController = {
    // this method is used to show the game view
    updateAll(game) {
        // update values
        this.updateTimer(game.timer.toString());
        library_scores.updateScoreView();
        this.updatePlayerName(library_settings.name);
        this.updateHistory(library_scores.bestScore, library_scores.lastScore);
        libraryCards.updateCardsDeckView();

        // update visibility
        if (game.isRunning && !game.isPaused) {
            this._showGame(library_scores.bestScore);
        } else {
            this._showHome();
        }
    },
    // udpate the timer view
    updateTimer(time) {
        $("#timer").text(time);
    },

    // update the player name view
    updatePlayerName(name) {
        $("#player").text(name);
    },

    // update the score view
    updateHistory(bestScore, latestScore) {
        $("#high-score").text(`${bestScore}%`);
        $("#latest-score").text(`${latestScore}%`);
    },

    _showGame() {
        $(".header_left").css('visibility', 'visible');
        $(".header_right").css('visibility', 'visible');
        library_scores.setScoresVisibility();
        $("#home").css('visibility', 'hidden');
        $("#cards").css('visibility', 'visible');
    },

    _showHome() {
        $(".header_left").css('visibility', 'hidden');
        $(".header_right").css('visibility', 'hidden')
        library_scores.setScoresVisibility();
        $("#cards").css('visibility', 'hidden');
        $("#home").css('visibility', 'visible');
    }
}
// class responsible for the audio


const audioController = {
    bgMusic: new Audio(`audio/spread_the_wings.mp3`),
    flipSound : new Audio('audio/flip.wav'),
    matchSound : new Audio('audio/match.wav'),
    victorySound:new Audio('audio/victory.wav'),

    init(){
        this.bgMusic.volume = 0.1
        this.bgMusic.loop = true
    },

    startMusic() {
        this.stopMusic();
        this.bgMusic.play();
    },

    pauseMusic() {
        this.bgMusic.pause();
    },

    resumeMusic() {
        this.bgMusic.play();
    },

    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    },

    flip() {
        this.flipSound.play();
    },

    match() {
        this.matchSound.play();
    },

    victory() {
        this.stopMusic();
        this.victorySound.play();
    },

    setVolume(volume) {
        let vol = volume / 100;
        this.bgMusic.volume = vol;
        this.flipSound.volume = vol;
        this.matchSound.volume = vol;
        this.victorySound.volume = vol;
    }
}

