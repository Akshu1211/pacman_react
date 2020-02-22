import { configure, observable, action, computed } from 'mobx';

import { PacMan } from './PacMan';
import { Ghost } from './Ghost';
import { TileId, getPillsMatrix } from './MazeData';
import { makeGhosts } from './makeGhosts';

configure({ enforceActions: 'observed' });

export class Game {
  constructor() {
    this.ghosts = makeGhosts(this);
  }

  @observable
  timestamp = 0;

  @observable
  previousTimestamp = 0;

  @computed
  get timeBetweenTicks() {
    return this.timestamp - this.previousTimestamp;
  }

  @observable
  gamePaused = false;

  @action.bound
  toggleGamePaused() {
    this.gamePaused = !this.gamePaused;
  }

  ghosts: Ghost[];

  pacMan = new PacMan();

  @observable
  score = 0;

  @observable
  pills: TileId[][] = getPillsMatrix();

  @action.bound
  setPressedKey(pressedKey: string) {
    this.pacMan.setPressedKey(pressedKey);
  }

  @action.bound
  stopGame() {
    this.gamePaused = true;
  }

  @action.bound
  killPacMan() {
    this.pacMan.setState('dead');
    this.pacMan.diedAtTimestamp = this.timestamp;
  }

  @action.bound
  revivePacMan() {
    this.pacMan.setState('eating');
  }

  @observable
  phaseTimerTimeLeft: number = 5 * 1000;
}