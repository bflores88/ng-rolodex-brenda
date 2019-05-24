import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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

  nameInvalid = true;
  nameErrorMessage = '';
  emailInvalid = true;
  emailErrorMessage = '';

  constructor(private backend: BackendService, private auth: AuthService, private router: Router) {}

  ngOnInit() { }
  
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

    
    this.backend.getUserSearch(this.formData.username).then((response) => {
      console.log(response);
    })

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
}
