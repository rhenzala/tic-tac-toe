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
                const cell = document.createElement("div");
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

const Player = (name, pick) => {
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
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
    let currentPlayer = player1;

    const switchPlayer = () => {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
    }
    const play = (x, y) => {
        const board = Gameboard.getBoard();
        if (!board[x][y]) {
            currentPlayer.setMove(x, y);
        }
    }
    return {
        switchPlayer,
        play,
    };
})();

Gameboard.initialize();

