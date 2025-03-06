const board = document.getElementById("board");
const statusDiv = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const resetScoresBtn = document.getElementById("reset-scores");
const vsComputerBtn = document.getElementById("vs-computer");
const vsPlayerBtn = document.getElementById("vs-player");
const difficultyBtns = document.querySelectorAll('.difficulty-btn');
const difficultySelector = document.querySelector('.difficulty-selector');

const clickSound = document.getElementById("click-sound");
const computerSound = document.getElementById("computer-sound");
const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");
const drawSound = document.getElementById("draw-sound");

const PLAYER_X = "X";
const PLAYER_O = "O";
let currentPlayer = PLAYER_X;
let cells = [];
let gameOver = false;
let isVsComputer = true;
let currentDifficulty = "easy";
let scores = {
  playerX: 0,
  playerO: 0,
  draws: 0
};

function updateScoreBoard() {
  document.querySelector('.player-score .value').textContent = scores.playerX;
  document.querySelector('.computer-score .value').textContent = scores.playerO;
  document.querySelector('.draws .value').textContent = scores.draws;
}

function createBoard() {
  board.innerHTML = "";
  cells = [];
  gameOver = false;
  currentPlayer = PLAYER_X;
  statusDiv.textContent = "Au tour de X !";
  statusDiv.style.backgroundColor = "rgba(255, 255, 255, 0.7)";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", () => handleCellClick(i));
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleCellClick(index) {
  if (!gameOver && cells[index].textContent === "") {
    makeMove(index);
    
    if (isVsComputer && !gameOver) {
      setTimeout(computerMove, 500);
    }
  }
}

function makeMove(index) {
  cells[index].textContent = currentPlayer;
  cells[index].classList.add("taken");
  cells[index].dataset.player = currentPlayer;
  clickSound.play();

  const winningCombo = getWinningCombo(currentPlayer);
  if (winningCombo) {
    highlightWinningCells(winningCombo);
    if (currentPlayer === PLAYER_X) {
      statusDiv.textContent = "X a gagné ! ";
      statusDiv.style.backgroundColor = "#a8e6cf";
      scores.playerX++;
      winSound.play();
    } else {
      statusDiv.textContent = "O a gagné ! ";
      statusDiv.style.backgroundColor = isVsComputer ? "#ff9999" : "#a8e6cf";
      scores.playerO++;
      isVsComputer ? loseSound.play() : winSound.play();
    }
    gameOver = true;
    updateScoreBoard();
    return;
  }

  if (checkDraw()) {
    statusDiv.textContent = "Match nul ! ";
    statusDiv.style.backgroundColor = "#95a5a6";
    scores.draws++;
    updateScoreBoard();
    drawSound.play();
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
  statusDiv.textContent = `Au tour de ${currentPlayer} !`;
}

function computerMove() {
  if (gameOver) return;

  let move;
  switch (currentDifficulty) {
    case "easy":
      move = makeEasyMove();
      break;
    case "medium":
      move = makeMediumMove();
      break;
    case "hard":
      move = makeHardMove();
      break;
    default:
      move = makeEasyMove();
  }
  makeMove(move);
}

function makeEasyMove() {
  // Joue aléatoirement
  const availableCells = cells
    .map((cell, index) => ({ cell, index }))
    .filter(({ cell }) => cell.textContent === "");
  const randomIndex = Math.floor(Math.random() * availableCells.length);
  return availableCells[randomIndex].index;
}

function makeMediumMove() {
  // 70% de chance de faire un coup optimal, 30% de chance de faire un coup aléatoire
  if (Math.random() < 0.3) {
    return makeEasyMove();
  }
  return makeHardMove();
}

function makeHardMove() {
  // Utilise l'algorithme minimax pour jouer optimalement
  return minimax(cells, PLAYER_O).index;
}

function minimax(newCells, player, depth = 0, maxDepth = 9) {
  const availableCells = newCells.filter(cell => cell.textContent === "");
  
  if (checkWinner(PLAYER_X)) {
    return { score: -10 + depth };
  } else if (checkWinner(PLAYER_O)) {
    return { score: 10 - depth };
  } else if (availableCells.length === 0 || depth >= maxDepth) {
    return { score: 0 };
  }

  const moves = [];
  for (let i = 0; i < availableCells.length; i++) {
    const move = {};
    move.index = newCells.indexOf(availableCells[i]);

    newCells[move.index].textContent = player;

    if (player === PLAYER_O) {
      const result = minimax(newCells, PLAYER_X, depth + 1, maxDepth);
      move.score = result.score;
    } else {
      const result = minimax(newCells, PLAYER_O, depth + 1, maxDepth);
      move.score = result.score;
    }

    newCells[move.index].textContent = "";
    moves.push(move);
  }

  let bestMove;
  if (player === PLAYER_O) {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = moves[i];
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = moves[i];
      }
    }
  }
  return bestMove;
}

function getWinningCombo(player) {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let combo of winningCombos) {
    if (combo.every(index => cells[index].textContent === player)) {
      return combo;
    }
  }
  return null;
}

function highlightWinningCells(combo) {
  combo.forEach(index => {
    cells[index].classList.add("winning-cell");
  });
}

function checkWinner(player) {
  return getWinningCombo(player) !== null;
}

function checkDraw() {
  return cells.every(cell => cell.textContent !== "");
}

function resetScores() {
  scores = { playerX: 0, playerO: 0, draws: 0 };
  updateScoreBoard();
}

function updateDifficultyVisibility() {
  difficultySelector.classList.toggle('hidden', !isVsComputer);
}

// Event Listeners
vsComputerBtn.addEventListener("click", () => {
  if (!isVsComputer) {
    isVsComputer = true;
    vsComputerBtn.classList.add("active");
    vsPlayerBtn.classList.remove("active");
    document.querySelector('.computer-score .label').textContent = "Ordinateur";
    updateDifficultyVisibility();
    createBoard();
  }
});

vsPlayerBtn.addEventListener("click", () => {
  if (isVsComputer) {
    isVsComputer = false;
    vsPlayerBtn.classList.add("active");
    vsComputerBtn.classList.remove("active");
    document.querySelector('.computer-score .label').textContent = "Joueur O";
    updateDifficultyVisibility();
    createBoard();
  }
});

difficultyBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.level !== currentDifficulty) {
      difficultyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDifficulty = btn.dataset.level;
      createBoard();
    }
  });
});

resetBtn.addEventListener("click", createBoard);
resetScoresBtn.addEventListener("click", resetScores);

// Initialisation
updateDifficultyVisibility();
createBoard();
