import { Component, OnInit } from '@angular/core';
import { WorkoutModel } from '../models/workout.model';
import { FlaskWorkoutsServiceService } from '../services/flask-workouts-service.service';

@Component({
  selector: 'get-flask-workouts',
  templateUrl: './get-flask-workouts.component.html',
  styleUrls: ['./get-flask-workouts.component.css']
})
export class GetFlaskWorkoutsComponent implements OnInit {
  workout
  constructor(private serviceHttp: FlaskWorkoutsServiceService) { }

  ngOnInit() {
    this.serviceHttp.getWorkout()
      .subscribe(response=>{
        this.workout = response
        console.log(response)
      })
  }

}
