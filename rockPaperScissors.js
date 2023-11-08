//String constants for all choices
const rockValue = "rock";
const paperValue = "paper";
const scissorsValue = "scissors";

//Variables for keeping track of the score
let playerWins = 0;
let computerWins = 0;
let draws = 0;
let gameScore; 

//UI
const rockButton = document.createElement('button');
const paperButton = document.createElement('button');
const scissorsButton = document.createElement('button');
const newGameButton = document.createElement('button');

rockButton.textContent = 'ROCK';
paperButton.textContent = 'PAPER';
scissorsButton.textContent = 'SCISSORS';
newGameButton.textContent = 'NEW GAME';

document.body.appendChild(rockButton);
document.body.appendChild(paperButton);
document.body.appendChild(scissorsButton);

const playerChoiceParagraph = document.createElement('p');
const computerChoiceParagraph = document.createElement('p');
const roundResultParagpaph = document.createElement('p');
const scoreParagraph = document.createElement('p');
const declareWinnerParagraph = document.createElement('p');

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.style.width = '100px';
    button.style.height = '50px';
    button.style.borderColor = 'black';
    button.style.marginRight = '10px';
});

//Returns a randomly generated rps decision of the computer
function getComputerSelection(){
    let computerSelection;
    let randomNumber = Math.floor(Math.random() * 3);

    if(randomNumber === 0){
        computerSelection = rockValue;
    }
    else if(randomNumber === 1){
        computerSelection = paperValue;
    }
    else {
        computerSelection = scissorsValue;
    }

    return computerSelection;
}

//Updates all result messages
function updateGameData(playerSelectionMessage, computerSelectionMessage, roundResultMessage, scoreMessage){
    playerChoiceParagraph.textContent = playerSelectionMessage;
    computerChoiceParagraph.textContent = computerSelectionMessage;
    roundResultParagpaph.textContent = roundResultMessage;
    scoreParagraph.textContent = scoreMessage;

    document.body.appendChild(playerChoiceParagraph);
    document.body.appendChild(computerChoiceParagraph);
    document.body.appendChild(roundResultParagpaph);  
    document.body.appendChild(scoreParagraph);
}

//Determines the result of the round by comparing the rps choices of the player and the computer
function playRound(playerSelection, computerSelection){
    let playerSelectionMessage = `You chose ${playerSelection}`;
    let computerSelectionMessage = `The computer chose ${computerSelection}`;
    let roundResultMessage = '';
    let scoreMessage = ''

    if(playerSelection === computerSelection && (computerWins <= 5 || playerWins <= 5)){
        draws++;
        roundResultMessage = "It's a draw!";
        scoreMessage = getGameScore();   
        updateGameData(playerSelectionMessage, computerSelectionMessage, roundResultMessage, scoreMessage);
    }
    else if(
    (playerSelection === rockValue && computerSelection === scissorsValue) || 
    (playerSelection === paperValue && computerSelection === rockValue) || 
    (playerSelection === scissorsValue && computerSelection === paperValue)  && (computerWins <= 5 || playerWins <= 5)){
        playerWins++;
        roundResultMessage =  "The player wins!"; 
        scoreMessage = getGameScore();
        updateGameData(playerSelectionMessage, computerSelectionMessage, roundResultMessage, scoreMessage);

        if (playerWins === 5) {
            gameOver("Congratulations! You Won!");
        }
    }
    else if(
    (playerSelection === rockValue && computerSelection === paperValue) ||
    (playerSelection === paperValue && computerSelection === scissorsValue) || 
    (playerSelection === scissorsValue && computerSelection === rockValue)  && (computerWins <= 5 || playerWins <= 5)){
        computerWins++;
        roundResultMessage = "The computer wins!";
        scoreMessage = getGameScore();
        updateGameData(playerSelectionMessage, computerSelectionMessage, roundResultMessage, scoreMessage);

        if (computerWins === 5) {
            gameOver("The computer won!");
        }
    }
}

function gameOver(gameResultMessage){
    disableButtons();
    declareWinnerParagraph.textContent = gameResultMessage;
    document.body.appendChild(declareWinnerParagraph);  
    document.body.appendChild(newGameButton);
}

function newGame(){
    playerWins = 0;
    computerWins = 0;
    draws = 0;
    gameScore = '';

    document.body.removeChild(playerChoiceParagraph);
    document.body.removeChild(computerChoiceParagraph);
    document.body.removeChild(roundResultParagpaph);
    document.body.removeChild(scoreParagraph);
    document.body.removeChild(declareWinnerParagraph);
    document.body.removeChild(newGameButton);
    enableButtons();
}

function getGameScore(){
    return gameScore = `Player: ${playerWins} | Draws: ${draws} | Computer: ${computerWins}`;
}

//Disables the rps buttons when a winner is elected
function disableButtons() {
    buttons.forEach(elem => {
        elem.disabled = true
    })
}

//Enables the rps buttons when a new game is started
function enableButtons() {
    buttons.forEach(elem => {
        elem.disabled = false
    })
}

//Event Listeners for all buttons
//The parameters of the playRound() function are the corresponding string constant to the given button and the function that determines the computer decision (getComputerChoice())
rockButton.addEventListener('click', () => {
    playRound(rockValue, getComputerSelection())
});

paperButton.addEventListener('click', () =>
    playRound(paperValue, getComputerSelection())
);

scissorsButton.addEventListener('click', () =>
    playRound(scissorsValue, getComputerSelection())
);

newGameButton.addEventListener('click', () => 
    newGame()
);









    


