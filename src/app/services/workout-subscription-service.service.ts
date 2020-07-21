import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetUserWorkoutsService } from './get-user-workouts.service';
import { CurrentUserService } from './current-user.service';
import { switchMap, flatMap, map } from 'rxjs/operators';
import { WorkoutModel } from '../models/workout.model';
import { Subscription, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutSubscriptionServiceService {
  
  constructor() {}
}
