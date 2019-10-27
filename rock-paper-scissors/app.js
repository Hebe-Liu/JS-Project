/*
* @Author: hebe
* @Date:   2019-10-21 20:39:48
* @Last Modified by:   Hebe-Liu
* @Last Modified time: 2019-10-27 19:47:46
*/
let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("comp-score");
const result_div = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

function convertChoiceName(letter){
	if (letter === 'r') return "rock";
	if (letter === 'p') return "paper";
	else return "scissors";
}

function win(computerChoice){

	userScore++;
	userScore_span.innerHTML = userScore;
	result_div.innerHTML = "You win ; )  He is a " + convertChoiceName(computerChoice);
}

function lost(userChoice, computerChoice){

	computerScore++;
	computerScore_span.innerHTML = computerScore;
	result_div.innerHTML = `You lost : (  He is a  ${convertChoiceName(computerChoice)}`;
	
}

function draw(computerChoice){

	result_div.innerHTML = "Its a draw."
}

function getComputerChoice(){
	const choices = ["r","p","s"];
	const randomNumber = Math.floor(Math.random() * 3);
	return choices[randomNumber];
}

function game(userChoice){
	const computerChoice = getComputerChoice();

	switch(userChoice+computerChoice){
		case "rs":
		case "pr":
		case "sp":
		win(computerChoice);
		break;

		case "rp":
		case "ps":
		case "sr":
		lost(userChoice, computerChoice);
		break;

		case "rr":
		case "pp":
		case "ss":
		draw(computerChoice);
		break;
	}
	
}

function main(){
	rock_div.addEventListener("click", () => game("r"));
	paper_div.addEventListener("click", () => game("p"));
	scissors_div.addEventListener("click", () => game("s"))

}

main();