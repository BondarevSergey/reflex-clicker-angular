import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { NgComponentOutlet } from '@angular/common';

@Component({
    selector: 'app-modal-host',
    templateUrl: './modal-host.component.html',
    styleUrl: './modal-host.component.scss',
    imports: [NgComponentOutlet],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ModalHostComponent {
    readonly _modalService = inject(ModalService);

    public component = this._modalService.component;
    public data = this._modalService.data;
}
