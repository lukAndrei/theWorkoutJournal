import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetUserWorkoutsService } from '../services/get-user-workouts.service';
import { WorkoutModel } from '../models/workout.model';
import {  map, switchMap, flatMap } from 'rxjs/operators';
import { Subscription, from } from 'rxjs';
import { RemoveWorkoutsService } from '../services/remove-workouts.service';
import { WorkoutSubscriptionServiceService } from '../services/workout-subscription-service.service';
import { AppUser } from '../models/appUser.model';
import { CurrentUserService } from '../services/current-user.service';


@Component({
  selector: 'app-user-workouts',
  templateUrl: './user-workouts.component.html',
  styleUrls: ['./user-workouts.component.css']
})
export class UserWorkoutsComponent implements OnInit, OnDestroy {
  workouts: WorkoutModel[] = [];
  workoutsSubsbscription: Subscription;
  currentUser: AppUser;

  constructor(private getUserWorkouts: GetUserWorkoutsService,
     private removeWorkoutsService: RemoveWorkoutsService,
      private workoutSubscriptionService: WorkoutSubscriptionServiceService,
      private currentUserService: CurrentUserService) {
      this.currentUser = this.currentUserService.getCurrentUser()
       this.workoutsSubsbscription = this.getUserWorkouts.createUserWorkoutsList(this.currentUser.uid)
        .subscribe(workouts=>{
           this.workouts=workouts
           console.log(this.workouts)
          })
     } 
    
  ngOnInit() {
  }

  ngOnDestroy(){
    this.workoutsSubsbscription.unsubscribe()
  }

  deleteWorkout(workoutId){
    this.removeWorkoutsService.deleteWorkout(workoutId)
  }

}
