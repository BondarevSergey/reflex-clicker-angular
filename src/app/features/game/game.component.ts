import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { FormFieldErrorsComponent } from '../../common/form-field-errors/form-field-errors.component';
import { FormFieldComponent } from '../../common/form-field/form-field.component';
import { FieldInputDirective } from '../../common/form-field/directives/field-input.directive';
import { CellState, DEFAULT_CELLS, WIN_SCORE, Winner } from './game.consts';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrl: './game.component.scss',
    imports: [ReactiveFormsModule, FieldInputDirective, FormFieldComponent, FormFieldErrorsComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class GameComponent {
    readonly _modalService = inject(ModalService);

    /**
     * Time limit for getting a cell by player
     * Field is disabled until the game is active
     */
    public timeLimit = new FormControl(1000, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(500)]
    });

    public cells = signal<CellState[]>(DEFAULT_CELLS);
    public playerScore = signal(0);
    public computerScore = signal(0);

    private activeCellIndex = signal<number | null>(null);
    private timeout: ReturnType<typeof setTimeout> | null = null;

    private winner = computed<Winner | null>(() => {
        if (this.playerScore() >= WIN_SCORE) return 'player';
        if (this.computerScore() >= WIN_SCORE) return 'computer';
        return null;
    });

    /**
     * Start the new game
     * reset all game params
     */
    public startGame(): void {
        this.clearTimer();
        this.timeLimit.disable();

        this.cells.set(DEFAULT_CELLS);
        this.activeCellIndex.set(null);
        this.playerScore.set(0);
        this.computerScore.set(0);

        this.startRound();
    }

    /**
     * Action on user click by cell
     * @param index iof clicked element
     * ignore user click until input is disabled (it's disabled until game is active)
     */
    public userClickByCell(index: number): void {
        if (this.timeLimit.enabled || this.activeCellIndex() !== index) {
            return;
        }

        this.clearTimer();

        this.cells.update((field) => {
            const updated = [...field];
            updated[index] = CellState.GREEN;
            return updated;
        });

        this.playerScore.update((v) => v + 1);
        this.activeCellIndex.set(null);

        this.startRound();
    }

    /**
     * Action on timeout
     */
    private handleTimeout(): void {
        this.cells.update((field) => {
            const updated = [...field];
            updated[this.activeCellIndex()!] = CellState.RED;
            return updated;
        });

        this.computerScore.update((v) => v + 1);
        this.activeCellIndex.set(null);

        this.startRound();
    }

    /**
     * Start the new round
     * Randomly select a cell to change to yellow
     * Set timeout for this cell
     */
    private startRound(): void {
        if (this.winner()) {
            void this.openModal();
            this.timeLimit.enable();
            return;
        }

        const blueIndexes = this.cells().reduce(
            (acc: number[], cell, index) => (cell === CellState.BLUE ? [...acc, index] : acc),
            []
        );

        const randomIndex = blueIndexes[Math.floor(Math.random() * blueIndexes.length)];

        this.activeCellIndex.set(randomIndex);

        this.cells.update((cell) => {
            const copy = [...cell];
            copy[randomIndex] = CellState.YELLOW;
            return copy;
        });

        this.timeout = setTimeout(() => this.handleTimeout(), this.timeLimit.value);
    }

    /**
     * Clear timeout
     */
    private clearTimer(): void {
        if (this.timeout !== null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

    /**
     * Open modal with the game result
     */
    protected async openModal(): Promise<void> {
        const { ResultModalComponent } = await import('./result-modal/result-modal.component');
        this._modalService.open(ResultModalComponent, { winner: this.winner() }, (result: boolean) => {
            if (result) {
                this.startGame();
            }
        });
    }
}
