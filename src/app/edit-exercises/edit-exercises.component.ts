import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, DoCheck, ChangeDetectionStrategy, AfterContentChecked, IterableDiffer, IterableDiffers } from '@angular/core';
import { WorkoutModel } from '../models/workout.model';
import { ExerciseModel } from '../models/exercise.model';
import { ThrowStmt } from '@angular/compiler';
import { trigger, transition, style, animate } from '@angular/animations';

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
  unitsArray = ['lbs', 'kg', 'bw','km', 'miles']
  addNewExercise=false;
  exName="";
  sets  =  [{
    reps: 1,
    weight: 0,
  }];
  units="";
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
    this.previousLength = this.workout.exerciseList.length;
    this.exercise = this.workout[this.previousLength-1];
    this.delIndex = this.previousLength-1;
  }

  ngDoCheck(){
      let changes = this.iterableDiffer.diff(this.workout.exerciseList)
      if (changes) {
        let currentLength = this.workout.exerciseList.length
        if (currentLength>this.previousLength){
          this.exercise = this.selectedExercise = this.workout.exerciseList[this.workout.exerciseList.length-1];
        }
        this.previousLength = currentLength
      }
  }

  addSet(){
    this.exercise.addSet()
 }

 removeSet(){
  this.exercise.removeSet()  
 }
 setName(name){
   this.exercise.name = name
 }
 setReps(i,reps){
   reps = Number(reps)
   this.exercise.setReps(i,reps)
 }
 setWeight(i,weight:number){
   weight = Number(weight)
   this.exercise.setWeight(i,weight)
 }
 setUnits(units:string){
   this.exercise.setUnits(units)
 }
 setDistance(distance){
   distance = Number(distance)
   this.exercise.setDistance(distance)
 }
 changeExercise(exercise,k){
   if (this.exercise == exercise) this.exercise = null
   else this.exercise = exercise;
   this.delIndex = k
   this.selectedExercise = this.exercise
   
 }
 removeExercise(){
  console.log(this.delIndex)
  this.workout.removeEx(this.delIndex)
  this.workout.removeExFromAll(this.exercise)
  if (this.workout.exerciseList.length==0) this.exercise=null
  else {
    this.exercise = this.workout.exerciseList[0]
    this.selectedExercise = this.workout.exerciseList[0]}
}


}
