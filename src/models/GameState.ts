

export type Stage = 'START_GAME' | 'GAME' | 'FETCHING_GAME' | 'END_GAME';

export class GameState {
    stage: Stage;
    username: string;

    constructor(properties?: GameState) {
        this.stage = properties?.stage || 'START_GAME';
        this.username = properties?.username || '';
    }
}

