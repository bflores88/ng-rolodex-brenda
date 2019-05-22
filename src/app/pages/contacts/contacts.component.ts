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
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
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
  }[] = []

  constructor(private backend: BackendService) { }

  ngOnInit() {
    this.backend.getContacts().then((data: ContactResponse[]) => {
      console.log(data);
      this.contacts = data;
    });

  }

}
