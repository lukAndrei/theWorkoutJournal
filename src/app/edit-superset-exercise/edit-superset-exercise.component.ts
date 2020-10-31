import { Component, OnInit, Input } from '@angular/core';
import { WorkoutModel } from '../models/workout.model';
import { ExerciseModel } from '../models/exercise.model';
import { SuperSetModel } from '../models/superset.model';
import { RemoveWorkoutsService } from '../services/remove-workouts.service';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'edit-superset-exercise',
  templateUrl: './edit-superset-exercise.component.html',
  styleUrls: ['./edit-superset-exercise.component.css']
})
export class EditSupersetExerciseComponent implements OnInit {
  unitsArray = ['lbs', 'kg', 'bw','km', 'miles']

  @Input('workout') workout: WorkoutModel;
  @Input('exercise') exercise:ExerciseModel;
  @Input('superset') superset: SuperSetModel;
  constructor(private removeWorkoutsService: RemoveWorkoutsService,
    private route: ActivatedRoute
    ) { }

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
  removeExerciseFromSet(ex:ExerciseModel){
    this.superset.deleteExFromSet(ex);
    let index = this.workout.superSetList.indexOf(this.superset)
    if (this.superset.exerciseList.length==0) this.removeSuperSet(index,this.superset.id)
    $("#editSuperSetExerciseModal").modal("toggle");
  }

  removeSuperSet(setIndex,supersetId){
    this.workout.removeSuperSet(setIndex);
    let workoutId = this.workout.id;
    // if (this.route.snapshot.paramMap.get('id')) this.removeWorkoutsService.deleteSuperset(workoutId,supersetId);
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
