import { Injectable } from '@angular/core';
import { AppUser } from '../models/appUser.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { FlaskWorkoutsServiceService } from './flask-workouts-service.service';
import { NgFlashMessageService } from 'ng-flash-messages';



@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  user$:Observable<AppUser>

  constructor(
    private fireAuth: AngularFireAuth, 
    private db: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private notifier: NotifierService,
    private flaskUserService: FlaskWorkoutsServiceService,
    private ngFlashMessageService:NgFlashMessageService,
    ){}
    
  async registerUserWithEmailPassword(userData){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || "/";
    const credentials = await this.fireAuth.auth.createUserWithEmailAndPassword(userData.email,userData.password)
    this.router.navigateByUrl(returnUrl)
    this.saveUserData(credentials, userData)
/*     try {
      const credentials = await this.fireAuth.auth.createUserWithEmailAndPassword(userData.email,userData.password)
      this.router.navigateByUrl(returnUrl)
      this.saveUserData(credentials, userData)
    }
    catch(error) {
      this.flashMessage(error.message,'danger')
    }  */
    
  }
   saveUserData(credential:firebase.auth.UserCredential, userData){
    const ref: AngularFirestoreDocument<AppUser> = this.db.doc(`users/${credential.user.uid}`)
    /* let firstName = localStorage.getItem('firstName');
    let lastName = localStorage.getItem('lastName');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName'); */
    const fireData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      uid: credential.user.uid,
      email: credential.user.email,
      //username: userData.username,
    }
    console.log(fireData)
    return ref.set(fireData, {merge:true})
  }
  saveUserFlask(credentials, userData){
    const flaskData = {
      fire_id: credentials.uid,
      firstName : userData.firstName,
      lastName : userData.lastName,
      username: userData.username,
      email: userData.email,
      password: userData.password
    }
    return this.flaskUserService.add_user(flaskData)
  }

  flashMessage(message, type){
    this.ngFlashMessageService.showFlashMessage({
      messages: [message],
      dismissible: false,
      type: type
    })
  }
 private handleError(error){
  this.notifier.notify('error', error.message)
}
}
