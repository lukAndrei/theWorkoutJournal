import { Component, OnInit } from '@angular/core';
import { RegisterServiceService } from '../services/register-service.service';

@Component({
  selector: 'create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {

  constructor(private registerService: RegisterServiceService) { }

  registerUserWithEmailPassword(userData){
    console.log(userData)
    localStorage.setItem('firstName', userData.firstName);
    localStorage.setItem('lastName',userData.lastName)
    this.registerService.registerUserWithEmailPassword(userData)
  }

  

}