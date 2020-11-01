import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ExerciseModel} from '../models/exercise.model';
import { WorkoutModel } from '../models/workout.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppUser } from '../models/appUser.model';
import { CurrentUserService } from '../services/current-user.service';
import { CreateWorkoutService } from '../services/create-workout.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GetUserWorkoutsService } from '../services/get-user-workouts.service';
import { GenerateWorkoutJsonService } from '../services/generate-workout-json.service';
import { Subscription } from 'rxjs';
import { CreateSuperSetComponent } from '../create-super-set/create-super-set.component';
import { slideAdd } from '../animations/animations';
import { slide } from '../animations/animations';
import { RemoveWorkoutsService } from '../services/remove-workouts.service';
import { GetCategoriesService } from '../services/get-categories.service';

@Component({
  selector: 'create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.css'],
  animations: [
    slide,
    slideAdd
  ]
})
export class CreateWorkoutComponent implements OnInit, OnDestroy {

  unitsArray = ['lbs', 'kg', 'bw','km', 'miles'];
  showExercises = true;
  exerciseList: ExerciseModel[] = [];
  currentUser: AppUser;
  workoutId;
  workout: WorkoutModel  
  getUserWorkouts: any;
  workoutSubscription: Subscription;
  tempSuperSetList = [];
  categories = []
  categoriesSubscription: Subscription;
  newCategory = false;

  @ViewChild(CreateSuperSetComponent, {static: false})
  private superSetComponent: CreateSuperSetComponent;

  constructor(
    private currentUserService:CurrentUserService, 
    private db:AngularFirestore, 
    private createWorkoutService: CreateWorkoutService,
    private getUserWorkoutsService: GetUserWorkoutsService,
    private router: Router,
    private route: ActivatedRoute,
    private generateWorkoutJSON: GenerateWorkoutJsonService,
    private removeWorkoutsService: RemoveWorkoutsService,
    private getCategoriesService: GetCategoriesService,
    ){ 
  }
  
  ngOnInit() {
    this.categoriesSubscription = this.getCategoriesService.getCategories().subscribe(c => this.categories=c)
    this.currentUser = this.currentUserService.getCurrentUser();
    this.workoutId = this.route.snapshot.paramMap.get('id')
    this.workout = new WorkoutModel(this.exerciseList); 
    
    this.workoutSubscription = this.getUserWorkoutsService.createUserWorkoutsList(this.currentUser.uid).subscribe(workouts=>{
      let searchedWorkout = workouts.filter(w=>w.id == this.workoutId)[0]
      if (searchedWorkout) this.workout = searchedWorkout
    }) 
  }
  ngOnDestroy(){
    this.workoutSubscription.unsubscribe();
    this.categoriesSubscription.unsubscribe();
  }

  submitWorkout(){
    let category = {name: this.workout.category}
    let foundCategory = this.categories.filter(c=>c.name == category.name)
    if (foundCategory.length==0) {
      this.getCategoriesService.addCategory(this.workout.category);
    }
    if (!this.workoutId) {
      this.workout.id = this.db.createId()
      this.workout.updateSuperSetOrder()
      let workoutJSON = this.generateWorkoutJSON.generateWorkoutJSON(this.workout)
      console.log(workoutJSON)
      this.createWorkoutService.submitWorkout(workoutJSON)
    }
    else {
      this.workout.id = this.workoutId;
      this.workout.updateSuperSetOrder();
      let workoutJSON = this.generateWorkoutJSON.generateWorkoutJSON(this.workout);
      console.log(workoutJSON)
      this.createWorkoutService.updateWorkout(workoutJSON)
    }
      this.router.navigate(['/user-workouts'])
      return false
  }
  deleteWorkout(){
    if (!confirm("Delete workout? Are you sure?")) return;
    this.removeWorkoutsService.deleteWorkout(this.workoutId);
    this.removeWorkoutsService.deleteAllWorkout(this.workoutId)
    this.router.navigate(['/user-workouts'])
  }

}
