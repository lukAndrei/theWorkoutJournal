import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { WorkoutModel } from '../models/workout.model';
import { CurrentUserService } from './current-user.service';
import { AppUser } from '../models/appUser.model';
import { map, switchMap,  flatMap } from 'rxjs/operators';
import { ExerciseModel } from '../models/exercise.model';
import { SuperSetModel } from '../models/superset.model';
import { from, of, Subscription } from 'rxjs';
import { AuthServiceService } from './auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class GetUserWorkoutsService {
  
  currentUser: AppUser;
  workoutRef: AngularFirestoreCollection<WorkoutModel>
  workouts: WorkoutModel[] = []
  allWorkoutsRef: AngularFirestoreCollection<WorkoutModel>
  

  constructor(private db:AngularFirestore, private currentUserService: CurrentUserService, private authService: AuthServiceService) { 

  }
  
  createUserWorkoutsList(userId){
    return this.getWorkouts(userId)
    .pipe(
      switchMap(wList=>{
        this.workouts = wList
        return from(this.workouts)
      }
        ),
      flatMap(workout=>{
         return this.getWorkoutSuperSets(workout.id,userId).pipe(map(setList=>{
          workout.superSetList = setList;
          workout.superSetList.forEach(superSet=>{
            superSet.exerciseList.forEach(ex=>{
              if (!workout.exerciseList.includes(ex)) workout.exerciseList.push(ex)
            })
          })
          return this.workouts
        }))
      }),
    )
  }
  createAllWorkoutsList(){

    return this.getAllWorkouts()
    .pipe(
      switchMap(wList=>{
        this.workouts = wList
        return from(this.workouts)
      }
        ),
      flatMap(workout=>{
         return this.getAllWorkoutSuperSets(workout.id).pipe(map(setList=>{
          workout.superSetList = setList;
          workout.superSetList.forEach(superSet=>{
            superSet.exerciseList.forEach(ex=>{
              if (!workout.exerciseList.includes(ex)) workout.exerciseList.push(ex)
            })
          })
          return this.workouts
        }))
      }),
    )

  }
  
  getWorkouts(userId){
    return this.db.collection('/users').doc(userId).collection('/workout', query=>query.orderBy('date')).valueChanges()
     .pipe(map(WorkoutModel.fromJSONlist))
  }
  getAllWorkouts(){
    return this.db.collection('/workouts', query=>query.orderBy('date')).valueChanges()
     .pipe(map(WorkoutModel.fromJSONlist))
  }

  getWorkoutSuperSets(workoutId,userId){
    return this.db.collection('/users').doc(userId).collection('/workout').doc(workoutId).collection('/superSets').valueChanges()
    .pipe(map(SuperSetModel.fromJSONlist))
 }
  getAllWorkoutSuperSets(workoutId){
  return this.db.collection('/workouts').doc(workoutId).collection('/superSets').valueChanges()
  .pipe(map(SuperSetModel.fromJSONlist))
}


}
