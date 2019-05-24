import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { SessionService } from 'src/app/services/session.service';

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
  user = 0;

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

  constructor(private backend: BackendService, private session: SessionService) {}

  ngOnInit() {
    let user = this.session.getSession();
    this.user = parseInt(user.id);
  }

  onChange() {
    const { name } = this.formData;
    const user = this.user ;
    if (this.formData.name !== '') {
      this.backend.getContactSearch(name, user).then((data: ContactResponse[]) => {
        this.contacts = data;
      });
    } else {
      this.contacts = []
    }
  }
}
