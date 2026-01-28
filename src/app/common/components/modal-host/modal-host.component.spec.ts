import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from '../../../services/modal.service';

import { ModalHostComponent } from './modal-host.component';

describe('Component: ModalHost', () => {
    let component: ModalHostComponent;
    let fixture: ComponentFixture<ModalHostComponent>;

    const ModalMockService = {
        component: signal(null),
        data: signal(null)
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ModalHostComponent],
            providers: [
                {
                    provide: ModalService,
                    useValue: ModalMockService
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(component).toBeDefined();
    });

    it('should NOT show any UI without child component', () => {
        expect(fixture.nativeElement.querySelector('.modal')).toBeNull();
    });
});
