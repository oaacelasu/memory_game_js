"use strict";

/*
 * @author Oscar Acelas <oacelasupegui4062@conestoga.on.ca>
 */

// addEventHandlers function
function addEventHandlers(game) {

    // Add event handler for start a new game
    $("#new-game").click(() => {
        game.newGame();
    });

    // Add event handler for stop the game
    $("#stop").click(() => {
        game.stop();
    });

    // Add event handler for restart the game
    $("#restart").click(() => {
        game.restart();
    });

    // Add event handler for the save settings button
    $("#save_settings").click(() => {
        game.session.saveSettings($("#player_name").val(), $("#num_cards").val(), $("#volume").val());
        game.uiController.updateSettings(game.session);
        game.stop();
    });
}

$(document).ready(() => {

    // create a new game object
    let game = new Game();
    // create a new session object
    let session = new Session();

    // load the session settings and scores
    session.load();

    // initialize the game
    game.init(session);

    // initialize tabs and add listener to the tabs
    $("#tabs").tabs(
        {
            activate: function (event, ui) {
                let panelId = ui.newPanel.attr('id');
                if((panelId === "tabs-2" ||  panelId === "tabs-3") && game.isRunning) {
                    game.pause();
                } else if(panelId === "tabs-1" && game.isPaused) {
                    game.resume();
                }
            }
        }
    );
    // add event handlers for the buttons
    addEventHandlers(game);
});

