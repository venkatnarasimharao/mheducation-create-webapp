import { ApiService } from './../services/api/api.service';
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
    private ApiService: ApiService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.ApiService.isAnonymous()) {
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
