import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { NgAlertComponent } from '../ng-alert/ng-alert.component';

@Component({
  selector: 'hec-login',
  standalone: true,
  imports: [FormsModule, CommonModule, NgAlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: any = '';
  redirectUrl: string = '';
  loaderActive: boolean = false;
  passwordFieldType: string = 'password';
  forgetPasswordUrl: string = "https://accounts-qalv.mheducation.com/password-assistance?loginUrl=https:%2F%2Fcreateqa.mheducation.com%2Fcreateonline%2Findex.html&app=createqa.mheducation.com";
  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private router: Router
  ) { }

  onLogin() {
    this.authService.login(this.username, this.password);
    this.authService.loginStatus$.subscribe((status) => {

      if (status === 'pending') {
        this.loaderActive = true;
      } else if (status === 'success') {
        this.loaderActive = false;
        this.activeModal.close();
        this.router.navigate([this.redirectUrl]);
      } else if (status === 'failed') {
        this.loaderActive = false;
        this.loginError = 'Invalid username or password';
      }
    });

  }
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }


  onForgotPassword() {
    // logic for the forgot Password
  }
}
