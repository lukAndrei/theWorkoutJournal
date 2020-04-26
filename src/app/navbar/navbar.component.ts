import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Subscription, Observable } from 'rxjs';
import { AppUser } from '../models/appUser.model';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  user: AppUser
  constructor(private authService: AuthServiceService) { 
     this.authService.user$.subscribe(user => {
      this.user = user })
  }
  ngOnInit() {
  }
  logout(){
    this.authService.logout()
  }
ngOnDestroy(){
}
}
