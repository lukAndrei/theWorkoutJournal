import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AppUser } from '../models/appUser.model';
import { CurrentUserService } from './current-user.service';
import { GenerateWorkoutJsonService } from './generate-workout-json.service';


@Injectable({
  providedIn: 'root'
})
export class CreateWorkoutService {
  currentUser: AppUser;
 
  constructor(private db: AngularFirestore, private currentUserService: CurrentUserService, private generateWorkoutJSON: GenerateWorkoutJsonService) { 
    this.currentUser = this.currentUserService.getCurrentUser();

  }

  submitWorkout(workoutJSON){
    let workoutInfo = workoutJSON.workoutInfo;
    let superSetListData = workoutJSON.setList;

    let userWorkoutRef = this.db.collection('/users').doc(this.currentUser.uid).collection('/workout').doc(workoutInfo.id);
    let workoutRef = this.db.collection('/workouts').doc(workoutInfo.id);

    let userSuperSetRef = userWorkoutRef.collection('/superSets')
    let superSetRef = workoutRef.collection('/superSets')

    userWorkoutRef.set(workoutInfo)
    workoutRef.set(workoutInfo)

    superSetListData.forEach(setData=>{
      userSuperSetRef.doc(setData.id).set(setData)
      superSetRef.doc(setData.id).set(setData)
    })

  }
  updateWorkout(workoutJSON){
    let workoutInfo = workoutJSON.workoutInfo;
    let superSetListData = workoutJSON.setList;

    let userWorkoutRef = this.db.collection('/users').doc(this.currentUser.uid).collection('/workout').doc(workoutInfo.id);
    let workoutRef = this.db.collection('/workouts').doc(workoutInfo.id);
    let userSuperSetRef = userWorkoutRef.collection('/superSets');
    let superSetRef = workoutRef.collection('/superSets')

    userWorkoutRef.set(workoutInfo)
    workoutRef.set(workoutInfo)

    superSetListData.forEach(setData=>{
      userSuperSetRef.doc(setData.id).set(setData)
      superSetRef.doc(setData.id).set(setData)
    })
  }

}

