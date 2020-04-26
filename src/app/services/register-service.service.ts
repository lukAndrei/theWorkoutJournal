import { Injectable } from '@angular/core';
import { AppUser } from '../models/appUser.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';


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
    private notifier: NotifierService
    ) {
    
   }
   registerUserWithEmailPassword(userData){
     let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || "/"
     this.fireAuth.auth.createUserWithEmailAndPassword(userData.email,userData.password)
     .then(credential => {
       this.router.navigateByUrl(returnUrl)
       this.saveUserData(credential.user)
      })
      .catch(error => {
        this.handleError(error)
      })
   }
   saveUserData(userData){
    const ref: AngularFirestoreDocument<AppUser> = this.db.doc(`users/${userData.uid}`)
    let firstName = localStorage.getItem('firstName');
    let lastName = localStorage.getItem('lastName');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: userData.email,
      uid: userData.uid
    }
    return ref.set(data, {merge:true})
 }
 private handleError(error){
  this.notifier.notify('error', error.message)
}
}
