import { Injectable } from '@angular/core';
import { Guest } from '../components/kit/model-config/guest.class';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private guest: Guest | null = null;

  constructor() { }

  setGuest(guest: Guest): void {
    this.guest = guest;
  }

  getGuest(): Guest | null {
    return this.guest;
  }
}