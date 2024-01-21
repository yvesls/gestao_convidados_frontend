import { ModalConfiguration } from './../components/kit/interfaces/modal-configuration';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalConfigSource = new BehaviorSubject<ModalConfiguration>({ isOpen: false, opacity: 0 });
  modalConfig$ = this.modalConfigSource.asObservable();

  constructor() {}

  openModal(): void {
    this.modalConfigSource.next({ isOpen: true, opacity: 1 });
  }

  closeModal(): void {
    this.modalConfigSource.next({ isOpen: false, opacity: 0 });
  }
}