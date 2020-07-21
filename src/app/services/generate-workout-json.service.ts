import { Injectable } from '@angular/core';
import { WorkoutModel } from '../models/workout.model';


@Injectable({
  providedIn: 'root'
})
export class GenerateWorkoutJsonService {

  constructor() { }

  generateWorkoutJSON(workout: WorkoutModel){

    let setList=[];
    let workoutInfo = {
      name: workout.name || '',
      id: workout.id,
      date: workout.timestamp,
      category: workout.category
    }

    workout.superSetList.forEach(set=>{
      let superSetData = {
        name: set.name,
        rounds: set.rounds,
        exercises: [],
        id: set.id,
        time: {
          hours: set.time.hours,
          minutes: set.time.minutes,
          seconds: set.time.seconds
        },
        notes: set.notes
      }
      set.exerciseList.forEach(ex=>{
        let exModel = {
          exName: ex.name,
          set: ex.sets || 1,
          totalReps: ex.totalReps,
          totalSets: ex.totalSets,
          id:ex.id,
          distance: ex.distance || null,
          units: ex.units,
          time: ex.time
        }
        superSetData.exercises.push(exModel)
      })
      setList.push(superSetData)
    })

    return {
      workoutInfo: workoutInfo,
      setList: setList
    }
  }
}
