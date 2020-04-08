
var Letter = require("./Letter.js")

var Word = function(word) {
    this.word = word;
    this.objectArray = [];
    this.placeholderArray = [];
    this.expandedPlaceholder = "";
    this.contractedPlaceholder = "";
    this.createPlaceholder = function() {
        for (var i=0;i<this.word.length;i++) {
            var letter = this.word.charAt(i)
            this.objectArray.push(new Letter(letter))
            this.placeholderArray.push(this.objectArray[i].placeholder)
        }
        this.expandedPlaceholder = this.placeholderArray.join(" ");
        this.contractedPlaceholder = this.placeholderArray.join("");
        console.log(this.expandedPlaceholder);
        
        

    }
    this.checkLetter = function(letter) {
        for (var i=0;i<this.word.length;i++) {
            if (this.word.charAt(i)===letter) {
                this.objectArray[i].chosen();
                this.placeholderArray[i] = this.objectArray[i].placeholder;
            }
        }
        this.expandedPlaceholder = this.placeholderArray.join(" ");
        this.contractedPlaceholder = this.placeholderArray.join("");
        console.log(this.expandedPlaceholder);
       
        
    }
}

module.exports = Word;

