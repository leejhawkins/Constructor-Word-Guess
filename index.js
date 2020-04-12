var Word = require("./Word.js");
var Player = require("./Player")
var inquirer = require("inquirer");
var fs = require("fs");
var words = [];
var players = [];
var guessedLetters = [];
var playersNumber = 0;
var turn = 0;
initiateGame();
function initiateGame() {
    fs.readFile("words.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error)
        }
        words = data.split(",");
        inquirer
            .prompt([
                {
                   type: "input",
                   message: "Number of Players (1-3): ",
                   name: "players"
                }

            ])
            .then(function(response){ 
                playersNumber = response.players;
                makePlayers(); 
               
            
            })
        
    })
}
function makePlayers() {
    console.log(playersNumber)
    if (players.length<playersNumber) {
        createPlayer();
    } else {
        playGame();
    }
}

function createPlayer() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Player name:  ",
                name: "player"

            }
        ])
        .then(function(response){
            var newPlayer = new Player(response.player);
            players.push(newPlayer);
            newPlayer.number = players.length;
            console.log(newPlayer.number);
            makePlayers();
            
        })
}

function playGame() {
    var wordPick = Math.floor(Math.random() * words.length)
    var newWord = new Word(words[wordPick]);
    var guessedLetters = [];
    for (var i=0;i<players.length;i++) {
        players[i].roundScore = 0;
    }

    newWord.createPlaceholder()
    guessWord(newWord);

}

function guessWord(newWord) {
    var beforeGuess = newWord.contractedPlaceholder;       
    console.log("it's " +players[turn].name + " turn")
    var wheelValue = spinWheel();
    console.log("Each letter is worth $" + wheelValue)
    for (var i=0;i<players.length;i++) {
        console.log(players[i].name + " =$" + players[i].roundScore)
    }
   
    inquirer
        .prompt([
            {
                name: "letter",
                message: "Pick a letter:"
            }
        ])
        .then(function (answer) {
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
                console.log("\n" + players[turn].name +" wins!!!!\n")
                players[turn].roundScore = players[turn].roundScore + newWord.instancesOf * wheelValue;
                players[turn].gameScore = players[turn].gameScore + players[turn].roundScore;
                console.log("Current Scores:")
                for (var i=0;i<players.length;i++) {
                    console.log(players[i].name + " =$" + players[i].gameScore)
                }
                turn++;
                restartGame();
            } else if (newWord.contractedPlaceholder === beforeGuess && !repeatLetter && !notALetter) {
                guessedLetters.push(answer.letter)
                console.log("\n Letters guessed:  " + guessedLetters + "\n");
                if (turn===2) {
                    turn = 0;
                } else {
                    turn++;
                }
                guessWord(newWord, guessedLetters);
              
              
            } else if (!notALetter) {
                guessedLetters.push(answer.letter);
                players[turn].roundScore = players[turn].roundScore + newWord.instancesOf * wheelValue;
                console.log ("There are " + newWord.instancesOf + " " + answer.letter + "'s")

                console.log("\nLetters guessed:  " + guessedLetters + "\n")
               

                guessWord(newWord,guessedLetters);
            } else {
                console.log("\n Letters guessed:  " + guessedLetters + "\n")
                
                guessWord(newWord,guessedLetters);
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
        .then(function (response) {
            if (response.confirm) {
                playGame()

            } else {
                return
            }
        })
}

function spinWheel() {
    return Math.ceil(Math.random()*10)*100
}


