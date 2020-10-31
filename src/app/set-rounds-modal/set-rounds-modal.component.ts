import { Component, OnInit, Input } from '@angular/core';
import { SuperSetModel } from '../models/superset.model';
import { WorkoutModel } from '../models/workout.model';

@Component({
  selector: 'set-rounds-modal',
  templateUrl: './set-rounds-modal.component.html',
  styleUrls: ['./set-rounds-modal.component.css']
})
export class SetRoundsModalComponent implements OnInit {
  @Input('superset') superset:SuperSetModel
  constructor() { }
  @Input('workout') workout:WorkoutModel
  ngOnInit() {
  }
  setRounds(superset, rounds){
    superset.rounds = rounds
  }

}
