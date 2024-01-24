// popup.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopupService } from 'src/app/services/popup.service';
import { PopupConfiguration } from '../interfaces/popup-configuration';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit, OnDestroy {
  popupContent: PopupConfiguration | null = null;
  private popupSubscription: Subscription;

  constructor(private popupService: PopupService) {
    this.popupSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.popupSubscription = this.popupService.getPopup().subscribe(content => {
      this.popupContent = content;
    });
  }

  ngOnDestroy(): void {
    this.popupSubscription.unsubscribe();
  }

  confirm(): void {
    if (this.popupContent) {
      this.popupService.closePopup(true);
    }
  }

  cancel(): void {
    this.popupService.closePopup(false);
  }
}