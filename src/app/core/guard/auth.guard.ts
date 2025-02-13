import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginComponent } from '../../shared/components/login/login.component';
import { CommonStateService } from '../services/common-state/common-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private commonStateService: CommonStateService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userId = this.commonStateService.isAnonymous();
    let user = userId || "anonymous";
 
    if (user !=="anonymous") {
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
