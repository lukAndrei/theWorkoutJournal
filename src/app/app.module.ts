import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from './services/auth-service.service';
import { RegisterServiceService } from './services/register-service.service';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';
import { CreateSuperSetComponent } from './create-super-set/create-super-set.component';
import { UserWorkoutsComponent } from './user-workouts/user-workouts.component';
import { WorkoutComponent } from './workout/workout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { NgFlashMessagesModule } from 'ng-flash-messages';

import { EditExercisesComponent } from './edit-exercises/edit-exercises.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SupersetNotesComponent } from './superset-notes/superset-notes.component';
import { DesignWorkoutComponent } from './design-workout/design-workout.component';
import { EditExerciseComponent } from './edit-exercise/edit-exercise.component';
import { EditSupersetExerciseComponent } from './edit-superset-exercise/edit-superset-exercise.component';
import { ModalWorkoutInfoComponent } from './modal-workout-info/modal-workout-info.component';
import { SetTimeModalComponent } from './set-time-modal/set-time-modal.component';
import { SetRoundsModalComponent } from './set-rounds-modal/set-rounds-modal.component';
import { SetNotesModalComponent } from './set-notes-modal/set-notes-modal.component';
import { GetFlaskWorkoutsComponent } from './get-flask-workouts/get-flask-workouts.component';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordComponent } from './reset-password/reset-password.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    CreateAccountComponent,
    HomeComponent,
    LogoutComponent,
    CreateWorkoutComponent,
    AddExerciseComponent,
    CreateSuperSetComponent,
    UserWorkoutsComponent,
    WorkoutComponent,
    EditExercisesComponent,
    SupersetNotesComponent,
    DesignWorkoutComponent,
    EditExerciseComponent,
    EditSupersetExerciseComponent,
    ModalWorkoutInfoComponent,
    SetTimeModalComponent,
    SetRoundsModalComponent,
    SetNotesModalComponent,
    GetFlaskWorkoutsComponent,
    ResetPasswordComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NotifierModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgbModule,
    DragDropModule,
    MatExpansionModule,
    MatDialogModule,
    HttpClientModule,
    NgFlashMessagesModule.forRoot(),

    RouterModule.forRoot([
      {path:'', component: HomeComponent},

      {path:'home', component: HomeComponent},
      
      {path:'login', component: LoginComponent},

      {path:'reset-password', component: ResetPasswordComponent,                                        },

      
      {path:'create-account', component: CreateAccountComponent },

      {path:'create-workout/:id', component: CreateWorkoutComponent,    canActivate:[AuthGuardService]  },
      {path:'create-workout', component: CreateWorkoutComponent,        canActivate:[AuthGuardService]  },

      {path:'workout/:id', component: WorkoutComponent,                  canActivate:[AuthGuardService]  },

      {path:'user-workouts', component: UserWorkoutsComponent,          canActivate:[AuthGuardService]  },

      
    ])
  ],
  providers: [AuthServiceService, RegisterServiceService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
