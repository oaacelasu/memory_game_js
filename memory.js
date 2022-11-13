"use strict";
function addEventHandlers(game) {
    $("#new-game").click(() => {
        game.newGame();
    });

    $("#stop").click(() => {
        game.stop();
    });

    $("#restart").click(() => {
        game.restart();
    });

    $("#save_settings").click(() => {
        game.session.saveSettings($("#player_name").val(), $("#num_cards").val());
        game.uiController.updateSettings(game.session);
        game.stop();
    });
}

$(document).ready(() => {
    let game = new Game();
    let session = new Session();

    session.load();
    game.init(session);
    // initialize tabs
    $("#tabs").tabs();
    // add event handlers
    addEventHandlers(game);
});

