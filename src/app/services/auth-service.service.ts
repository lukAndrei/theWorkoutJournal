import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AppUser } from '../models/appUser.model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { NotifierService } from 'angular-notifier';
import { CurrentUserService } from './current-user.service';
import { NgFlashMessageService } from 'ng-flash-messages';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user$: Observable<AppUser>
  appUser$: Observable<AppUser>
  constructor(private fireAuth: AngularFireAuth, 
    private db: AngularFirestore, 
    private router: Router, 
    private route: ActivatedRoute,    
    private notifier: NotifierService, 
    private currentUserService: CurrentUserService,
    private ngFlashMessageService:NgFlashMessageService,
    ) { 
    this.user$ = this.fireAuth.authState.pipe(switchMap(user => {
      if (user) 
      {
        this.appUser$ =  this.db.doc<AppUser>(`users/${user.uid}`).valueChanges()
        return this.appUser$
      }
      else return of(null)
    }))
  }
  loginWithUserAndPassword(email, password){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.fireAuth.auth.signInWithEmailAndPassword(email, password)
    .then((credential) => {
      this.flashMessage('Welcome back','success')
      return this.router.navigateByUrl(returnUrl)
    })
    .catch(error=>{
      this.flashMessage(error.message,'danger')
    })
  }

  async googleLogin(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    const provider = new firebase.auth.GoogleAuthProvider;
    const credential = await this.fireAuth.auth.signInWithPopup(provider)
    let firstName = credential.user.displayName.split(' ')[0];
    this.flashMessage('Hello ' +  firstName,'success')
    this.router.navigateByUrl(returnUrl)
    return this.saveGoogleUser(credential)
  }

  saveGoogleUser(credential: firebase.auth.UserCredential){

        const ref: AngularFirestoreDocument<AppUser> = this.db.doc(`users/${credential.user.uid}`)
        let firstName = credential.user.displayName.split(' ')[0];
        let lastName = credential.user.displayName.split(' ')[1];
        let email = credential.user.email
        let uid = credential.user.uid;
        const userData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          username: firstName,
          uid: uid,
        }
        ref.set(userData, {merge:true})
    }

  async logout(){
    await this.fireAuth.auth.signOut()
    .then(()=>{
      this.flashMessage('You are now logged out','success')
      this.router.navigate(['/login']);
      this.currentUserService.removeUser()
    })
    .catch(error=>{
      this.flashMessage('An error occured while trying to logout','success')
    })
   
  }
  getAuth(){
    return this.fireAuth.auth
  }
  resetPassword(email){
    return this.fireAuth.auth.sendPasswordResetEmail(email)
    .then(
      ()=>this.flashMessage('A password reset link has been sent', 'success'),
      (reject)=> this.flashMessage(reject, 'danger'))
    .catch(error=>{
      this.flashMessage('An error occured while trying to reset the password','danger')
    })
  }
  private handleError(error){
    this.notifier.notify('error', error.message)
 }
 flashMessage(message, type){
  this.ngFlashMessageService.showFlashMessage({
    messages: [message],
    dismissible: true,
    timeout: 5000,
    type: type
    });
  };
}
