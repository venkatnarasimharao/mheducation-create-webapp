import { CommonModule } from '@angular/common';
import { CommonStateService } from './../services/common-state/common-state.service';
import { SharedstateService } from './../services/shared-state/sharedstate.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginComponent } from '../../shared/components/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private modalService: NgbModal,
    private commonStateService: CommonStateService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userId = this.commonStateService.isAnonymous();
    let user = userId || "anonymous";
    if (user !="anonymous") {
      return true;
    }
    else {
      const redirectUrl = state.url;
      const modalRef = this.modalService.open(LoginComponent, { centered: false });
      modalRef.componentInstance.redirectUrl = redirectUrl;
      return false;
    }
  }
}
