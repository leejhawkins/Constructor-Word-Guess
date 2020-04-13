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
    guessedLetters = [];
    for (var i=0;i<players.length;i++) {
        players[i].roundScore = 0;
    }

    newWord.createPlaceholder()
    guessWord(newWord);

}

function guessWord(newWord) {      
    console.log("it's " +players[turn].name + "'s turn")
    inquirer
        .prompt([
            {
              name: "action",
              type: "list",
              choices: ["Spin the wheel","Buy a vowel","Solve the puzzle"]  
            }
        ])
        .then(function(playersTurn) {
            if (playersTurn.action==="Spin the wheel") {
                spinTheWheel(newWord);
            } else if (playersTurn.action==="Buy a vowel") {
                buyAVowel(newWord);
            } else {
                solveThePuzzle(newWord);
            }
        })
}

function spinTheWheel(newWord) {
    var wheelValue = spinWheel();
    if (wheelValue===0) {
        console.log("\n"+players[turn].name + " lost a turn\n");
        console.log(newWord.expandedPlaceholder)
        turn = loseAturn(turn);
        guessWord(newWord)
    } else if (wheelValue===11) {
        console.log("\n"+players[turn].name + " is bankrupt\n")
        players[turn].roundScore = 0;
        turn = loseAturn(turn);
        console.log(newWord.expandedPlaceholder)
        guessWord(newWord)
    } else {
        console.log("\nEach letter is worth $" + wheelValue*100)
        printPlayers();
    inquirer
        .prompt([
            {
                name: "letter",
                message: "Pick a letter:",
                validate: function(value) {
                    if (value.match(/[a-z]/g) === null || !(value.match(/[a,e,i,o,u]/g)===null)) {
                        return false
                    } else {
                        return true
                    }
                }
            }
        ])
        .then(function (answer) {
            var repeatLetter = false;
            for (var i = 0; i < guessedLetters.length; i++) {
                if (answer.letter === guessedLetters[i]) {
                    repeatLetter = true;
                    console.log("\nThat letter was already chosen\n")
                }
            }
            newWord.checkLetter(answer.letter)
            if (newWord.contractedPlaceholder === newWord.word) {
                console.log("\n" + players[turn].name +" wins!!!!\n")
                players[turn].roundScore = players[turn].roundScore + newWord.instancesOf * wheelValue*100;
                players[turn].gameScore = players[turn].gameScore + players[turn].roundScore;
                console.log("Current Scores:")
                for (var i=0;i<players.length;i++) {
                    console.log(players[i].name + " =$" + players[i].gameScore)
                }
                turn = loseAturn(turn);
                restartGame();
            } else if (newWord.instancesOf===0 && !repeatLetter) {
                guessedLetters.push(answer.letter)
                turn= loseAturn(turn) 
                console.log("There are no "+answer.letter+"'s") 
                console.log(newWord.expandedPlaceholder);
                guessWord(newWord, guessedLetters);
            } else if (!repeatLetter) {
                guessedLetters.push(answer.letter);
                players[turn].roundScore = players[turn].roundScore + newWord.instancesOf * wheelValue*100;
                console.log ("There are " + newWord.instancesOf + " " + answer.letter + "'s")
                printPlayers()
                guessWord(newWord,guessedLetters);
            } else {
                turn = loseAturn(turn)
                guessWord(newWord,guessedLetters);
            }
        })
    }
}
function buyAVowel(newWord) {
    inquirer
    .prompt([
        {
            name: "letter",
            message: "Pick a vowel:",
            validate: function(value) {
                if (!(value.match(/[a,e,i,o,u]/g)===null)) {
                    return true
                } else {
                    return false
                }
            }
        }
    ])
    .then(function (answer) {
        var repeatLetter = false;
        for (var i = 0; i < guessedLetters.length; i++) {
            if (answer.letter === guessedLetters[i]) {
                repeatLetter = true;
                console.log("\nThat letter was already chosen\n"+ players[turn].name + " loses a turn")
            }
        }
        newWord.checkLetter(answer.letter)
        if (newWord.contractedPlaceholder === newWord.word) {
            console.log("\n" + players[turn].name +" wins!!!!\n")
            players[turn].roundScore = players[turn].roundScore - newWord.instancesOf *100;
            players[turn].gameScore = players[turn].gameScore + players[turn].roundScore;
            console.log("Current Scores:")
            for (var i=0;i<players.length;i++) {
                console.log(players[i].name + " =$" + players[i].gameScore)
            }
            turn = loseAturn(turn);
            restartGame();
        } else if (newWord.instancesOf===0 && !repeatLetter) {
            guessedLetters.push(answer.letter)
            turn= loseAturn(turn)
            console.log("There are no "+answer.letter+"'s") 
            console.log(newWord.expandedPlaceholder)
            guessWord(newWord, guessedLetters);
        } else if (!repeatLetter) {
            guessedLetters.push(answer.letter);
            players[turn].roundScore = players[turn].roundScore - newWord.instancesOf * 100;
            console.log ("There are " + newWord.instancesOf + " " + answer.letter + "'s")
            printPlayers();
           
            guessWord(newWord,guessedLetters);
        } else {
           
            turn = loseAturn(turn)
            guessWord(newWord,guessedLetters);
        }
    })
}
function solveThePuzzle(newWord) { 
    const beforeGuess = Object.assign({},newWord.placeholderArray);    
    var blanks = findBlanks(newWord.placeholderArray);
    fillLetters(newWord,beforeGuess,blanks);
}
function fillLetters(newWord,beforeGuess,blanks) {
    inquirer
    .prompt([
        {
            name: "letter",
            message: "Pick a letter:",
            validate: function(value) {
                if (value.match(/[a-z]/g) === null) {
                    return false
                } else {
                    return true
                }
            }
        }
    ])
    .then(function (answer) {
        newWord.solve(answer.letter);
        blanks--
        if (blanks>0) {
            fillLetters(newWord,beforeGuess,blanks)
        } else if(newWord.contractedPlaceholder===newWord.word) {
            console.log("\n" + players[turn].name +" wins!!!!\n")
            players[turn].gameScore = players[turn].gameScore + players[turn].roundScore;
            console.log("Current Scores:")
            for (var i=0;i<players.length;i++) {
                console.log(players[i].name + " =$" + players[i].gameScore)
            }

            turn = loseAturn(turn);
            restartGame();
        } else {
            for (var i=0;i<newWord.placeholderArray.length;i++) {
                newWord.placeholderArray[i]=beforeGuess[i];
            }
            
            newWord.expandedPlaceholder = newWord.placeholderArray.join(" ");
            newWord.contractedPlaceholder = newWord.placeholderArray.join("");
            console.log("\n"+newWord.expandedPlaceholder+"\n");
            turn = loseAturn(turn);
            guessWord(newWord,guessedLetters);
        }
    })
}
function printPlayers() {
   
        console.log(players[0].name + " =$" + players[0].roundScore + " "+ players[1].name + " =$" + players[1].roundScore + " "+ players[2].name + " =$" + players[2].roundScore)
}

function findBlanks(array) {
    var blanks = 0
    for (var i=0;i<array.length;i++) {
        if (array[i]==="_") {
            blanks++
        }
    }
    return blanks;
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
    return Math.floor(Math.random()*12)
}
function loseAturn(turn) {
    if (turn===2) {
        turn = 0;
    } else {
        turn++;
    }
    return turn
}


