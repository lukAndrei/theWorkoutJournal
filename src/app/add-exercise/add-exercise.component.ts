import { Component, OnInit, Input } from '@angular/core';
import { ExerciseModel} from '../models/exercise.model';
import { WorkoutModel } from '../models/workout.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit {
  addNewExercise=false;
  exerciseList: ExerciseModel[] = [];
  exName=""
  set  = [{
      reps: 1,
      weight: 0
    }];

  exercise = new ExerciseModel(this.set, this.exName=name);
  @Input() workout = new WorkoutModel(this.exerciseList);

  constructor(private db: AngularFirestore, authService: AuthServiceService) { 
  }

  ngOnInit() {
  }
  addExercise(form){
    
    this.exercise.setName(form.exercise);
    this.exercise.getAllReps();
    this.exercise.id = this.db.createId();
    this.workout.addEx(this.exercise);
    let newSet = [{
      reps: 1,
      weight: 0
    }];
    this.exercise = new ExerciseModel(newSet);
    this.addNewExercise=false
  }
  addSet(){
     this.exercise.addSet()
  }

  removeSet(){
   this.exercise.removeSet()  
  }

  setReps(i,reps){
    reps = Number(reps)
    this.exercise.setReps(i,reps)
  }

  setWeight(i,weight:number){
    weight = Number(weight)
    this.exercise.setWeight(i,weight)
  }

}
