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
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  formData: {
    name: string;
  } = {
    name: '',
  };

  contacts: {
    name: string;
    address: string;
    mobile: string;
    work: string;
    home: string;
    email: string;
    twitter: string;
    instagram: string;
    github: string;
  }[] = [];

  constructor(private backend: BackendService) {}

  ngOnInit() {
  }

  onChange() {
    const { name } = this.formData;
    if (this.formData.name !== '') {
      this.backend.getContactSearch(name).then((data: ContactResponse[]) => {
        this.contacts = data;
      });
    } else {
      this.contacts = []
    }
  }
}
