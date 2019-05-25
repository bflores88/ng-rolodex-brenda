import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { SessionService } from 'src/app/services/session.service';

interface UserResponse {
  name: string;
  address: string;
  username: string;
  email: string;
  id: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userID = 0;

  user: {
    name: string;
    username: string;
    address: string;
    email: string;
    id: number;
  }; 

  editUser: {
    name: string;
    username: string;
    address: string;
    email: string;
  } = {
    name: '',
    username: '',
    address: '',
    email: '',
  };

  formData: {
    name: string;
    username: string;
    address: string;
    email: string;
  } = {
    name: '',
    username: '',
    address: '',
    email: '',
  };

  showProfile = true;
  showEdit = false;

  constructor(private backend: BackendService, private session: SessionService) {}

  ngOnInit() {
    let user = this.session.getSession();
    this.userID = parseInt(user.id);

    if (this.userID > 0) {
      return this.getUser();
    }
  }

  getUser() {
    this.backend.getUser(this.userID).then((data: UserResponse) => {
      this.user = data;
      this.editUser = data;
      this.formData = data;
    });
  }

  handleUserEdit() {
    this.showProfile = false;
    this.showEdit = true;
  }

  handleGoBack() {
    this.showProfile = true;
    this.showEdit = false;
  }

  handleEditSubmit() {
    const userID = this.user.id;
    const userUpdate = this.formData;
    this.backend.editUser(userID, userUpdate).then((data: UserResponse) => {
      this.user = data;
    }).then(() => {
      this.showProfile = true;
      this.showEdit = false;
    })
  }
}
