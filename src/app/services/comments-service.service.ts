import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CurrentUserService } from './current-user.service';
import { AppUser } from '../models/appUser.model';
import { WorkoutModel } from '../models/workout.model';
import { stringify } from 'querystring';
import { WorkoutComment } from '../models/comment.model';
import { Observable } from 'rxjs';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class CommentsServiceService {
  currentUser: AppUser;
  userWorkoutsRef;
  workoutsRef;
  constructor(private db: AngularFirestore, private currentUserService: CurrentUserService) {
  }
  getComments(workoutId){
    return this.db.collection('/workouts').doc(workoutId).collection('/comments', query=>query.orderBy('timestamp','desc')).valueChanges()
  }
  addComment(workoutId, newComment: WorkoutComment){
    newComment.id = this.db.createId()
    let commentRef = this.db.collection('/workouts').doc(workoutId).collection('/comments').doc(newComment.id).set(newComment, {merge: true})
  }
  replyComment(workoutId, reply: WorkoutComment){
    this.db.collection('/workouts').doc(workoutId).collection('/comments').doc(reply.id).set(reply, {merge: true})
  }
  removeComment(user: AppUser, workout: WorkoutModel){
  }
}
