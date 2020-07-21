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


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user$: Observable<AppUser>
  constructor(private fireAuth: AngularFireAuth, 
    private db: AngularFirestore, 
    private router: Router, 
    private route: ActivatedRoute, 
    private notifier: NotifierService, 
    private currentUserService: CurrentUserService) { 
    this.user$ = this.fireAuth.authState.pipe(switchMap(user => {
      if (user) return this.db.doc<AppUser>(`users/${user.uid}`).valueChanges()
      else return of(null)
    }))
  }
  loginWithUserAndPassword(email, password){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.fireAuth.auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      return this.router.navigateByUrl(returnUrl)
    }).catch(error=>{
      this.handleError(error)
    })

  }

  async googleLogin(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    const provider = new firebase.auth.GoogleAuthProvider;
    const credential = await this.fireAuth.auth.signInWithPopup(provider)
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
          uid: uid,
        }
        ref.set(userData, {merge:true})
    }

  async logout(){
    await this.fireAuth.auth.signOut()
    this.router.navigate(['/']);
    this.currentUserService.removeUser()
  }
  private handleError(error){
    this.notifier.notify('error', error.message)
 }
}
