import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldInputDirective } from '../../common/components/form-field/directives/field-input.directive';
import { FormFieldComponent } from '../../common/components/form-field/form-field.component';
import { FormFieldErrorsComponent } from '../../common/components/form-field-errors/form-field-errors.component';
import { AbstractGame } from '../../common/abstract-classes/abstract-game';

@Component({
    selector: 'app-rx-game',
    templateUrl: './rx-game.component.html',
    styleUrl: './rx-game.component.scss',
    imports: [ReactiveFormsModule, FieldInputDirective, FormFieldComponent, FormFieldErrorsComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class RxGameComponent extends AbstractGame {}
