# Wheel of Misfortune

### Overview

Wheel of Misfortune is a command line interface, mulitplayer game similar to Wheel of Fortune.  The game uses the inquirer node package manager to prompt users for inputs such as player data, actions such as "spin the wheel" and letter guesses.  Inputs are validated to be within a specific range, such as must be a vowel when buying a vowel or between two and five players when inputing players. In addition to the main index.js file there are three javascript files used for constructors for letters, words and players.  Words and phrases are taken from the word.txt file and randomly chosen as the next puzzle.  If a puzzle contains punctuation marks such as apostrophes or colons, the word constructor will automatically read those.  Information such as player's turn, player's money, the updated puzzle and who won the round are then all printed to the console.  



### Getting started
![Getting Started](start_game.jpg)


The game starts with chosing the number of players (2-5) and rounds (2-5).  The user is then prompted to create the players by adding their names.  

For round 1 it is the first player's turn.  For round two it is the second player's turn and so on.  The player's turn is indicated by the "(TURN -->)" marker. The player is prompted to choose between "Spin the wheel", "Buy a vowel" and "Solve the puzzle".

### Spin the wheel

![Spin the wheel](spinwheel.jpg)

If a player chooses to "Spin the wheel", the wheel is spun and lands a dollar value of between $100-$1000 at $100 increments, "Lose a Turn" or "Bankruptcy".  If "Lose a turn" is landed on the turn is over and it's next player's turn.  If "Bankruptcy" is landed the player loses the turn and the money for the round returns to zero.  If the wheel lands on a money amount the player then can guess a consonant.  If the letter is hidden within the puzzle the player wins the amount of money equal to the dollar amount the wheel landed on times the number of instances in the puzzle and it continues to be the player's turn  If there are no instances of the letter in the puzzle or if the letter was already guessed the player loses their turn.

### Buy a vowel

![Buy a vowel](buyvowel.jpg)

If a player choose to "Buy a vowel", the player chooses a vowel.  If the vowel is hidden within the puzzle the player is deducted $100 times the number of times the vowel appears in the puzzle and the players turn continues.  If the vowel is not hidden within the puzzle or if the vowel has already been guessed the player's turn is over.

### Solve the puzzle

![Solve the puzzle](solve.jpg)

If the player chooses to "Solve the puzzle", the player will be prompted to choose a letter.  That letter will then fill into the leftmost blank spot on the puzzle.  This continues from left to right until there are no more blank spots.  If the player fills in the puzzle exactly like the word or phrase that was hidden the player wins the round and the money from the round is added to the player's game total.  All the other players receive $0 for the round.  If the player guesses wrong, the puzzle returns to the state the puzzle was in prior to the guess and the player's turn is over.  

### Winning the game

![Solve the puzzle](gameover.jpg)

The game is won by the player who amasses the most money over the game during the chosen amount of rounds. The winner is then crowned champion of coronavirus quarantine and paraded around the room on the shoulders of the losers!!!!!   



### [Click for Demo](https://drive.google.com/file/d/1v5fYBae4V0ZxboAHCEQcVq6pmoWt0Noo/view)
