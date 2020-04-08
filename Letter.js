var Letter = function(letter) {
    this.letter = letter;
    this.placeholder = "_";
    this.guessed = false;
    this.chosen = function() {
        if (this.guessed===false) {
            this.placeholder = this.letter;
            this.guessed= true;
        } 
    }
}
module.exports = Letter;