import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthServiceService) { }

  loginWithUserAndPassword(formData){
     let email = formData.email;
     let password = formData.password
     this.authService.loginWithUserAndPassword(email,password)
  }



}
