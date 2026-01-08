import { Injectable, signal, Type } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    public component = signal<Type<any> | null>(null);
    public data = signal<any>(null);

    private callback = () => {};

    public open(component: Type<any>, data?: any, callback = (): void => {}) {
        this.component.set(component);
        this.data.set(data);
        this.callback = callback;
    }

    public close(): void {
        this.component.set(null);
        this.data.set(null);
        this.callback();
    }
}
