import { Component, OnInit, Input } from '@angular/core';
import { WorkoutModel } from '../models/workout.model';

@Component({
  selector: 'set-time-modal',
  templateUrl: './set-time-modal.component.html',
  styleUrls: ['./set-time-modal.component.css']
})
export class SetTimeModalComponent implements OnInit {
  @Input('workout') workout: WorkoutModel

  constructor() { }

  ngOnInit() {
  }

}
