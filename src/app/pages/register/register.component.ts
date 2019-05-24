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

  constructor(private backend: BackendService, private auth: AuthService, private router: Router) {}

  ngOnInit() { }
  
  onSubmit() {
    console.log('clicked submit button to register')
    console.log(this.formData)
    this.auth.register(this.formData).then((response) => {
      this.router.navigate(['/login'])
    });
  }
}
