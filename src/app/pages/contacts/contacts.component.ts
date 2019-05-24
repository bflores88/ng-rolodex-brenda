import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { SessionService } from 'src/app/services/session.service';

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

  constructor(private backend: BackendService, private session: SessionService) { }

  ngOnInit() {
    let user = this.session.getSession();
    let userID = user.id;
    this.backend.getContacts(userID).then((data: ContactResponse[]) => {
      this.contacts = data;
    });
  }

  onDelete(e) {
    this.backend.deleteContact(e.target.value).then((data: ContactResponse[]) => {
      return this.ngOnInit();
    })
  }

}
