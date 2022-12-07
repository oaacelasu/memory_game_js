const library_settings = {
    numberOfCards :0,
    volume :50,
    name: "",
    // load the session settings and library_scores from session storage by the player name
    load() {
        this.name = sessionStorage.getItem("name") || "Guest";
        this.numberOfCards = sessionStorage.getItem(`numberOfCards_${this.name}`) || 48;
        this.volume = sessionStorage.getItem(`volume_${this.name}`) || 50;
        library_scores.name = this.name;
    },
    saveSettings(playerName, numberOfCards, volume) {
        // save the settings to session storage
        sessionStorage.setItem("name", playerName);
        sessionStorage.setItem(`numberOfCards_${playerName}`, numberOfCards);
        sessionStorage.setItem(`volume_${playerName}`, volume);

        //reload the page
        location.reload();
    },
    updateSettings() {
        $("#player_name").val(this.name);
        $("#num_cards").val(this.numberOfCards);
        $("#volume").val(this.volume);
    },
}