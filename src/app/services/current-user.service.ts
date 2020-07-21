import { Injectable } from '@angular/core';
import { AppUser } from '../models/appUser.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor() { }
  setUser(currentUser:AppUser){
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
  }
  removeUser(){
    localStorage.removeItem('currentUser')
  }
  getCurrentUser():AppUser{
    return JSON.parse(localStorage.getItem('currentUser'))
  }
  getCurrentUserID(){
    let user: AppUser = this.getCurrentUser()
    return user.uid
  }
  getCurrentUserName(){
    let user: AppUser = this.getCurrentUser()
    return {
      firstName: user.firstName,
      lastName: user.lastName
    }
  }
  getCurrentUserEmail(){
    let user: AppUser = this.getCurrentUser();
    return user.email;
  }
}
