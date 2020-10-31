import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { SuperSetModel } from '../models/superset.model';
import { ExerciseModel } from '../models/exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { CreateWorkoutService } from '../services/create-workout.service';
import { ActivatedRoute } from '@angular/router';
import { RemoveWorkoutsService } from '../services/remove-workouts.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';
import { WorkoutModel } from '../models/workout.model';

declare var $: any;

@Component({
  selector: 'design-workout',
  templateUrl: './design-workout.component.html',
  styleUrls: ['./design-workout.component.css'],
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
export class DesignWorkoutComponent implements OnInit {

  selectedExercise: ExerciseModel;
  @Input() workout: WorkoutModel;

  constructor(private db: AngularFirestore, 
    private createWorkoutService: CreateWorkoutService,
    private route: ActivatedRoute, 
    private removeWorkoutsService: RemoveWorkoutsService) { }

  ngOnInit() {
  }
  dropSuperset(event: CdkDragDrop<any[]>) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.workout.updateSuperSetOrder();   
  }
  dropExercise(event: CdkDragDrop<any[]>, superset: SuperSetModel) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    superset.updateExerciseOrder();
}
  removeSuperSet(setIndex,supersetId){
    this.workout.removeSuperSet(setIndex);
    if (this.route.snapshot.paramMap.get('id')) this.removeWorkoutsService.addSupersetToDelete(supersetId);
  }

  removeExerciseFromSet(superset:SuperSetModel,ex:ExerciseModel,index){
    superset.deleteExFromSet(ex);
    if (superset.exerciseList.length==0) this.removeSuperSet(index,superset.id)
  }
 
  selectExercise(ex:ExerciseModel){
    this.selectedExercise = ex
  }
  dismissModal(){
    if (this.selectedExercise.name == "") {
      let index = (this.workout.exerciseList.indexOf(this.selectedExercise)+1).toString()
      let name = 'exercise ' + index
      this.selectedExercise.name = name
    }
    $("#editSuperSetExerciseModal").modal("toggle");
  }


}
