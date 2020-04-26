import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { WorkoutModel } from '../models/workout.model';
import { AppUser } from '../models/appUser.model';
import { CurrentUserService } from './current-user.service';


@Injectable({
  providedIn: 'root'
})
export class CreateWorkoutService {
  currentUser: AppUser;
  constructor(private db: AngularFirestore, private currentUserService: CurrentUserService) { 
    this.currentUser = this.currentUserService.getCurrentUser();
  }

  submitEx(f, workout: WorkoutModel){

    workout.name = f.workoutName;
    workout.type = f.workoutType;

    let exList = workout.exerciseList;
    let superSetList = workout.superSet;

    workout.id = this.db.createId();
    let workoutRef = this.db.collection('/users').doc(this.currentUser.uid).collection('/workout').doc(workout.id)
    let exRef = workoutRef.collection('/exercises');
    let superSetRef = workoutRef.collection('/superSets')

    let workoutInfo = {
      name: workout.name || '',
      type: workout.type || '',
      id: workout.id,
      date: Date.now()
    }
    workoutRef.set(workoutInfo, {merge:true})

    exList.forEach(ex => {
      let exData = {
        exName: ex.name,
        set: ex.sets,
        totalReps: ex.totalReps,
        totalSets: ex.totalSets,
        id: ex.id
      }
      exRef.doc(ex.id).set(exData, {merge:true});
    });

    superSetList.forEach(set => {
        let superSetData = {
          rounds: set.noOfTimes,
          exercises: []
        }
        set.setList.forEach(ex=>{
          let exModel = {
            exName: ex.name,
            set: ex.sets,
            totalReps: ex.totalReps,
            totalSets: ex.totalSets,
            id:ex.id
          }
          superSetData.exercises.push(exModel)
        })
        superSetRef.doc(this.db.createId()).set(superSetData,{merge: true})
    });
  }
}

