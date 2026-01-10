import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
    concat,
    EMPTY,
    expand,
    filter,
    map,
    Observable,
    of,
    race,
    startWith,
    Subject,
    switchMap,
    take,
    takeWhile,
    timer
} from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldInputDirective } from '../../common/components/form-field/directives/field-input.directive';
import { FormFieldComponent } from '../../common/components/form-field/form-field.component';
import { FormFieldErrorsComponent } from '../../common/components/form-field-errors/form-field-errors.component';
import { AbstractGame } from '../../common/abstract-classes/abstract-game';
import { fillCellItemByIndex, getRandomCellIndex } from '../../common/helpers/game.helpers';
import { CellState, GameState, initialState, WIN_SCORE } from '../../common/constants/game.consts';

@Component({
    selector: 'app-rx-game',
    templateUrl: './rx-game.component.html',
    styleUrl: './rx-game.component.scss',
    imports: [ReactiveFormsModule, FieldInputDirective, FormFieldComponent, FormFieldErrorsComponent, AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class RxGameComponent extends AbstractGame {
    public start$ = new Subject<void>();
    public cellClick$ = new Subject<number>();

    public game$: Observable<GameState> = this.start$.pipe(
        switchMap(() =>
            of(initialState).pipe(
                expand((state) => (state.activeCellIndex ? this.round$(state) : EMPTY)),
                takeWhile((s) => this.checkWinner(s), true)
            )
        ),
        startWith(initialState)
    );

    public restartCallBack(): void {
        this.start$.next();
    }

    private round$(state: GameState): Observable<GameState> {
        const activeIndex = getRandomCellIndex(state.cells);

        /**
         * Active round state
         */
        const activated: GameState = {
            ...state,
            activeCellIndex: activeIndex,
            cells: fillCellItemByIndex(state.cells, activeIndex, CellState.YELLOW)
        };

        /**
         * The stream of players click by cell
         */
        const hit$ = this.cellClick$.pipe(
            filter((i) => i === activeIndex),
            take(1),
            map((i) => ({
                ...activated,
                playerScore: activated.playerScore + 1,
                activeCellIndex: null,
                cells: fillCellItemByIndex(activated.cells, i, CellState.GREEN)
            }))
        );

        /**
         * The stream with callback if a user didn't click by cell
         */
        const miss$ = timer(this.timeLimit.valid ? this.timeLimit.value : 1000).pipe(
            map(() => ({
                ...activated,
                computerScore: activated.computerScore + 1,
                activeCellIndex: null,
                cells: fillCellItemByIndex(activated.cells, activeIndex, CellState.RED)
            }))
        );

        return concat(of(activated), race(hit$, miss$));
    }

    private checkWinner(state: GameState): boolean {
        if (state.playerScore >= WIN_SCORE) {
            void this.openModal('player');
            return false;
        }

        if (state.computerScore >= WIN_SCORE) {
            void this.openModal('computer');
            return false;
        }

        return true;
    }
}
