import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalHostComponent } from './common/modal-host/modal-host.component';
import { GameComponent } from './features/game/game.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [ModalHostComponent, GameComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class AppComponent {}
