import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutModel } from '../models/workout.model';
import { RemoveWorkoutsService } from '../services/remove-workouts.service';

@Component({
  selector: 'delete-workout-conirmation',
  templateUrl: './delete-workout-conirmation.component.html',
  styleUrls: ['./delete-workout-conirmation.component.css']
})
export class DeleteWorkoutConirmationComponent implements OnInit {
  @Input('workout.id') workoutId;
  constructor(private removeWorkoutsService: RemoveWorkoutsService,
    private router: Router) { }

  ngOnInit() {
  }
  deleteWorkout(){
    this.removeWorkoutsService.deleteWorkout(this.workoutId);
    this.removeWorkoutsService.deleteAllWorkout(this.workoutId)
    this.router.navigate(['/user-workouts'])
  }


}
