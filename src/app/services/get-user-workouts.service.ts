import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { WorkoutModel } from '../models/workout.model';
import { CurrentUserService } from './current-user.service';
import { AppUser } from '../models/appUser.model';
import { Observable } from 'rxjs/internal/Observable';
import { map, switchMap } from 'rxjs/operators';
import { ExerciseModel } from '../models/exercise.model';


@Injectable({
  providedIn: 'root'
})
export class GetUserWorkoutsService {
  workoutRef;
  exerciseRef;
  superSetRef;
  currentUser: AppUser;
  constructor(private db:AngularFirestore, private currentUserService: CurrentUserService) { 
     this.currentUser = this.currentUserService.getCurrentUser()

     this.workoutRef = this.db.collection('/users').doc(this.currentUser.uid).collection('/workout').valueChanges()
     .pipe(map(WorkoutModel.fromJSONlist))
     
  }
  getWorkouts(){
    return this.db.collection('/users').doc(this.currentUser.uid).collection('/workout',ref =>ref.orderBy('date')).valueChanges()
     .pipe(map(WorkoutModel.fromJSONlist))

  }
  getWorkoutExercises(workoutId){
     return this.db.collection('/users').doc(this.currentUser.uid).collection('/workout').doc(workoutId).collection('/exercises').valueChanges()
     .pipe(map(ExerciseModel.fromJSONlist))
  }

  getWorkoutSuperSets(workoutId){
    return this.db.collection('/users').doc(this.currentUser.uid).collection('/workout').doc(workoutId).collection('/superSets').valueChanges()
    .pipe(map(ExerciseModel.fromJSONSuperSet)) 
 }

}
