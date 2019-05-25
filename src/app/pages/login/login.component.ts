import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formData: {
    username: string;
    password: string;
  } = {
    username: '',
    password: '',
  };

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth
      .login(this.formData)
      .then((response) => {
        const { redirectUrl } = this.auth;
        if (redirectUrl) {
          this.router.navigate([redirectUrl]);
          this.auth.redirectUrl = '';
        } else {
          //redirects to the home page
          this.router.navigate(['/']);
        }
      })
      .catch((err) => {
        console.log('error', err);
      });
  }
}
