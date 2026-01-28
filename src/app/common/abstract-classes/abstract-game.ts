import { inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { CellState, Winner } from '../../models/game.model';

export abstract class AbstractGame {
    readonly _modalService = inject(ModalService);

    /**
     * Time limit for getting a cell by player
     */
    public timeLimit = new FormControl(1000, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(500)]
    });

    /**
     * Method to restart the game
     */
    abstract restartCallBack(): void;

    /**
     * Open modal with the game result
     */
    protected async openModal(winner: Winner): Promise<void> {
        const { ResultModalComponent } = await import('../../common/components/result-modal/result-modal.component');
        this._modalService.open(ResultModalComponent, { winner }).then((result: boolean) => {
            if (result) {
                this.restartCallBack();
            }
        });
    }

    /**
     * Update an element of array by index with new value
     * @param array
     * @param index
     * @param color
     */
    protected fillCellItemByIndex(array: CellState[], index: number, color: CellState): CellState[] {
        const copy = [...array];
        copy[index] = color;
        return copy;
    }

    /**
     * Return random index of cell that is available for change color
     * @param cells
     */
    protected getRandomCellIndex(cells: CellState[]): number {
        const blueIndexes = cells.reduce(
            (acc: number[], cell, index) => (cell === CellState.BLUE ? [...acc, index] : acc),
            []
        );
        return blueIndexes[Math.floor(Math.random() * blueIndexes.length)];
    }
}
