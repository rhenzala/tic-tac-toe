# Browser-based Tic-Tac-Toe Game
### Short Description
A simple Tic Tac Toe game making heavy use of javascript factory function/ modules. The game supports two players, but only ask for the mark of 'Player 1' as it automatically assign the other mark to 'Player 2'.

### Features
- The player can choose their mark, either 'X' or 'O'
- Display the result after the game showing either the winner or if the game is draw
- Restart game functionality
- Interactive interface

### Technical Details
The game makes heavy use of javascipt modules/ factory function.
- **Gameboard module**: Handles the creation of gameboard, its rendering, and the underlying data.
- **Controller module**: Handles the flow of game, how it should be played, and the decision on game winner or if it's a draw.
- **Player**: Handles the player data, including their name, pick, and moves.
