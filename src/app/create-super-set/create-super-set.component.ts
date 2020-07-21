import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef, Output, EventEmitter } from '@angular/core';
import { ExerciseModel} from '../models/exercise.model';
import { WorkoutModel } from '../models/workout.model';
import { SuperSetModel } from '../models/superset.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { CreateWorkoutService } from '../services/create-workout.service';
import { ActivatedRoute } from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RemoveWorkoutsService } from '../services/remove-workouts.service';


@Component({
  selector: 'create-super-set',
  templateUrl: './create-super-set.component.html',
  styleUrls: ['./create-super-set.component.css'],
  animations: [
    trigger('expandCollapsed',[
      transition(':enter', [
        style({ height: 0}),
        animate('200ms ease-out'),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(-100%)'}))
      ])
    ]),
    trigger('selectExercise',[
      transition(':enter',[
        style({transform: 'translateX(-100%)', backgroundColor: '#f2f2f2'}),
        animate('200ms ease-out', style({  }))
      ]),
      transition(':leave',[
        animate('200ms ease-in', style({ transform: 'translateX(-100%)', backgroundColor:'#f2f2f2'  }))
      ])
    ])
  ]
})

export class CreateSuperSetComponent implements OnInit {
  editRounds=false;
  editTime=false;
  isHovered = false;
  addSuperSet=false;
  exerciseList: ExerciseModel[] = [];
  tempSuperSetList=[];
  emptyList = []
  rounds = 1;
  name=''
  time = {
    hours: 0,
    minutes: 0,
    seconds: 0
  }
  id='';
  notes = [];
  noteMessage="";
  superSet = new SuperSetModel(this.emptyList,this.rounds, this.id, this.name, this.time, this.notes);

  @ViewChildren("superSetCheckBox") superSetCheckBox: QueryList<ElementRef>
  @Input() workout;

  constructor(private db: AngularFirestore, private createWorkoutService: CreateWorkoutService,private route: ActivatedRoute, private removeWorkoutsService: RemoveWorkoutsService) {

   }

   ngOnInit() {
  }
  
  createSuperSet(f){
   
    this.superSet.exerciseList = this.tempSuperSetList;
    this.superSet.id = this.db.createId()
    
    this.tempSuperSetList = []
    
    this.workout.addSuperSet(this.superSet);

    this.time = {
      hours: 0,
      minutes: 0,
      seconds: 0
    }
    this.superSet = new SuperSetModel(this.emptyList, 1,'','',this.time)

    this.clearCheckBox()
    this.addSuperSet=false;
  }
  removeSuperSet(setIndex,supersetId){
    this.workout.removeSuperSet(setIndex);
    let workoutId = this.workout.id;
    if (this.route.snapshot.paramMap.get('id')) this.removeWorkoutsService.deleteSuperset(workoutId,supersetId);
  }
  addExerciseToSet(index){
    this.workout.addExToSuperSet(index,this.tempSuperSetList[0])
    this.tempSuperSetList = []
  }
   removeExerciseFromSet(superset:SuperSetModel,ex:ExerciseModel,index){
     superset.deleteExFromSet(ex);
     if (superset.exerciseList.length==0) this.removeSuperSet(index,superset.id)
}
  onCheckBoxChange(event){
    let exercise: ExerciseModel[];
    if (event.target.checked){
        exercise = this.workout.exerciseList.filter(e =>e.name==event.target.value);
        this.tempSuperSetList.push(exercise[0]);
    } else {
        this.tempSuperSetList = this.tempSuperSetList.filter(e => e.name!=event.target.value)
    }

  }
  clearCheckBox(){
    this.superSetCheckBox.forEach(element=>{
      element.nativeElement.checked = false
    })
  }
  setRounds(superset, rounds){
    superset.rounds = rounds
  }

  addNote(superset: SuperSetModel,note:string){
    note.replace('/','')
    superset.addNote(note);
    console.log(superset.notes)
    this.noteMessage = '';
  }

  removeNote(superset: SuperSetModel,index){
    superset.removeNote(index)
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
  dragDelete(event: CdkDragDrop<any[]>){
    if (event.previousContainer === event.container){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
       event.previousContainer.data.splice(event.previousIndex,1)
    }
  }
  selectExercise(ex){
    this.tempSuperSetList.push(ex)
  }
  removeExercise(ex,index){
    this.tempSuperSetList.splice(index,1)
  }
}

