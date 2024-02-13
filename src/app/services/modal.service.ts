import { ModalConfiguration } from './../components/kit/interfaces/modal-configuration';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalConfigSource = new BehaviorSubject<ModalConfiguration>({ isOpen: false, opacity: 0 });
  modalConfig$ = this.modalConfigSource.asObservable();

  constructor() {}

  openModal(component: any): void {
    this.modalConfigSource.next({ isOpen: true, opacity: 1, component: component });
  }

  closeModal(): void {
    this.modalConfigSource.next({ isOpen: false, opacity: 0 });
  }
}