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
        game.session.saveSettings($("#player_name").val(), $("#num_cards").val(), $("#volume").val());
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
    $("#tabs").tabs(
        {
            activate: function(event, ui) {
                let panelId = ui.newPanel.attr('id');
                if((panelId === "tabs-2" ||  panelId === "tabs-3") && game.isRunning) {
                    game.pause();
                } else if(panelId === "tabs-1" && game.isPaused) {
                    game.resume();
                }
            }
        }
    );
    // add event handlers
    addEventHandlers(game);
});

