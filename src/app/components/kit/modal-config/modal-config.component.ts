// modal-config.component.ts
import { Component, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-modal-config',
    templateUrl: './modal-config.component.html',
    styleUrls: ['./modal-config.component.css']
})
export class ModalConfigComponent implements OnDestroy {
    isOpen = false;
    opacity = 0;

    private modalConfigSubscription!: Subscription;

    constructor(private modalService: ModalService) {
        this.modalConfigSubscription = this.modalService.modalConfig$.subscribe((config) => {
            this.isOpen = config.isOpen;
            this.opacity = config.opacity;
        });
    }

    ngOnDestroy(): void {
        this.modalConfigSubscription.unsubscribe();
    }

    closeModal(): void {
        this.modalService.closeModal();
    }
}
