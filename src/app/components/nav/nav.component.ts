import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private backend: BackendService) { }

  ngOnInit() {
  }

  logoutSubmit() {
    
  }

}
