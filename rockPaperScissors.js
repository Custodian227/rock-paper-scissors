const rockValue = "rock";
const paperValue = "paper";
const scissorsValue = "scissors";

let numberOfRounds = 0;
let playerWins = 0;
let computerWins = 0;
let draws = 0;

function getPlayerChoice(){
    let choice;
    
    playerInput = prompt("Which one do you choose?");

    while(playerInput.toLowerCase() != rockValue &&
          playerInput.toLowerCase() != paperValue &&
          playerInput.toLowerCase() != scissorsValue)
          {
                alert(`Please type in ${rockValue}, ${paperValue}, or ${scissorsValue}`);
                playerInput = prompt("Which one do you choose?");
          }

    if(playerInput.toLowerCase() === rockValue){
        choice = rockValue;
    }
    else if(playerInput.toLowerCase() === paperValue){
        choice = paperValue;
    }
    else if(playerInput.toLowerCase() === scissorsValue){
        choice = scissorsValue;
    }
    
    console.log(`The player chose ${choice}`);
    console.log();

    return choice;
}

function getComputerChoice(){
    let choice;
    let randomNumber = Math.floor(Math.random() * 3);

    if(randomNumber === 0){
        choice = rockValue;
    }
    else if(randomNumber === 1){
        choice = paperValue;
    }
    else {
        choice = scissorsValue;
    }

    console.log(`The computer chose ${choice}`);
    console.log();

    return choice;
}

function playRound(playerOption, computerOption){

    if(playerOption === computerOption){
        draws++;
        return "It's a draw!";
    }
    else if(
    (playerOption === rockValue && computerOption === scissorsValue) || 
    (playerOption === paperValue && computerOption === rockValue) || 
    (playerOption === scissorsValue && computerOption === paperValue)){
        playerWins++;
        return "The player wins!";
    }
    else if(
    (playerOption === rockValue && computerOption === paperValue) ||
    (playerOption === paperValue && computerOption === scissorsValue) || 
    (playerOption === scissorsValue && computerOption === rockValue)){
        computerWins++;
        return "The computer wins!";
    }
   

}

function declareWinner(){
    if(playerWins === computerWins){
        console.log("It's a Tie!");
    }
    else if(playerWins > computerWins){
        console.log("The player has won!");
    }
    else{
        console.log("The computer has won!");
    }

    console.log(`Score => P : ${playerWins} | C : ${computerWins} | D : ${draws}`);
}

function startGame(){

    while(numberOfRounds < 5){
     
        let playerChoice = getPlayerChoice();
        let computerChoice = getComputerChoice();

        let res = playRound(playerChoice, computerChoice);
      
        console.log(res);
        console.log('---------------------------------');

        numberOfRounds++;

    }

    declareWinner();
}

startGame();
