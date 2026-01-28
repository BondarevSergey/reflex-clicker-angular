export type Winner = 'player' | 'computer';

export enum CellState {
    RED = 'red',
    GREEN = 'green',
    YELLOW = 'yellow',
    BLUE = 'blue'
}

export interface GameState {
    cells: CellState[];
    activeCellIndex: number | null;
    playerScore: number;
    computerScore: number;
}
