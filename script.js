const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const message = document.getElementById('message');
const aiModeButton = document.getElementById('ai-mode');
const friendModeButton = document.getElementById('friend-mode');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;
let againstAI = false; // Default to playing with a friend

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

aiModeButton.addEventListener('click', () => {
    againstAI = true;
    resetGame();
    message.innerHTML = 'Playing against AI';
});

friendModeButton.addEventListener('click', () => {
    againstAI = false;
    resetGame();
    message.innerHTML = 'Playing with a friend';
});

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.getAttribute('data-index');

    if (gameState[clickedCellIndex] !== null || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    if (checkWinner()) {
        message.innerHTML = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (gameState.every(cell => cell !== null)) {
        message.innerHTML = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (againstAI && currentPlayer === 'O') {
        makeAIMove();
    }
}

function makeAIMove() {
    setTimeout(() => {
        const emptyCells = gameState.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
        const randomCellIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        gameState[randomCellIndex] = currentPlayer;
        document.querySelector(`.cell[data-index='${randomCellIndex}']`).innerHTML = currentPlayer;

        if (checkWinner()) {
            message.innerHTML = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (gameState.every(cell => cell !== null)) {
            message.innerHTML = 'Draw!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }, 500); // Adding a delay for a more natural AI response
}

function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] !== null && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function resetGame() {
    gameState = Array(9).fill(null);
    cells.forEach(cell => cell.innerHTML = '');
    currentPlayer = 'X';
    gameActive = true;
    message.innerHTML = '';
}
