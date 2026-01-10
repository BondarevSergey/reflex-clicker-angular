import { CellState } from '../../models/game.model';

export const fillCellItemByIndex = (array: CellState[], index: number, color: CellState): CellState[] => {
    const copy = [...array];
    copy[index] = color;
    return copy;
};

export const getRandomCellIndex = (cells: CellState[]): number => {
    const blueIndexes = cells.reduce(
        (acc: number[], cell, index) => (cell === CellState.BLUE ? [...acc, index] : acc),
        []
    );
    return blueIndexes[Math.floor(Math.random() * blueIndexes.length)];
};
