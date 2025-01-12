const boxes = document.querySelectorAll(".box");
const resetButton = document.getElementById("reset");
const startButton = document.getElementById("Start");
const player1Input = document.getElementById("one");
const player2Input = document.getElementById("two");
const player1Display = document.getElementById("one1");
const player2Display = document.getElementById("two2");
const winnerDisplay = document.getElementById("winner");
const footer = document.getElementById("fullscreen");

footer.style.display = "block"

let currentPlayer = "x";
let board = Array(9).fill(null);
let gameActive = true;

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

startButton.addEventListener("click", () => {
    const player1 = player1Input.value.trim() || "Player 1";
    const player2 = player2Input.value.trim() || "Player 2";
    player1Display.textContent = player1;
    player2Display.textContent = player2;
    footer.style.display = "none";
});

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (board[index] || !gameActive) return;

        board[index] = currentPlayer;
        box.classList.add(currentPlayer);

        if (checkWinner()) {
            gameActive = false;
            winnerDisplay.style.visibility = "visible"
            winnerDisplay.textContent = `Winner: ${
                currentPlayer === "x" ? player1Display.textContent : player2Display.textContent
            }!`;
            return;
        }

        if (!board.includes(null)) {
            winnerDisplay.style.visibility = "visible"
            winnerDisplay.textContent = "It's a Tie!";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "x" ? "o" : "x";
    });
});

resetButton.addEventListener("click", () => {
    board.fill(null);
    boxes.forEach(box => box.className = "box");
    winnerDisplay.textContent = "";
    currentPlayer = "x";
    gameActive = true;
});

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}
