import {
  detectCollisions,
  BASIC_PILL_POINTS,
  ENERGIZER_POINTS,
} from './detectCollisions';
import { Game } from './Game';
import { EMPTY_TILE_ID } from './MazeData';

describe('detectCollisions', () => {
  describe('detectCollisions()', () => {
    describe('when hitting pill', () => {
      it('eats it', () => {
        const game = new Game();
        const pacMan = game.pacMan;
        pacMan.setTileCoordinates({ x: 12, y: 8 });
        expect(game.score).toBe(0);
        detectCollisions(game);
        expect(game.score).toBe(BASIC_PILL_POINTS);
      });
    });

    describe('when hitting energizer', () => {
      let game: Game;

      beforeEach(() => {
        // Arrange
        game = new Game();
        game.timestamp = 1;
        const pacMan = game.pacMan;
        pacMan.setTileCoordinates({ x: 26, y: 3 });
        expect(game.score).toBe(0);

        // Act
        detectCollisions(game);
      });

      it('eats it', () => {
        expect(game.score).toBe(ENERGIZER_POINTS);
        expect(game.maze.pills[3][26]).toBe(EMPTY_TILE_ID);
      });

      it('makes pacman chase', () => {
        expect(game.pacMan.state).toBe('chasing');
        expect(game.pacMan.chasingSinceTimestamp).not.toBe(0);
      });
    });
  });
});