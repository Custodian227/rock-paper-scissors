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

const rpsContainer = document.querySelector('#rps-container');
const scoreContainer = document.querySelector('#score-container');

rockButton.id = 'rock-button';
rockButton.style.backgroundImage = "url(images/rock.jpg)"
rockButton.style.backgroundSize = 'cover';
rockButton.style.backgroundRepeat = 'no-repeat';

paperButton.id = 'paper-button';
paperButton.style.backgroundImage = "url(images/paper.jpg)"
paperButton.style.backgroundSize = 'cover';
paperButton.style.backgroundRepeat = 'no-repeat';

scissorsButton.id = 'scissors-button';
scissorsButton.style.backgroundImage = "url(images/scissors.jpg)"
scissorsButton.style.backgroundSize = 'cover';
scissorsButton.style.backgroundRepeat = 'no-repeat';

newGameButton.textContent = 'NEW GAME';
newGameButton.style.fontFamily = 'monospace';
newGameButton.style.padding = '1.5rem';
newGameButton.style.color = 'white';
newGameButton.style.backgroundColor = "#001830";
newGameButton.style.borderRadius = '10px';

rockButton.classList.add('rps-button');
paperButton.classList.add('rps-button');
scissorsButton.classList.add('rps-button');

rpsContainer.appendChild(rockButton);
rpsContainer.appendChild(paperButton);
rpsContainer.appendChild(scissorsButton);

const playerChoiceParagraph = document.createElement('p');
const computerChoiceParagraph = document.createElement('p');
const roundResultParagpaph = document.createElement('p');
const scoreParagraph = document.createElement('p');
const declareWinnerParagraph = document.createElement('p');

playerChoiceParagraph.style.marginTop = "2rem";
roundResultParagpaph.style.margin = '1rem 0rem';
scoreParagraph.style.margin = '1rem 0rem';
declareWinnerParagraph.style.margin = '1rem 0rem';
declareWinnerParagraph.style.fontSize = '1.5em';
declareWinnerParagraph.style.color = 'goldenrod';

const buttons = document.querySelectorAll('button');

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

    scoreContainer.appendChild(playerChoiceParagraph);
    scoreContainer.appendChild(computerChoiceParagraph);
    scoreContainer.appendChild(roundResultParagpaph);  
    scoreContainer.appendChild(scoreParagraph);
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
            gameOver("Congratulations! You Won The Game!");
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
            gameOver("You Lost!");
        }
    }
}

function gameOver(gameResultMessage){
    disableButtons();
    declareWinnerParagraph.textContent = gameResultMessage;
    scoreContainer.appendChild(declareWinnerParagraph);  
    scoreContainer.appendChild(newGameButton);
}

function newGame(){
    playerWins = 0;
    computerWins = 0;
    draws = 0;
    gameScore = '';

    scoreContainer.removeChild(playerChoiceParagraph);
    scoreContainer.removeChild(computerChoiceParagraph);
    scoreContainer.removeChild(roundResultParagpaph);
    scoreContainer.removeChild(scoreParagraph);
    scoreContainer.removeChild(declareWinnerParagraph);
    scoreContainer.removeChild(newGameButton);
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









    


