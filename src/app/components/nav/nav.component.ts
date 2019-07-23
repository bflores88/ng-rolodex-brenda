import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  user: {
    loggedIn: boolean,
    username: string
  };

  constructor(private backend: BackendService, private router: Router, private session: SessionService, private auth: AuthService) {
    this.user = this.session.getSession();
  }

  ngOnInit() {
  }

  isLoggedIn() {
    return this.session.isLoggedIn();
  }

  login() {
    return this.router.navigate(['/login'])
  }

  logout() {
    console.log('clicked logout')
    return this.auth.logout()
      .then(() => {
        this.router.navigate(['/login'])
    })
  }

}
