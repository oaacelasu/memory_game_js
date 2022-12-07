"use strict";
/*
 * Memory Game - Game class
 */

const game = {
    timer: new Timer(),
    isRunning: false,
    isPaused: false,
    init() {
        this.timer.addListener(uiController.updateTimer)
        uiController.updateAll(this);
        library_settings.updateSettings();
        audioController.init()
    },

    restart() {
        libraryCards.createDeck()
        this.timer.restart()
        libraryCards.setCurrentFlipped(null)
        library_scores.triesCount = 0
        library_scores.matchedCount = 0
        uiController.updateAll(this)
        audioController.startMusic();
    },

    stop() {
        this.timer.stop()
        libraryCards.restartDeck()
        this.isRunning = false
        this.isPaused = false
        libraryCards.setCurrentFlipped(null)
        library_scores.triesCount = 0
        library_scores.matchedCount = 0
        uiController.updateAll(this)
        audioController.stopMusic()
        audioController.setVolume(library_settings.volume)
    },

    pause() {
        this.isRunning = true
        this.isPaused = true
        this.timer.pause()
        audioController.pauseMusic()
        uiController.updateAll(this)
    },

    resume() {
        this.isRunning = true
        this.isPaused = false
        this.timer.start()
        audioController.resumeMusic()
        uiController.updateAll(this)
    },

    newGame() {
        libraryCards.createDeck()
        this.timer.start()
        this.isRunning = true
        uiController.updateAll(this)
        audioController.startMusic();
    }
}