import { Component, OnInit, Input } from '@angular/core';
import { ExerciseModel } from '../models/exercise.model';
import { WorkoutModel } from '../models/workout.model';
declare var $: any;

@Component({
  selector: 'edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.css']
})
export class EditExerciseComponent implements OnInit {

  unitsArray = ['lbs', 'kg', 'bw','km', 'miles']
  delIndex;
  @Input('workout') workout: WorkoutModel;
  @Input('exercise') exercise:ExerciseModel;
  constructor() { }

  ngOnInit() {
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
  setHours(hours){
    hours = Number(hours)
    this.exercise.setHours(hours)

  }
  setMinutes(minutes){
    minutes = Number(minutes)
    this.exercise.setMinutes(minutes)
  }
  setSeconds(seconds){
    seconds = Number(seconds)
    this.exercise.setSeconds(seconds)
  }
}
