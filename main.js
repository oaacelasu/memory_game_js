"use strict";

// addEventHandlers function
function addEventHandlers() {

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
        library_settings.saveSettings($("#player_name").val(), $("#num_cards").val(), $("#volume").val());
        library_settings.updateSettings();
        game.stop();
    });
}

$(document).ready(() => {

    // load the session settings and library_scores
    library_settings.load();
    library_scores.load();

    // initialize the game
    game.init();

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
    addEventHandlers();
});

