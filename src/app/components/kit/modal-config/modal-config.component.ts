// modal-config.component.ts
import { Component, AfterViewInit, OnDestroy, ChangeDetectorRef, ComponentFactoryResolver, ViewContainerRef, ComponentRef, Type, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-modal-config',
    templateUrl: './modal-config.component.html',
    styleUrls: ['./modal-config.component.css']
})
export class ModalConfigComponent implements OnDestroy {
    @ViewChild('modalContent', { read: ViewContainerRef }) modalContentContainer!: ViewContainerRef;
    isOpen = false;
    opacity = 0;
    private modalConfigSubscription!: Subscription;
    private componentRef!: ComponentRef<any>;

    constructor(private modalService: ModalService) {
        this.modalConfigSubscription = this.modalService.modalConfig$.subscribe((config) => {
            this.isOpen = config.isOpen;
            this.opacity = config.opacity;
            if (config.component) {
                this.renderComponent(config.component);
            }
        });
    }

    ngOnDestroy(): void {
        this.modalConfigSubscription.unsubscribe();
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    }

    closeModal(): void {
        this.modalService.closeModal();
    }

    private renderComponent(componentType: Type<any>): void {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
        this.componentRef = this.modalContentContainer.createComponent(componentType);
    }
}