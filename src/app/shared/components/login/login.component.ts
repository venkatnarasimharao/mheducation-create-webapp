import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { NgAlertComponent } from '../ng-alert/ng-alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hec-login',
  standalone: true,
  imports: [FormsModule, NgAlertComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form = {
    username: '',
    password: ''
  };
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

  onSubmit(f: NgForm) {
    this.loaderActive = true;
    if (!f.valid) {
      return;
    }
    this.authService.login(this.form.username, this.form.password);
    this.authService.loginStatus$.subscribe((status) => {

      if (status === 'success') {
        this.loaderActive = false;
        this.activeModal.close();
        if (this.redirectUrl) {
          this.router.navigate([this.redirectUrl]);
        }

      } else if (status === 'failed') {
        this.loaderActive = false;
        this.loginError = this.authService.getLoginErrorMessage();
      }
    });

  }
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }


  onForgotPassword() {
    // logic for the forgot Password
    this.loginError = "not integrated at this time";
  }
}
