import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ExerciseModel} from '../models/exercise.model';
import { WorkoutModel } from '../models/workout.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthServiceService } from '../services/auth-service.service';
declare var $: any;

@Component({
  selector: 'add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit {
  unitsArray = ['lbs', 'kg', 'bw','km', 'miles']
  addNewExercise=false;
  exName="";
  set  = [{
    reps: 1,
    weight: 0,
  }];
  units="kg";
  deleteIndex;
  time = {
    hours: 0,
    minutes: 0,
    seconds: 0
  }
  id="";
  distance = 0;
  modal;
  orderNumber = 0
  exercise: ExerciseModel;
  @Input() workout: WorkoutModel 

  constructor(private db: AngularFirestore, authService: AuthServiceService) { 
    this.exercise = new ExerciseModel(this.set,this.exName,this.units,this.id,this.distance, this.orderNumber, this.time);
  }

  ngOnInit() {
  }
  ngAfterViewInit(){
  }
  addExercise(f){
    this.exercise.id = this.db.createId();
    this.workout.addEx(this.exercise);
    let newSet = [{
      reps: 1,
      weight: 0,
    }];
    this.orderNumber = 0;``
    f.reset();
    this.exercise = new ExerciseModel(newSet,this.exName,this.units,this.id,this.distance,this.orderNumber,this.time);
    $("#addExerciseModal").modal("toggle");
  }

  dismissModal(){
    $("#addExerciseModal").modal("toggle");
  }


}
