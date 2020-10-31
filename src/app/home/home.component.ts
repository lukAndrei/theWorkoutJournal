import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkoutModel } from '../models/workout.model';
import {  map, switchMap, flatMap } from 'rxjs/operators';
import { Subscription, from } from 'rxjs';
import { GetUserWorkoutsService } from '../services/get-user-workouts.service';
import { CommentsServiceService } from '../services/comments-service.service';
import { CurrentUserService } from '../services/current-user.service';
import { AppUser } from '../models/appUser.model';
import { WorkoutSubscriptionServiceService } from '../services/workout-subscription-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  showWorkout = false;
  workouts: WorkoutModel[] = [];
  workoutsSubsbscription: Subscription;
  currentUser: AppUser;
  constructor(private getUserWorkouts: GetUserWorkoutsService, private commentsService: CommentsServiceService, 
    private getCurrentUserService: CurrentUserService,
    private workoutSubscriptionService: WorkoutSubscriptionServiceService
    ) {}

  ngOnInit() {
    this.workoutsSubsbscription = this.getUserWorkouts.createAllWorkoutsList()
      .subscribe(workouts=>{
        this.workouts=workouts
      })
  }
  ngOnDestroy(){
    this.workoutsSubsbscription.unsubscribe()
  }

}
