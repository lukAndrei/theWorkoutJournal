import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef, Output, EventEmitter } from '@angular/core';
import { ExerciseModel} from '../models/exercise.model';
import { SuperSetModel } from '../models/superset.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { CreateWorkoutService } from '../services/create-workout.service';
import { ActivatedRoute } from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RemoveWorkoutsService } from '../services/remove-workouts.service';
declare var $: any;


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
  orderNumber = 0;
  superSet = new SuperSetModel(this.emptyList,this.rounds, this.id, this.name, this.time, this.notes, this.orderNumber);

  @Input() workout;

  constructor(private db: AngularFirestore, 
    private createWorkoutService: CreateWorkoutService,
    private route: ActivatedRoute, 
    private removeWorkoutsService: RemoveWorkoutsService) {
   }

   ngOnInit() {}
  
  createSuperSet(){
    this.superSet.exerciseList = this.tempSuperSetList;
    this.superSet.id = this.db.createId()
    this.tempSuperSetList = []
    this.workout.addSuperSet(this.superSet);
    this.time = {
      hours: 0,
      minutes: 0,
      seconds: 0
    }
    this.orderNumber = 0
    this.notes = [];
    this.superSet = new SuperSetModel(this.emptyList, 1,'','',this.time,this.notes, this.orderNumber)
    this.addSuperSet=false;
    
  }
  removeSuperSet(setIndex,supersetId){
    this.workout.removeSuperSet(setIndex);
  }
  addExerciseToSet(index){
    this.workout.addExToSuperSet(index,this.tempSuperSetList[0])
    this.tempSuperSetList = []
  }
   removeExerciseFromSet(superset:SuperSetModel,ex:ExerciseModel,index){
     superset.deleteExFromSet(ex);
     if (superset.exerciseList.length==0) this.removeSuperSet(index,superset.id)
}
  setRounds(superset, rounds){
    superset.rounds = rounds
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
  removeExercise(index){
    this.tempSuperSetList.splice(index,1)
  }
}

