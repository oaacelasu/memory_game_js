const libraryCards = {
    cards: [],
    currentFlipped: null,
    busy: false,
    createDeck() {
        this.cards.length = 0
        while (this.cards.length < library_settings.numberOfCards) {
            let index = this.cards.length / 2
            this.cards.push(new Card(index))
            this.cards.push(new Card(index))
        }
        shuffleArray(this.cards)
    },
    canFlipCard(index) {return !this.busy && index !== this.currentFlipped?.index && !this.cards[index].isMatched},
    onClickCard(index) {
        if(this.canFlipCard(index)) {
            audioController.flip();
            this.cards[index].flip()
            this.updateCardView(this.cards[index])

            if (this.currentFlipped) {
                library_scores.triesCount++
                if (this.currentFlipped.indexImage === this.cards[index].indexImage) {
                    this.matchCards(index, this.currentFlipped.index)
                    library_scores.matchedCount++
                } else {
                    this.flipCards(index, this.currentFlipped.index)
                }
                this.currentFlipped = null
            } else {
                this.currentFlipped = this.cards[index]
            }
            library_scores.updateScoreView()

            if (library_scores.matchedCount === this.cards.length / 2) {
                library_scores.updateScores()
                audioController.victory();
                setTimeout(()=>game.stop(), 1000)
            }
        }
    },
    flipCards(index_a, index_b) {
        this.busy = true
        this.cards[index_a].flip()
        this.cards[index_b].flip()
        setTimeout(() => {
            this.updateCardView(this.cards[index_a])
            this.updateCardView(this.cards[index_b])
            this.busy = false
        }, 2000)
    },
    matchCards(index_a, index_b) {
        this.busy = true
        audioController.match();
        this.cards[index_a].match()
        this.cards[index_b].match()
        setTimeout(() => {
            this.updateCardView(this.cards[index_a])
            this.updateCardView(this.cards[index_b])
            this.busy = false
        }, 1000)
    },
    setCurrentFlipped(flipped) { this.currentFlipped =flipped },

    restartDeck() {
        this.cards.length = 0
    },
    // update the cards deck view
    updateCardsDeckView() {
        $("#cards").empty();
        for (let i = 0; i < (libraryCards.cards.length / 8); i++) {
            let row = $("<div>").addClass("row")
            for (let j = i * 8; j < i * 8 + 8; j++) {
                row.append(libraryCards.cards[j].view);
            }
            $("#cards").append(row);
        }
        $(".card").click(event => {
            libraryCards.onClickCard(event.currentTarget.dataset.index);
        });
    },
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
    },

}