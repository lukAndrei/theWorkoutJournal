import { Injectable } from '@angular/core';
import { WorkoutModel } from '../models/workout.model';
import { ExerciseModel } from '../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class EditExerciseDataService {
  exercise: ExerciseModel
  constructor() {
   }

  getExercise(exercise: ExerciseModel){
    this.exercise = exercise
  }
  setExercise() {
    return this.exercise
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

