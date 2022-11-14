"use strict";
/*
 * Memory Game - View Controller and Audio Controller classes
 * @author Oscar Acelas <oacelasupegui4062@conestoga.on.ca>
 */
class ViewController {
    constructor() {
    }

    // this method is used to show the game view
    updateAll(game) {
        // update values
        this.updateTimer(game.timer.toString());
        this.updateScore(game.triesCount, game.matchedCount);
        this.updatePlayerName(game.session.name);
        this.updateHistory(game.session.bestScore, game.session.lastScore);
        this.updateCardsDeck(game);

        // update visibility
        if (game.isRunning && !game.isPaused) {
            this._showGame(game.session.bestScore);
        } else {
            this._showHome();
        }
    };

    // update the card view using animation
    updateCardView(card) {
        let _image = card.image
        let isMatched = card.isMatched

        if (isMatched) {
            $(`#card_${card.index} img`)
                .animate({opacity: '0'}, 250,
                    function () {
                        $(`#card_${card.index}`).addClass("cursor-default")
                    }
                );
        } else {
            $(`#card_${card.index} img`)
                .fadeOut(250, function () {
                    $(`#card_${card.index} img`).attr('src', _image);
                })
                .fadeIn(250);
        }
    };

    // udpate the timer view
    updateTimer(time) {
        $("#timer").text(time);
    };

    // update the cards deck view
    updateCardsDeck(game) {
        $("#cards").empty();
        for (let i = 0; i < (game.cards.length / 8); i++) {
            let row = $("<div>").addClass("row")
            for (let j = i * 8; j < i * 8 + 8; j++) {
                row.append(game.cards[j].view);
            }
            $("#cards").append(row);
        }
        $(".card").click(event => {
            game.onClickCard(event.currentTarget.dataset.index);
        });
    };

    // update the player name view
    updatePlayerName(name) {
        $("#player").text(name);
    };

    updateScore(tries, matched) {
        $("#tries").text(tries);
        $("#matched").text(matched);
    };

    // update the score view
    updateHistory(bestScore, latestScore) {
        $("#high-score").text(`${bestScore}%`);
        $("#latest-score").text(`${latestScore}%`);
    };

    updateSettings(settings) {
        $("#player_name").val(settings.name);
        $("#num_cards").val(settings.numberOfCards);
        $("#volume").val(settings.volume);
    };

    setScoresVisibility(bestScore = 0) {
        let scoresVisibility = bestScore === 0 ? 'hidden' : 'visible';
        $(".high-score-container").css('visibility', scoresVisibility);
        $(".correct-container").css('visibility', scoresVisibility);
    };

    _showGame(bestScore) {
        $(".header_left").css('visibility', 'visible');
        $(".header_right").css('visibility', 'visible');
        this.setScoresVisibility(bestScore);
        $("#home").css('visibility', 'hidden');
        $("#cards").css('visibility', 'visible');
    };

    _showHome() {
        $(".header_left").css('visibility', 'hidden');
        $(".header_right").css('visibility', 'hidden')
        this.setScoresVisibility();
        $("#cards").css('visibility', 'hidden');
        $("#home").css('visibility', 'visible');
    };
}

// class responsible for the audio
class AudioController {
    constructor() {
        this.bgMusic = new Audio(`audio/spread_the_wings.mp3`);
        this.flipSound = new Audio('audio/flip.wav');
        this.matchSound = new Audio('audio/match.wav');
        this.victorySound = new Audio('audio/victory.wav');
        this.bgMusic.volume = 0.1;
        this.bgMusic.loop = true;
    }

    startMusic() {
        this.stopMusic();
        this.bgMusic.play();
    }

    pauseMusic() {
        this.bgMusic.pause();
    }

    resumeMusic() {
        this.bgMusic.play();
    }

    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }

    flip() {
        this.flipSound.play();
    }

    match() {
        this.matchSound.play();
    }

    victory() {
        this.stopMusic();
        this.victorySound.play();
    }

    setVolume(volume) {
        console.log(volume);
        let vol = volume / 100;
        this.bgMusic.volume = vol;
        this.flipSound.volume = vol;
        this.matchSound.volume = vol;
        this.victorySound.volume = vol;
    }
}


