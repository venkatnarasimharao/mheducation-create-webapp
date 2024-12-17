import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuSidebarService {
  private openMenuRequest = new Subject<void>();
  openMenuRequest$ = this.openMenuRequest.asObservable();

  requestOpenMenu() {
    this.openMenuRequest.next();
  }
}
