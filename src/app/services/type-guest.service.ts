import { Injectable } from '@angular/core';
import { TypeGuest } from '../components/kit/model-config/type-guest.class';

@Injectable({
  providedIn: 'root'
})
export class TypeGuestService {
  private typeGuest: TypeGuest | null = null;

  constructor() { }

  setTypeGuest(typeGuest: TypeGuest): void {
    this.typeGuest = typeGuest;
  }

  getTypeGuest(): TypeGuest | null {
    return this.typeGuest;
  }
}
