const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameOver = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    // Ignore click if cell is filled or if the game is over
    if (board[index] || gameOver) return;

    // Update board state and display current player's symbol
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check if there's a winner or if it's a draw
    if (checkWinner()) {
        gameOver = true;
        setTimeout(() => alert(`${currentPlayer} wins!`), 10);
    } else if (board.every(cell => cell !== null)) {
        gameOver = true;
        setTimeout(() => alert("It's a draw!"), 10);
    } else {
        // Switch player only if game isn't over
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board = Array(9).fill(null);
    gameOver = false;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
    });
}
