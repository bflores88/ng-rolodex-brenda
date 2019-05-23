import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';

interface ContactResponse {
  id: string;
  name: string;
  address: string;
  mobile: string;
  work: string;
  home: string;
  email: string;
  twitter: string;
  instagram: string;
  github: string;
  created_by: string;
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts: {
    id: string;
    name: string;
    address: string;
    mobile: string;
    work: string;
    home: string;
    email: string;
    twitter: string;
    instagram: string;
    github: string;
    created_by: string;
  }[] = []

  constructor(private backend: BackendService) { }

  ngOnInit() {
    this.backend.getContacts().then((data: ContactResponse[]) => {
      this.contacts = data;
    });
  }

}
