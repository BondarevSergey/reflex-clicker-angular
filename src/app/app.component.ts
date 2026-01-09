import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ModalHostComponent } from './common/components/modal-host/modal-host.component';
import { SignalsGameComponent } from './features/signals-game/signals-game.component';
import { RxGameComponent } from './features/rx-game/rx-game.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [ModalHostComponent, SignalsGameComponent, RxGameComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class AppComponent {
    public implementation = signal<'rxjs' | 'signals'>('signals');
}
