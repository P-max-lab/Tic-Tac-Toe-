document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const restartBtn = document.getElementById('restartBtn');
    const newGameBtn = document.getElementById('newGameBtn');
    const gameScreen = document.getElementById('game-screen');
    const resultDiv = document.getElementById('result');
    const playerTurn = document.getElementById('player-turn');
    const cells = [];

    let currentPlayer = 'X';
    let winner = null;

    // Create the board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cells.push(cell);
        board.appendChild(cell);
        cell.addEventListener('click', handleClick);
    }

    // Handle click on cell
    function handleClick() {
        if (!winner && !this.textContent) {
            this.textContent = currentPlayer;
            playerTurn.textContent = `Player's Turn: ${currentPlayer === 'X' ? 'O' : 'X'}`;
            checkWin();
            checkDraw();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    // Check for a win
    function checkWin() {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (cells[a].textContent &&
                cells[a].textContent === cells[b].textContent &&
                cells[a].textContent === cells[c].textContent) {
                cells[a].classList.add('win');
                cells[b].classList.add('win');
                cells[c].classList.add('win');
                winner = cells[a].textContent;
                displayResult();
                break;
            }
        }

        if (winner) {
            gameScreen.classList.remove('hidden');
        }
    }

    // Check for a draw
    function checkDraw() {
        if (!winner && cells.every(cell => cell.textContent !== '')) {
            displayResult(true);
            gameScreen.classList.remove('hidden');
        }
    }

    // Display result
    function displayResult(draw = false) {
        if (draw) {
            resultDiv.textContent = "It's a draw!";
        } else {
            resultDiv.textContent = `Player ${winner} wins!`;
        }
    }

    // Reset the game
    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('win');
        });
        currentPlayer = 'X';
        winner = null;
        playerTurn.textContent = `Player's Turn: X`;
        gameScreen.classList.add('hidden');
    }

    restartBtn.addEventListener('click', resetGame);
    newGameBtn.addEventListener('click', () => {
        resetGame();
        gameScreen.classList.add('hidden');
    });
});
