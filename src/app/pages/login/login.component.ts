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
    this.auth.login(this.formData)
      .then((response) => {
        console.log(response)
        console.log('user logged in')
        this.router.navigate(['/home'])
      })
      .catch((err) => {
      console.log('error', err)
    })
  }
}
