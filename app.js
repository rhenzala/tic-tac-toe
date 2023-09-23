const Gameboard = (function() {
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
        GameController.play(x, y);
    });

    function _createCell(x, y, pick) {
        const index = x * 3 + parseInt(y);
        _gameboard.children[index].textContent = pick;
    }
    function getBoard() {
        return _board;
    }

    function updateBoard(x, y, pick) {
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
                grid.appendChild(cell);
            }
        }
    }

    return {
        getBoard,
        updateBoard,
        initialize
    };
})();

function Player(name, pick) {
    const setMove = (x, y) => {
        Gameboard.updateBoard(x, y, this.pick);
        GameController.switchPlayer();
    }

    return {
        name,
        pick,
        setMove 
    };
}

