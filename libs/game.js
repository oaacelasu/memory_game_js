"use strict";
/*
 * Memory Game - Game class
 * @author Oscar Acelas <oacelasupegui4062@conestoga.on.ca>
 */
class Game {
    constructor() {
        this.cards = [];
        this.uiController = new ViewController();
        this.audioController = new AudioController();
        this.timer = new Timer();
        this.session = null;
        this.isRunning= false;
        this.isPaused = false;
        this.currentFlipped= null;
        this.triesCount= 0;
        this.matchedCount= 0;
        this.busy = false
    }
    createDeck() {
        this.cards.length = 0
        while (this.cards.length < this.session.numberOfCards) {
            let index = this.cards.length / 2
            this.cards.push(new Card(index))
            this.cards.push(new Card(index))
        }
        shuffleArray(this.cards)
    };
    init(session) {
        this.session = session
        this.timer.addListener(this.uiController.updateTimer)
        this.uiController.updateAll(this);
        this.uiController.updateSettings(session);
    };
    restart() {
        this.createDeck()
        this.timer.restart()
        this.currentFlipped = null
        this.triesCount = 0
        this.matchedCount = 0
        this.uiController.updateAll(this)
        this.audioController.startMusic();
    };
    stop() {
        this.timer.stop()
        this.cards.length = 0
        this.isRunning = false
        this.isPaused = false
        this.currentFlipped = null
        this.triesCount = 0
        this.matchedCount = 0
        this.uiController.updateAll(this)
        this.audioController.stopMusic()
        this.audioController.setVolume(this.session.volume)
    };

    pause() {
        this.isRunning = true
        this.isPaused = true
        this.timer.pause()
        this.audioController.pauseMusic()
        this.uiController.updateAll(this)
    }

    resume() {
        this.isRunning = true
        this.isPaused = false
        this.timer.start()
        this.audioController.resumeMusic()
        this.uiController.updateAll(this)
    }

    newGame() {
        this.createDeck()
        this.timer.start()
        this.isRunning = true
        this.uiController.updateAll(this)
        this.audioController.startMusic();
    };
    canFlipCard(index) {return !this.busy && index !== this.currentFlipped?.index && !this.cards[index].isMatched}
    onClickCard(index) {
        if(this.canFlipCard(index)) {
            this.audioController.flip();
            this.cards[index].flip()
            this.uiController.updateCardView(this.cards[index])

            if (this.currentFlipped) {
                this.triesCount++
                if (this.currentFlipped.indexImage === this.cards[index].indexImage) {
                    this.matchCards(index, this.currentFlipped.index)
                    this.matchedCount++
                } else {
                    this.flipCards(index, this.currentFlipped.index)
                }
                this.currentFlipped = null
            } else {
                this.currentFlipped = this.cards[index]
            }
            this.uiController.updateScore(this.triesCount, this.matchedCount)

            if (this.matchedCount === this.cards.length / 2) {
                this.session.updateScores(this.triesCount, this.matchedCount)
                this.audioController.victory();
                setTimeout(()=>this.stop(), 1000)
            }
        }
    };
    flipCards(index_a, index_b) {
        this.busy = true
        this.cards[index_a].flip()
        this.cards[index_b].flip()
        setTimeout(() => {
            this.uiController.updateCardView(this.cards[index_a])
            this.uiController.updateCardView(this.cards[index_b])
            this.busy = false
        }, 2000)
    };
    matchCards(index_a, index_b) {
        this.busy = true
        this.audioController.match();
        this.cards[index_a].match()
        this.cards[index_b].match()
        setTimeout(() => {
            this.uiController.updateCardView(this.cards[index_a])
            this.uiController.updateCardView(this.cards[index_b])
            this.busy = false
        }, 1000)
    };
}