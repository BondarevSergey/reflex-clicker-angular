import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { GameResult } from '../../../constants/game.consts';
import { ModalService } from '../../../services/modal.service';

@Component({
    selector: 'app-result-modal',
    templateUrl: './result-modal.component.html',
    styleUrl: './result-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ResultModalComponent {
    readonly _modalService = inject(ModalService);

    public data = input<GameResult>();

    protected close() {
        this._modalService.close();
    }
}
