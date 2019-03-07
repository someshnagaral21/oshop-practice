import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'bc-navbar',
  templateUrl: './bc-navbar.component.html',
  styleUrls: ['./bc-navbar.component.css']
})
export class BcNavbarComponent {
  appUser: AppUser;
  constructor(private auth: AuthService) { 
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }
  logout(){
    this.auth.logout();

  }
}
