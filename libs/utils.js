"use strict";

// this utility class is used to shuffle cards array
const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j].setIndex(i);
        array[j] = temp.setIndex(j);
    }
}