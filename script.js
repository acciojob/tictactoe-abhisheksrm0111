let currentPlayer = "X";
let player1 = "";
let player2 = "";
let gameActive = true;
const messageDiv = document.querySelector(".message");
const cells = document.getElementsByClassName("cell");

// Click on Submit to Start Game
document.getElementById("submit").addEventListener("click", function () {
  player1 = document.getElementById("player-1").value.trim();
  player2 = document.getElementById("player-2").value.trim();

  if (player1 === "" || player2 === "") {
    alert("Please enter both player names.");
    return;
  }

  document.getElementById("player-form").style.display = "none";
  document.getElementById("game").style.display = "block";

  updateMessage();
});

// Update Message Area
function updateMessage() {
  const playerName = currentPlayer === "X" ? player1 : player2;
  messageDiv.textContent = `${playerName}, you're up`;
}

// Check for Winner
function checkWinner() {
  const winningCombos = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // cols
    [1, 5, 9], [3, 5, 7]             // diagonals
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    const cellA = document.getElementById(a.toString()).textContent;
    const cellB = document.getElementById(b.toString()).textContent;
    const cellC = document.getElementById(c.toString()).textContent;

    if (cellA && cellA === cellB && cellB === cellC) {
      const winner = cellA === "X" ? player1 : player2;
      messageDiv.textContent = `${winner}, congratulations you won!`;
      gameActive = false;
      return;
    }
  }

  // Check draw
  let isDraw = true;
  for (let cell of cells) {
    if (cell.textContent === "") {
      isDraw = false;
      break;
    }
  }
  if (isDraw) {
    messageDiv.textContent = "It's a draw!";
    gameActive = false;
  }
}

// Handle Cell Click
for (let cell of cells) {
  cell.addEventListener("click", function () {
    if (cell.textContent !== "" || !gameActive) return;

    cell.textContent = currentPlayer;
    checkWinner();

    if (gameActive) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updateMessage();
    }
  });
}
