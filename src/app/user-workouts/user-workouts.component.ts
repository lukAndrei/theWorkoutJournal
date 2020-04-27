import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetUserWorkoutsService } from '../services/get-user-workouts.service';
import { WorkoutModel } from '../models/workout.model';
import { flatMap, switchMap, mergeMap, map, mergeAll, tap, toArray, concatMap, take } from 'rxjs/operators';
import { Observable, Subscription, from, forkJoin, combineLatest, of, concat } from 'rxjs';


@Component({
  selector: 'app-user-workouts',
  templateUrl: './user-workouts.component.html',
  styleUrls: ['./user-workouts.component.css']
})
export class UserWorkoutsComponent implements OnInit, OnDestroy {
  workoutsList: WorkoutModel[] = [];
  workoutsSubscription: Subscription;
  exerciseSubscription: Subscription;
  superSetSubscription: Subscription;
  workout: WorkoutModel
  constructor(private getUserWorkouts: GetUserWorkoutsService) { 

      this.getUserWorkouts.getWorkouts()
      .pipe(
        switchMap(wList=>{
          this.workoutsList=wList
          return from(this.workoutsList)}
          ),
        mergeMap(workout=>{
          return this.getUserWorkouts.getWorkoutExercises(workout.id).pipe(switchMap(exList=>{
            workout.exerciseList = exList
            return of(workout)
          }))
        }),
        mergeMap(workout=>{
          return this.getUserWorkouts.getWorkoutSuperSets(workout.id).pipe(switchMap(setList=>{
            workout.superSet = setList
            return of(workout)
          }))
        })
      )
      .pipe(take(1))
    .subscribe(res=>{
        console.log(this.workoutsList)
      })
     }
    
  ngOnInit() {

  }
  ngOnDestroy(){
  }

}
