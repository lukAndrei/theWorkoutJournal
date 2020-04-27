import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef, Output, EventEmitter } from '@angular/core';
import { ExerciseModel} from '../models/exercise.model';
import { WorkoutModel } from '../models/workout.model';
import { SuperSetModel } from '../models/superset.model';

@Component({
  selector: 'create-super-set',
  templateUrl: './create-super-set.component.html',
  styleUrls: ['./create-super-set.component.css']
})
export class CreateSuperSetComponent implements OnInit {
  addSuperSet=false;
  exerciseList: ExerciseModel[] = [];
  tempSuperSetList=[];
  emtpyList = []
  rounds = 1;
  superSet = new SuperSetModel(this.emtpyList,this.rounds)
  @ViewChildren("superSetCheckBox") superSetCheckBox: QueryList<ElementRef>
  @Input() workout = new WorkoutModel(this.exerciseList);
  constructor() { }

   ngOnInit() {
  }
  
  createSuperSet(f){

    this.superSet.rounds = f.noOfTimes || 1
    this.superSet.exerciseList = this.tempSuperSetList;

    this.tempSuperSetList = []
    
    this.workout.addSuperSet(this.superSet);
    this.superSet = new SuperSetModel(this.emtpyList,1);

    this.clearCheckBox()
    this.addSuperSet=false;
  }
  removeSuperSet(s){
    this.workout.removeSuperSet(s)
  }
  addExerciseToSet(index){
    if (this.superSet.exerciseList.length>0){
       this.workout.addExToSuperSet(index,this.tempSuperSetList[0])
    }
  }
   removeExerciseFromSet(index){
    if (this.superSet.exerciseList.length>0){
      this.workout.removeExFromSuperSet(index,this.tempSuperSetList[0].name)
    }
}
  onCheckBoxChange(event){
    let exercise: ExerciseModel[];
    if (event.target.checked){
        exercise = this.workout.exerciseList.filter(e =>e.name==event.target.value)
        this.tempSuperSetList.push(exercise[0])
    } else {
        this.tempSuperSetList = this.tempSuperSetList.filter(e => e.name!=event.target.value)
    }
  }
  clearCheckBox(){
    this.superSetCheckBox.forEach(element=>{
      element.nativeElement.checked = false
    })
  }
}
