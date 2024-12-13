import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private visibilitySubject = new BehaviorSubject<boolean>(false);
  private overlaySubject = new BehaviorSubject<boolean>(false);

  visibility$ = this.visibilitySubject.asObservable();

  overlay$ = this.overlaySubject.asObservable();

  toggleSidebar(): void {
    this.visibilitySubject.next(!this.visibilitySubject.value);
  }

  setOverlay(isOverlay: boolean): void {
    this.overlaySubject.next(isOverlay);
  }
}
