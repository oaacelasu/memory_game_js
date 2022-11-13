class Card {
    constructor(indexImage) {
        this.indexImage = indexImage;
        this.index = 0;
        this.isFlipped = false;
        this.isMatched = false;
    }

    setIndex(index) {
        this.index = index;
        return this;
    }

    flip() {
        this.isFlipped = !this.isFlipped;
    }

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

    get view() {
        return `<a href="#" class="card" id="card_${this.index}" data-index="${this.index}"><img src="${this.image}" alt="${this.toString()}"></a>`;
    }
}