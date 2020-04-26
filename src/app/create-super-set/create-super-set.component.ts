import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef, Output, EventEmitter } from '@angular/core';
import { ExerciseModel} from '../models/exercise.model';
import { WorkoutModel } from '../models/workout.model';

@Component({
  selector: 'create-super-set',
  templateUrl: './create-super-set.component.html',
  styleUrls: ['./create-super-set.component.css']
})
export class CreateSuperSetComponent implements OnInit {
  addSuperSet=false;
  exerciseList: ExerciseModel[] = [];
  superSet=[];
  @ViewChildren("superSetCheckBox") superSetCheckBox: QueryList<ElementRef>
  @Input() workout = new WorkoutModel(this.exerciseList);
  constructor() { }

   ngOnInit() {
  }
  
  createSuperSet(f){
    let noOfTimes = f.noOfTimes || 1
    this.workout.addSuperSet(this.superSet,noOfTimes);
    this.superSet=[];
    this.clearCheckBox()
    this.addSuperSet=false;
  }
  removeSuperSet(s){
    this.workout.removeSuperSet(s)
  }
  addExerciseToSet(index){
    if (this.superSet.length>0){
       this.workout.addExToSuperSet(index,this.superSet[0])
    }
  }
   removeExerciseFromSet(index){
    if (this.superSet.length>0){
      this.workout.removeExFromSuperSet(index,this.superSet[0].name)
    }
}
  onCheckBoxChange(event){
    let exercise: ExerciseModel[];
    if (event.target.checked){
        exercise = this.workout.exerciseList.filter(e =>e.name==event.target.value)
        this.superSet.push(exercise[0])
    } else {
        this.superSet = this.superSet.filter(e => e.name!=event.target.value)
    }
  }
  clearCheckBox(){
    this.superSetCheckBox.forEach(element=>{
      element.nativeElement.checked = false
    })
  }
}
