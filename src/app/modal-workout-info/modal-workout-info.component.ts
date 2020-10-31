import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GetCategoriesService } from '../services/get-categories.service';
import { Subscription } from 'rxjs';
import { WorkoutModel } from '../models/workout.model';
declare var $: any;


@Component({
  selector: 'modal-workout-info',
  templateUrl: './modal-workout-info.component.html',
  styleUrls: ['./modal-workout-info.component.css']
})
export class ModalWorkoutInfoComponent implements OnInit {
  categories;
  categoriesSubscription: Subscription;
  newCategory = false;
  @Input('workout') workout: WorkoutModel
  constructor(  private getCategoriesService: GetCategoriesService
    ) {
      this.categoriesSubscription = this.getCategoriesService.getCategories().subscribe(c => this.categories=c)
     }


  @ViewChild('customCategory', {static:false}) customCategory;
  ngOnInit() {
  }
  onSelectCategory(value){
    if (value == 'addCategory') this.newCategory = true;
    else this.newCategory = false;
  }
  setDate(evt){
    this.workout.timestamp = new Date(evt.year, evt.month-1, evt.day)
  }
  setWorkoutInfo(f){
    $("#workoutModal").modal("toggle");
  }
  addCategory(value){
    this.workout.category = value
  }

}
