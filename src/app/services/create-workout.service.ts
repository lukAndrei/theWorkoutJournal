import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AppUser } from '../models/appUser.model';
import { CurrentUserService } from './current-user.service';
import { FlaskWorkoutsServiceService } from './flask-workouts-service.service';
import { GenerateWorkoutJsonService } from './generate-workout-json.service';
import { RemoveWorkoutsService } from './remove-workouts.service';


@Injectable({
  providedIn: 'root'
})
export class CreateWorkoutService {
  currentUser: AppUser;
 
  constructor(private db: AngularFirestore, 
    private currentUserService: CurrentUserService, 
    private removeWorkoutsService: RemoveWorkoutsService,
    private flaskWorkoutsService: FlaskWorkoutsServiceService
    ) { 
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
    workoutInfo.userId = this.currentUser.uid
    this.flaskWorkoutsService.addWorkout(workoutInfo)

    superSetListData.forEach(setData=>{
      userSuperSetRef.doc(setData.id).set(setData, )
      superSetRef.doc(setData.id).set(setData)
    })
  }

   updateWorkout(workoutJSON){
    let workoutInfo = workoutJSON.workoutInfo;
    let superSetListData = workoutJSON.setList;
    let deleteSupersetIds = this.removeWorkoutsService.getDeleteSupersetList();

    let userWorkoutRef = this.db.collection('/users').doc(this.currentUser.uid).collection('/workout').doc(workoutInfo.id);
    let workoutRef = this.db.collection('/workouts').doc(workoutInfo.id);
    userWorkoutRef.set(workoutInfo)
    workoutRef.set(workoutInfo)

    let userSuperSetRef = userWorkoutRef.collection('/superSets');
    let superSetRef = workoutRef.collection('/superSets')
    superSetListData.forEach(setData=>{
      userSuperSetRef.doc(setData.id).set(setData)
      superSetRef.doc(setData.id).set(setData)
    })
    deleteSupersetIds.forEach(id=>{
      userSuperSetRef.doc(id).delete()
      superSetRef.doc(id).delete()
    })
    this.removeWorkoutsService.clearDeleteSupersetList();
  }

}

