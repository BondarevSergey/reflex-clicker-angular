export enum CellState {
    RED = 'red',
    GREEN = 'green',
    YELLOW = 'yellow',
    BLUE = 'blue'
}

export type Winner = 'player' | 'computer';

export interface GameResult {
    winner: Winner;
}

export const FIELD_SIZE = 100;
export const WIN_SCORE = 10;

export const DEFAULT_CELLS = Array(FIELD_SIZE).fill(CellState.BLUE);

//RxJs implementation

export interface GameState {
    cells: CellState[];
    activeCellIndex: number | null;
    playerScore: number;
    computerScore: number;
}

export const initialState = {
    cells: DEFAULT_CELLS,
    activeCellIndex: null,
    playerScore: 0,
    computerScore: 0
};
