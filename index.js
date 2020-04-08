var Word = require("./Word.js");
var inquirer = require("inquirer");
var fs = require("fs");
var words = [];

fs.readFile("words.txt", "utf8", function (error, data) {
    if (error) {
        return console.log(error)
    }
    words = data.split(",");
    playGame()
})

function playGame() {
    var wordPick = Math.floor(Math.random() * words.length)
    var newWord = new Word(words[wordPick]);
    var guesses = 10;
    newWord.createPlaceholder()
    guessWord(newWord,guesses);

}

function guessWord(newWord,guesses) {
    var beforeGuess = newWord.contractedPlaceholder;
    
    inquirer
        .prompt([
            {    
                name: "letter",
                message: "Pick a letter:"
            }
        ])
        .then(function (answer) {
            newWord.checkLetter(answer.letter)        
            if (newWord.contractedPlaceholder === newWord.word) {          
                playGame();
            } else if (newWord.contractedPlaceholder===beforeGuess){
                guesses= guesses -1;
                console.log("Guesses left:" + guesses);
                guessWord(newWord,guesses);
            } else {
                console.log("Guesses left:" + guesses)
                guessWord(newWord,guesses);
            }
       })
}

