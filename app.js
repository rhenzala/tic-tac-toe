const Gameboard = (() => {
    const _gameboard = document.getElementById('gameBoard');
    let _board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    _gameboard.addEventListener('click', function(e) {
        const cell = e.target;
        const x = cell.dataset.row;
        const y = cell.dataset.col;
        Controller.play(x, y);
    });

    const _createCell = (x, y, pick) => {
        const index = x * 3 + parseInt(y);
        _gameboard.children[index].textContent = pick;
    }
    const getBoard = () => {
        return _board;
    }

    const updateBoard = (x, y, pick) => {
        if (!_board[x][y]) {
            _board[x][y] = pick;
            _createCell(x, y, pick);
        }
    }

    const initialize = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell')
                cell.dataset.row = i;
                cell.dataset.col = j;
                _gameboard.appendChild(cell);
            }
        }
    }

    const resetBoard = () =>{
        window.location.reload();
    }

    return {
        getBoard,
        updateBoard,
        initialize,
        resetBoard
    };
})();

const Player = (name) => {
    let pick;
    return {
        name,
        pick,
        setMove: function(x, y) {
            Gameboard.updateBoard(x, y, this.pick);
            Controller.switchPlayer();
        }
    };
}

const Controller = (() => {
    let _currentPlayer;
    const _picks = document.querySelectorAll('.mark');
    _picks.forEach(pick => {
        pick.addEventListener('click', () => {
            player1.pick = pick.value;
            player2.pick = (pick.value === 'X') ? 'O' : 'X';
            _currentPlayer = (player1.pick === 'X') ? player1 : player2;
            _displayPlayerSelection(player1.pick, player2.pick);

            _picks.forEach(btn => {
                btn.disabled = true;
            });
        })
    })
    const player1 = Player('Player 1');
    const player2 = Player('Player 2');

    const _displayPlayerSelection = (pick1, pick2) => {
        const p1Mark = document.querySelector('.player1');
        const p2Mark = document.querySelector('.player2');
        p1Mark.textContent = `You selected ${pick1}`;
        p2Mark.textContent = `The other player is ${pick2}`;
    }
    
    const _checkWinner = () => {
        const board = Gameboard.getBoard();

        // Check rows, columns
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== null) {
                return board[i][0]; 
            }
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== null) {
                return board[0][i]; 
            }
        }

        // Check diagonals
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== null) {
            return board[0][0]; 
        }
        if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== null) {
            return board[0][2]; 
        }

        return null; 
    }

    const _isDraw = () => {
        const board = Gameboard.getBoard();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === null) {
                    return false;  
                }
            }
        }
        return true;  
    };

    const switchPlayer = () => {
        _currentPlayer = (_currentPlayer === player1) ? player2 : player1;
    }
    
    const play = (x, y) => {
        if (_checkWinner() || _isDraw()) return; // prevent placing of marker if winner is already declared
        const _currentBoard = Gameboard.getBoard();
        if (!_currentBoard[x][y]) { // to check the validity of the current player's move
            _currentPlayer.setMove(x, y);
            setTimeout(() => {
                const winner = _checkWinner();
                const result = document.querySelector('.display-result');
                const resetGame = document.querySelector('.reset-game');
                if (winner) {
                    const gameWinner = (winner === player1.pick) ? player1.name : player2.name;
                    result.textContent = `${gameWinner} won the game!`;
                } else if (_isDraw()) {
                    result.textContent = 'It\'s a draw!';
                }
    
                if (winner || _isDraw()) {
                    const resetBtn = document.createElement('button');
                    resetBtn.textContent = 'Play Again';
                    resetGame.appendChild(resetBtn);
                    resetBtn.addEventListener('click', () => {
                        Gameboard.resetBoard();

                        _picks.forEach(btn => {
                            btn.disabled = false;
                        });
                    });
                }
            }, 0);
        }
    }
    return {
        switchPlayer,
        play,
    };
})();

const playBtn = document.getElementById('play')
playBtn.addEventListener('click', function(e) {
    const selection = document.querySelector('.selection')
    selection.style.display = "none"
    Gameboard.initialize();
})
