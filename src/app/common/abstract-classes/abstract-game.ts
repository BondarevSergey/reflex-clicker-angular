import { inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { FormControl, Validators } from '@angular/forms';

export abstract class AbstractGame {
    readonly _modalService = inject(ModalService);

    /**
     * Time limit for getting a cell by player
     * Field is disabled until the game is active
     */
    public timeLimit = new FormControl(1000, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(500)]
    });
}
