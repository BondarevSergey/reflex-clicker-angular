import { CellState } from '../../models/game.model';

export const FIELD_SIZE = 100;
export const WIN_SCORE = 10;

export const DEFAULT_CELLS = Array(FIELD_SIZE).fill(CellState.BLUE);

//RxJs implementation
export const initialState = {
    cells: DEFAULT_CELLS,
    activeCellIndex: null,
    playerScore: 0,
    computerScore: 0
};
