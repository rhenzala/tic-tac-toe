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

    function _createCell(x, y, pick) {
        const index = x * 3 + parseInt(y);
        _gameboard.children[index].textContent = pick;
    }
    function getBoard() {
        return _board;
    }

    const updateBoard = (x, y, pick) => {
        if (!_board[x][y]) {
            _board[x][y] = pick;
            _createCell(x, y, pick);
        }
    }

    function initialize() {
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

    return {
        getBoard,
        updateBoard,
        initialize
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
    const _picks = document.querySelectorAll('.mark')
    _picks.forEach(pick => {
        pick.addEventListener('click', () => {
            player1.pick = pick.value;
            player2.pick = (pick.value === 'X') ? 'O' : 'X';
            _currentPlayer = (player1.pick === 'X') ? player1 : player2;
        })
    })
    const player1 = Player('Player 1');
    const player2 = Player('Player 2');

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

    const switchPlayer = () => {
        _currentPlayer = (_currentPlayer === player1) ? player2 : player1;
    }
    
    const play = (x, y) => {
        if (_checkWinner()) return; // prevent placing of marker if winner is already declared
        const _currentBoard = Gameboard.getBoard();
        if (!_currentBoard[x][y]) { // to check the validity of the current player's move
            _currentPlayer.setMove(x, y);
            setTimeout(() => {
                const winner = _checkWinner();
                const result = document.querySelector('.display-result')
                const gameWinner = (winner === player1.pick) ? player1.name : player2.name;
                if (winner) {
                    result.textContent = `${gameWinner} has won the game!`;
                }
            }, 0);
        }
    }
    return {
        switchPlayer,
        play,
    };
})();

Gameboard.initialize();

