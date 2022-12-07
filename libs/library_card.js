"use strict";

/*
 * Memory Game - Card class
 */
class Card {
    constructor(indexImage) {
        this.indexImage = indexImage;
        this.index = 0;
        this.isFlipped = false;
        this.isMatched = false;
    }

    // set the index in the array
    setIndex(index) {
        this.index = index;
        return this;
    }

    // flip the card
    flip() {
        this.isFlipped = !this.isFlipped;
    }

    // set the card as matched
    match() {
        this.isMatched = true;
    }

    get image() {
        if (this.isMatched) {
            return "images/blank.png";
        } else if (this.isFlipped) {
            return `images/card_${this.indexImage + 1}.png`;
        }

        return `images/back.png`;
    }

    toString() {
        return `Card ${this.index + 1}`;
    }

    // get the card html element
    get view() {
        return `<a href="#" class="card" id="card_${this.index}" data-index="${this.index}"><img src="${this.image}" alt="${this.toString()}"></a>`;
    }
}