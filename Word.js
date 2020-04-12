
var Letter = require("./Letter.js")

var Word = function(word) {
    this.word = word;
    this.instancesOf = 0;
    this.objectArray = [];
    this.placeholderArray = [];
    this.expandedPlaceholder = "";
    this.contractedPlaceholder = "";
    this.createPlaceholder = function() {
        for (var i=0;i<this.word.length;i++) {
            var letter = this.word.charAt(i)
            this.objectArray.push(new Letter(letter))
            
            if (letter === " "|| letter ==="'"||letter==="-"||letter===".") {
               
                this.objectArray[i].chosen();

            }
            this.placeholderArray.push(this.objectArray[i].placeholder)
        }
        this.expandedPlaceholder = this.placeholderArray.join(" ");
        this.contractedPlaceholder = this.placeholderArray.join("");
        console.log(this.expandedPlaceholder + "\n");
        
        

    }
    this.checkLetter = function(letter) {
        this.instancesOf = 0;
        for (var i=0;i<this.word.length;i++) {
            if (this.word.charAt(i)===letter) {
                this.instancesOf++;
                this.objectArray[i].chosen();
                this.placeholderArray[i] = this.objectArray[i].placeholder;
            }
        }
        this.expandedPlaceholder = this.placeholderArray.join(" ");
        this.contractedPlaceholder = this.placeholderArray.join("");
        console.log("\n"+this.expandedPlaceholder+"\n");
       
        
    }
}

module.exports = Word;

