import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface UserResponse {
  name: string;
  address: string;
  username: string;
  email: string;
  id: number;
}

interface CheckUserResponse {
  username: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userID = 0;
  username = '';

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
  usernameInvalid = false;
  usernameErrorMessage = '';

  constructor(
    private backend: BackendService,
    private session: SessionService,
    private router: Router,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    let user = this.session.getSession();
    this.userID = parseInt(user.id);
    this.username = user.username;


    if (this.userID > 0) {
      return this.getUser();
    }
  }

  getUserSession() {
    let user = this.session.getSession();
    this.userID = parseInt(user.id);
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

  ValidateUsername() {
    const { username } = this.formData;
    if (!username) {
      this.usernameErrorMessage = "Username is required";
      return (this.usernameInvalid = true);
    }

    if (username.length < 3) {
      this.usernameErrorMessage = "Username must have 3 or more characters";
      return (this.usernameInvalid = true);
    }

    this.backend.getUserSearch(username).then((data: CheckUserResponse) => {
      if (data.username && username !== this.username) {
        this.usernameErrorMessage = "Username already exists";
        return (this.usernameInvalid = true);
      }
    })

    this.usernameInvalid = false;
    this.usernameErrorMessage = '';
  }

  handleGoBack() {
    this.showProfile = true;
    this.showEdit = false;
  }

  handleEditSubmit() {
    const userID = this.user.id;
    const userUpdate = this.formData;
    this.backend
      .editUser(userID, userUpdate)
      .then((data: UserResponse) => {
        this.user = data;
      })
      .then(() => {
        this.showProfile = true;
        this.showEdit = false;
      });
  }

  handleDeleteUser() {
    console.log('clicked delete user');
    const userID = this.user.id;
    console.log('userID', userID);

    return this.auth.logout().then(() => {
      this.backend.deleteUser(userID);
      this.router.navigate(['/login']);
    });
  }
}
