import { Injectable } from '@angular/core';
import { PopupConfiguration } from '../components/kit/interfaces/popup-configuration';
import { BehaviorSubject, Observable, Subject, delay, filter, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PopupService {
  private popupSubject = new BehaviorSubject<PopupConfiguration | null>(null);
  private confirmSubject = new Subject<boolean>();

  getPopup(): Observable<PopupConfiguration | null> {
    return this.popupSubject.asObservable();
  }

  onConfirm(): Observable<boolean> {
    return this.confirmSubject.asObservable().pipe(
      filter((result) => result !== null),
      take(1)
    );
  }

  openPopup(config: PopupConfiguration): void {
    this.popupSubject.next(config);
  }

  closePopup(result: boolean): void {
    this.confirmSubject.next(result);
    if(!result)
      this.popupSubject.next(null);
  }
}