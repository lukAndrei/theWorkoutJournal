import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CurrentUserService } from './current-user.service';
import { AppUser } from '../models/appUser.model';

@Injectable({
  providedIn: 'root'
})
export class RemoveWorkoutsService {
  currentUser: AppUser;
  workoutRef;
  allWorkoutsRef;

  constructor(private db: AngularFirestore, private currentUserService: CurrentUserService) {
    this.currentUser = this.currentUserService.getCurrentUser()
    this.workoutRef = this.db.collection('/users').doc(this.currentUser.uid).collection('/workout')
    this.allWorkoutsRef = this.db.collection('/workouts')

   }

   deleteSuperset(workoutId,supersetId){
    let userWorkoutRef = this.db.collection('/users').doc(this.currentUser.uid).collection('/workout').doc(workoutId);
    let workoutRef = this.db.collection('/workouts').doc(workoutId);

    userWorkoutRef.collection('/superSets').doc(supersetId).delete()
    workoutRef.collection('/superSets').doc(supersetId).delete()
  }

  deleteWorkout(workoutId){
    let excerciseRef = this.db.collection('/users').doc(this.currentUser.uid).collection('/workout').doc(workoutId).collection('/exercises')
    excerciseRef.valueChanges().subscribe(exList=>{
      exList.forEach(ex=>{
        excerciseRef.doc(ex.id).delete()
      })
    })  
  
    let superSetRef = this.db.collection('/users').doc(this.currentUser.uid).collection('/workout').doc(workoutId).collection('/superSets')
    superSetRef.valueChanges().subscribe(superSetList=>{
      superSetList.forEach(superSet=>{
        superSetRef.doc(superSet.id).delete()
      })
    })
  
    this.workoutRef.doc(workoutId).delete()
   }

   deleteAllWorkout(workoutId){
     console.log(workoutId)
    let excerciseRef = this.db.collection('/workouts').doc(workoutId).collection('/exercises')
    excerciseRef.valueChanges().subscribe(exList=>{
      exList.forEach(ex=>{
        excerciseRef.doc(ex.id).delete()
      })
    })  
  
    let superSetRef = this.db.collection('/workouts').doc(workoutId).collection('/superSets')
    superSetRef.valueChanges().subscribe(superSetList=>{
      superSetList.forEach(superSet=>{
        superSetRef.doc(superSet.id).delete()
      })
    })

    this.allWorkoutsRef.doc(workoutId).delete()
   }
}
