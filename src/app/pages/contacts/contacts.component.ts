import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';

interface ContactResponse {
  id: number;
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
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts: {
    id: number;
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
  }[] = []

  formData: {
    id: number;
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
    id: 0,
    name: '',
    address: '',
    mobile: '',
    work: '',
    home: '',
    email: '',
    twitter: '',
    instagram: '',
    github: '',
    created_by: 0,
  };

  showContacts = true;
  showEditContact = false;

  constructor(private backend: BackendService, private session: SessionService, private router: Router ) { }

  ngOnInit() {
    let user = this.session.getSession();
    let userID = user.id;
    this.formData.created_by = parseInt(userID);
    this.backend.getContacts(userID).then((data: ContactResponse[]) => {
      this.contacts = data;
    });
  }

  onDelete(e) {
    console.log(e.target.value)
    this.backend.deleteContact(e.target.value).then((data: ContactResponse[]) => {
      this.ngOnInit();
      this.showContacts = true;
      return this.showEditContact = false;
    })
  }

  onEdit(e) {
    let contactID = e.target.value;
    this.backend.getSingleContact(contactID).then((data: ContactResponse) => {
      this.formData = data;
      this.showContacts = false;
      this.showEditContact = true;
    })


  }

  onSubmitEdit(e) {
    e.preventDefault()
    const contactID = this.formData.id;
    const data = {
      name: this.formData.name,
      address: this.formData.address,
      email: this.formData.email,
      mobile: this.formData.mobile,
      work: this.formData.work,
      home: this.formData.home,
      twitter: this.formData.twitter,
      instagram: this.formData.instagram,
      github: this.formData.github,
      created_by: this.formData.created_by
    }
    this.backend.editContact(contactID, data)
      .then((response: ContactResponse[]) => {
        this.contacts = response;
        this.showContacts = true;
        this.showEditContact = false;
      })
  }

  onGoBack() {
    this.ngOnInit()
    this.showContacts = true;
    this.showEditContact = false;
  }

}
