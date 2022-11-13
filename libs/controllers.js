class ViewController {
    constructor() {
    }
    updateAll(game) {
        // update values
        this.updateTimer(game.timer.toString());
        this.updateScore(game.triesCount, game.matchedCount);
        this.updatePlayerName(game.session.name);
        this.updateHistory(game.session.bestScore, game.session.lastScore);
        this.updateCardsDeck(game);

        // update visibility
        if (game.isRunning) {
            this._showGame(game.session.bestScore);
        } else {
            this._showHome();
        }
    };
    updateCardView(card) {
        $(`#card_${card.index} img`).attr("src", card.image);
    };
    updateTimer(time) {
        $("#timer").text(time);
    };
    updateCardsDeck(game) {
        $("#cards").empty();
        for (let i = 0; i < (game.cards.length / 8); i++) {
            let row = $("<div>").addClass("row")
            for (let j = i * 8; j < i * 8 + 8; j++) {
                row.append(game.cards[j].view);
            }
            $("#cards").append(row);
        }
        $(".card").click( event => {
            game.onClickCard(event.currentTarget.dataset.index);
        });
    };
    updatePlayerName(name) {
        $("#player").text(name);
    };
    updateScore(tries, matched) {
        $("#tries").text(tries);
        $("#matched").text(matched);
    };
    updateHistory(bestScore, latestScore) {
        $("#high-score").text(`${bestScore}%`);
        $("#latest-score").text(`${latestScore}%`);
    };
    updateSettings(settings) {
        $("#player_name").val(settings.name);
        $("#num_cards").val(settings.numberOfCards);
    };
    _showGame(bestScore) {
        $("header div").show();
        if (bestScore === 0) {
            $(".high-score-container").hide();
            $(".correct-container").hide();
        }
        $(".title-container").show();
        $("#home").hide();
        $("#cards").show();
    };
    _showHome() {
        $("header div").hide();
        $(".title-container").show();
        $("#cards").hide();
        $("#home").show();
    }
}
class AudioController {
    constructor() {
        this.currentMusic = 0;
        this.bgMusic = [1, 2, 3, 4, 5, 6].map(x => new Audio(`audio/CM_0${x}.mp3`));
        this.flipSound = new Audio('audio/flip.wav');
        this.matchSound = new Audio('audio/match.wav');
        this.victorySound = new Audio('audio/victory.wav');
        this.bgMusic.forEach(
            music => {
                music.volume = 0.5;
                music.loop = true;
            }
        )
        this.currentMusic = Math.floor(Math.random() * this.bgMusic.length);
    }
    startMusic() {
        this.stopMusic();
        this.currentMusic = Math.floor(Math.random() * this.bgMusic.length);
        this.bgMusic[this.currentMusic].play();
    }
    stopMusic() {
        this.bgMusic[this.currentMusic].pause();
        this.bgMusic[this.currentMusic].currentTime = 0;
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
}


