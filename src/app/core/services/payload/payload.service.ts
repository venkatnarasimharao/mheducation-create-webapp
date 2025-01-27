import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PayloadService {

  private payload: any = null;

  setPayload(newPayload: any): void {
    this.payload = newPayload;
  }

  getPayload(): any {
    return this.payload;
  }

  updatePayload(updatedPayload: any): void {
    this.payload = { ...this.payload, ...updatedPayload };
  }
}
