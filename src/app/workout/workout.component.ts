import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { WorkoutModel } from '../models/workout.model';
import { ActivatedRoute } from '@angular/router';
import { GetUserWorkoutsService } from '../services/get-user-workouts.service';
import { Subscription, of } from 'rxjs';
import { CurrentUserService } from '../services/current-user.service';
import { AppUser } from '../models/appUser.model';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { flatMap, map } from 'rxjs/operators';
import { CommentsServiceService } from '../services/comments-service.service';
import { WorkoutComment } from '../models/comment.model';
import { WorkoutSubscriptionServiceService } from '../services/workout-subscription-service.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit, OnDestroy {
  currentUser: AppUser;
  workoutId;
  workoutSubscription: Subscription
  emptyExerciseList=[];
  comments = []
  workout = new WorkoutModel(this.emptyExerciseList)
  showComments = true;

  constructor(private route:ActivatedRoute, private getUserWorkouts: GetUserWorkoutsService, 
    private currentUserService: CurrentUserService, 
    private getUserWorkoutsService: GetUserWorkoutsService,
    private commentsService: CommentsServiceService,
    private workoutSubscriptionService: WorkoutSubscriptionServiceService)
    { 
    this.currentUser = this.currentUserService.getCurrentUser()
    this.workoutId = this.route.snapshot.paramMap.get('id');

    this.workoutSubscription = this.getUserWorkoutsService.createAllWorkoutsList()
      .subscribe(workouts=>{
        this.workout = workouts.filter(w=>w.id==this.workoutId)[0];
      })

      this.commentsService.getComments(this.workoutId).subscribe(comments => {
        this.comments = comments
        this.comments.map(comment=>{
          comment.timestamp = comment.timestamp.toDate();
          comment.replies.map(reply=>{
            reply.timestamp = reply.timestamp.toDate()
          })
        })
      })
  }

  ngOnInit() {
  }
  ngOnDestroy(){
    this.workoutSubscription.unsubscribe()
  }
  addComment(workout: WorkoutModel,comment: string){
    let newComment: WorkoutComment = {
      comment: comment,
      user: this.currentUser,
      id: '',
      timestamp:  new Date,
      replies: []
    }
    this.commentsService.addComment(this.workout.id, newComment)
  }
  replyToComment(workout:WorkoutModel, comment:WorkoutComment, replyComment){
    let reply = {
      comment: replyComment,
      user: this.currentUser,
      id: '',
      timestamp: new Date,
      replies: []
    }
    comment.replies.push(reply)
    this.commentsService.replyComment(workout.id,comment)
  }
  removeComment(workout: WorkoutModel,index){
    this.commentsService.removeComment(this.currentUser, workout)
  }

}
