import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'hec-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string = '';
  redirectUrl: string = '';
  forgetPasswordUrl: string = "https://accounts-qalv.mheducation.com/password-assistance?loginUrl=https:%2F%2Fcreateqa.mheducation.com%2Fcreateonline%2Findex.html&app=createqa.mheducation.com";
  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private router: Router
  ) { }

  onLogin(): void {
    this.loginError = ''; // Reset any previous error messages

    const loginSuccess = this.authService.login(this.username, this.password);

    if (!loginSuccess) {
      // Show error if login failed
      this.loginError = 'Invalid username or password';
    }
    else {
      this.activeModal.close();
      this.router.navigate([this.redirectUrl]);
    }
  }


  onForgotPassword() {
    // logic for the forgot Password
  }
}
