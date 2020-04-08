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
    var guessedLetters = [];

    newWord.createPlaceholder()
    guessWord(newWord, guesses, guessedLetters);

}

function guessWord(newWord, guesses, guessedLetters) {
    var beforeGuess = newWord.contractedPlaceholder;

    inquirer
        .prompt([
            {
                name: "letter",
                message: "Pick a letter:"
            }
        ])
        .then(function (answer) {
            ``
            var repeatLetter = false;
            var notALetter = false;
            if (answer.letter.match(/[a-z]/g) === null) {
                console.log("\nPlease choose a LETTER\n")
                notALetter = true;
            }
            for (var i = 0; i < guessedLetters.length; i++) {
                if (answer.letter === guessedLetters[i]) {
                    repeatLetter = true;
                    console.log("\nYou already chose that letter please choose another\n")
                }
            }
            newWord.checkLetter(answer.letter)
            if (newWord.contractedPlaceholder === newWord.word) {
                console.log("\n Correct! You win!!!\n")
                restartGame();
            } else if (newWord.contractedPlaceholder === beforeGuess && !repeatLetter && !notALetter) {
                guessedLetters.push(answer.letter)
                guesses = guesses - 1;
                if (guesses <= 0) {
                    console.log("\nYou lost\n")
                    console.log("The correct word was:  " + newWord.word +"\n");
                    restartGame()
                } else {
                    console.log("\n Letters guessed:  " + guessedLetters + "\n");
                    console.log("\nGuesses left:" + guesses+ "\n");
                    guessWord(newWord, guesses, guessedLetters);
                }
            } else if (!notALetter) {
                guessedLetters.push(answer.letter);
                console.log("\nLetters guessed:  " + guessedLetters + "\n")
                console.log("\nGuesses left:" + guesses+ "\n")
                
                guessWord(newWord, guesses, guessedLetters);
            } else {
                console.log("\n Letters guessed:  " + guessedLetters + "\n")
                console.log("\nGuesses left:  " + guesses+"\n")
                guessWord(newWord, guesses, guessedLetters);
            }
        })
}

function restartGame() {
    inquirer
        .prompt([

            {
                type: "confirm",
                message: "Would you like to play again?",
                name: "confirm",
                default: true
            }

        ])
        .then(function(response){
            if (response.confirm) {
                playGame()

            } else {
                return
            }
        })
}



