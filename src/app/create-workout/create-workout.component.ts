import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ExerciseModel} from '../models/exercise.model';
import { WorkoutModel } from '../models/workout.model';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AppUser } from '../models/appUser.model';
import { CurrentUserService } from '../services/current-user.service';
import { CreateWorkoutService } from '../services/create-workout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.css']
})
export class CreateWorkoutComponent implements OnInit {
  addSuperSet=false;
  exerciseList: ExerciseModel[] = [];
  currentUser: AppUser;

  @ViewChildren("superSetCheckBox") superSetCheckBox: QueryList<ElementRef>
  @Input() workout = new WorkoutModel(this.exerciseList);
  
  constructor(
    private currentUserService:CurrentUserService, 
    private db:AngularFirestore, 
    private createWorkoutService: CreateWorkoutService,
    private router: Router
    ) { 
    this.currentUser = this.currentUserService.getCurrentUser();
  }
  
  ngOnInit() {
  }

  removeExercise(index,ex){
    this.workout.removeEx(index)
    this.workout.removeExFromAll(ex.name)
  }

  submitEx(f){ 
     this.createWorkoutService.submitEx(f,this.workout)
     this.router.navigate(['/user-workouts'])
  }
}
