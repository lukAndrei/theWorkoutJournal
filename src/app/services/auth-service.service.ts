import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AppUser } from '../models/appUser.model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user$: Observable<AppUser>
  constructor(private fireAuth: AngularFireAuth, private db: AngularFirestore, private router: Router, private route: ActivatedRoute) { 
    this.user$ = this.fireAuth.authState.pipe(switchMap(user => {
      if (user) return this.db.doc<AppUser>(`users/${user.uid}`).valueChanges()
      else return of(null)
    }))
  }
  loginWithUserAndPassword(email, password){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
    this.fireAuth.auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      return this.router.navigateByUrl(returnUrl)
    })

  }
  async logout(){
    await this.fireAuth.auth.signOut()
    this.router.navigate(['/']);
  }
}
