import { Component, OnInit } from '@angular/core';
import { RegisterServiceService } from '../services/register-service.service';
import { AuthServiceService } from '../services/auth-service.service';
import { FlaskWorkoutsServiceService } from '../services/flask-workouts-service.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {

  constructor(private registerService: RegisterServiceService, 
    private authService: AuthServiceService, 
    private flaskUserService: FlaskWorkoutsServiceService,
    private notifier: NotifierService
    
    ) { }

  registerUserWithEmailPassword(userData){

   /*  this.flaskUserService.validate_user(userData.value).toPromise()
    .then(response => {
        if (response["username"]) userData.form.controls["username"].setErrors({'notUnique':true, 'message':"Username is already taken"})
        else if (response["email"]) userData.form.controls["email"].setErrors({'notUnique':true, 'message':"Email is already in database"})
        else if (response["confirm_password"]) userData.form.controls["confirm_password"].setErrors({'notUnique': true, 'message': "Passwords must match"})
        else {
          this.registerService.registerUserWithEmailPassword(userData.value)                   
        }
      }) */

      this.registerService.registerUserWithEmailPassword(userData.value)                   
      .catch(error=>{
        this.registerService.flashMessage(error.message,'danger')
        this.notifier.notify(error.message,'Error creating')
      }) 

  }

  googleLogin(){
    return this.authService.googleLogin()
  }

}
