import { Component } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';
import { CurrentUserService } from './services/current-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'twj';
  constructor(private authService: AuthServiceService, private currentUserService: CurrentUserService){
      this.authService.user$.subscribe(user => {
         this.currentUserService.setUser(user)
      })
  }
}
