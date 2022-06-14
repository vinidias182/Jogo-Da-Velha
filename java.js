const cellElements = document.querySelectorAll("[data-cell]");

const board = document.querySelector("[data-board]");

const winningMessageTesxtElement = document.querySelector
("[data-winning-message-text]");

const winningMessage = document.querySelector("[ data-winning-message]");

const RestartButton =document.querySelector("[data-restart-button]");

//------------------------------------------------------------------------------------//
let iscirCleTurn = false;

const winningCombination =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const startGame = () => {
    for (const cell of cellElements){
        cell.classList.remove("X");
        cell.classList.remove("circle");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    }
    board.classList.add("X");
    winningMessage.classList.remove("show-winning-message");
};

const endGame = (isDraw) => {

    if (isDraw) {
        winningMessageTesxtElement.innerText = "Empate!"
    } else {
        winningMessageTesxtElement.innerText = iscirCleTurn ? "O Venceu!"
        : "X venceu!";
    };

    winningMessage.classList.add("show-winning-message")

};

const checkForWin = (currentPlayer) => {
    return winningCombination.some((combination) => {
        return combination.every ((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () => {
    return [...cellElements].every (cell => {
       return cell.classList.contains ("X") || cell.classList.contains("circle");
    });
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);

    const iswin = checkForWin(classToAdd);
    if (iswin){
       endGame(false)
    };

};
const swapTurns = () => {
  iscirCleTurn =!iscirCleTurn;

  board.classList.remove("circle");
  board.classList.remove("X");

    if (iscirCleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("X");
    }
};

const handleClick= (e)=> {
    const cell= e.target;
    const classToAdd = iscirCleTurn ? "circle" :"X";

   placeMark(cell, classToAdd) ;

   const iswin =checkForWin(classToAdd);
   const isDraw = checkForDraw();

   if (iswin){
        endGame(false)
   } else if (isDraw){
        endGame(true)
   } else {
    swapTurns();
   };
   
   
};
//-------------------------------------------------//
startGame ();
RestartButton.addEventListener("click",startGame);
