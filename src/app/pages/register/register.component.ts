import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

interface CheckUserResponse {
  username: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formData: {
    username: string;
    password: string;
    name: string;
    email: string;
    address: string;
  } = {
    username: '',
    password: '',
    name: '',
    email: '',
    address: '',
    };
  
  usernameInvalid = true;
  usernameErrorMessage = '';
  passwordInvalid = true;
  passwordErrorMessage = '';
  nameInvalid = true;
  nameErrorMessage = '';
  emailInvalid = true;
  emailErrorMessage = '';

  constructor(private backend: BackendService, private auth: AuthService, private router: Router) {}

  ngOnInit() { }

  ValidateUsername() {
    const { username } = this.formData;
    if (!username) {
      this.usernameErrorMessage = "Username is required";
      return (this.usernameInvalid = true);
    }

    if (username.length < 3) {
      this.usernameErrorMessage = "Username must have 3 or more characters";
      return (this.usernameInvalid = true);
    }

    this.backend.getUserSearch(username).then((data: CheckUserResponse) => {
      if (data.username) {
        this.usernameErrorMessage = "Username already exists";
        return (this.usernameInvalid = true);
      }
    })

    this.usernameInvalid = false;
    this.usernameErrorMessage = '';
  }

  ValidatePassword() {
    const { password } = this.formData;
    if (!password) {
      this.passwordErrorMessage = "Password is required"
      return (this.passwordInvalid = true)
    }

    if (password.length < 6) {
      this.passwordErrorMessage = "Password must be at least 6 characters long"
      return (this.passwordInvalid = true)
    }

    this.passwordInvalid = false;
    this.passwordErrorMessage = '';
  }
  
  ValidateName() {
    const { name } = this.formData;
    console.log('validate name function')
    if (!name) {
      this.nameErrorMessage = 'Name is Required';
      return (this.nameInvalid = true);
    } else if (name.length < 3) {
      this.nameErrorMessage = 'Name is too short';
      return (this.nameInvalid = true);
    }


    this.nameErrorMessage = '';
    return (this.nameInvalid = false);
  }

  ValidateEmail() {
    const { email } = this.formData;

    if (!email) {
      this.emailErrorMessage = 'Email is required';
      return (this.emailInvalid = true);
    } else if (!email.includes('@')) {
      this.emailErrorMessage = 'Email not formatted correctly.';
      return (this.emailInvalid = true);
    }

    this.emailErrorMessage = '';
    return (this.emailInvalid = false);
  }

  onSubmit() {
    this.auth.register(this.formData).then((response) => {
      this.router.navigate(['/login']);
    });
  }

  onBackToLogin() {
    this.router.navigate(['/login']);
  }
}
