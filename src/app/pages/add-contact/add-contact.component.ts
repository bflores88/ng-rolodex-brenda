import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';

interface ContactResponse {
  name: string;
  address: string;
  mobile: string;
  work: string;
  home: string;
  email: string;
  twitter: string;
  instagram: string;
  github: string;
  created_by: number;
}

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {
  contact: {
    name: string;
    address: string;
    mobile: string;
    work: string;
    home: string;
    email: string;
    twitter: string;
    instagram: string;
    github: string;
    created_by: number;
  } = {
    name: '',
    address: '',
    mobile: '',
    work: '',
    home: '',
    email: '',
    twitter: '',
    instagram: '',
    github: '',
    created_by: 1,
  }; 

  formData: {
    name: string;
    address: string;
    mobile: string;
    work: string;
    home: string;
    email: string;
    twitter: string;
    instagram: string;
    github: string;
    created_by: number;
  } = {
    name: '',
    address: '',
    mobile: '',
    work: '',
    home: '',
    email: '',
    twitter: '',
    instagram: '',
    github: '',
    created_by: 1,
    };
  
  nameInvalid = true;
  nameErrorMessage = '';

  constructor(private backend: BackendService) { }
  
  ValidateName() {
    const { name } = this.formData;

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

  ngOnInit() {}

  submitNewContact() {
    console.log('clicked button');
    const {
      name,
      address,
      email,
      mobile,
      work,
      home,
      twitter,
      instagram,
      github,
      created_by,
    } = this.formData;
    this.backend
      .postContact(name, address, email, mobile, work, home, twitter, instagram, github, created_by)
      .then((data: ContactResponse) => {
        console.log(data);
        this.contact = data;
      });
  }
}
