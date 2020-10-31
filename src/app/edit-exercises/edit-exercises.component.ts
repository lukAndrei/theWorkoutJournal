import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, DoCheck, ChangeDetectionStrategy, AfterContentChecked, IterableDiffer, IterableDiffers } from '@angular/core';
import { WorkoutModel } from '../models/workout.model';
import { ExerciseModel } from '../models/exercise.model';
import { trigger, transition, style, animate } from '@angular/animations';
declare var $: any;

@Component({
  selector: 'edit-exercises',
  templateUrl: './edit-exercises.component.html',
  styleUrls: ['./edit-exercises.component.css'],
  animations: [
    trigger('expandCollapsed',[
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms ease-out'),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(100%)'}))
      ])
    ]),
  ]
})
export class EditExercisesComponent implements OnInit {
  
  delIndex;
  exercise: ExerciseModel;
  selectedExercise: ExerciseModel;
  previousLength;
  iterableDiffer:IterableDiffer<ExerciseModel>

  @Input() workout: WorkoutModel;
  constructor(private iterableDiffers: IterableDiffers) {
    this.iterableDiffer = this.iterableDiffers.find([]).create(null);
  
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
  }

  ngDoCheck(){
  }

 changeExercise(exercise,k){
   this.exercise = exercise;
   this.delIndex = k
 }
 removeExercise(){
  this.workout.removeExById(this.exercise.id);
  this.workout.removeExFromAll(this.exercise);
  $("#editExerciseModal").modal("toggle");
}
dismissModal(){
  if (this.exercise.name == "") {
    let index = (this.workout.exerciseList.indexOf(this.exercise)+1).toString()
    let name = 'exercise ' + index
    this.exercise.name = name
  }
    $("#editExerciseModal").modal("toggle");
}
 

}
