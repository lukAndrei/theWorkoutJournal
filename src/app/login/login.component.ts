import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { RegisterServiceService } from '../services/register-service.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  resetPassword:boolean = false;
  constructor(
    private authService: AuthServiceService,    
    private registerService:RegisterServiceService
    ) { }

  loginWithUserAndPassword(formData){
     let email = formData.email;
     let password = formData.password
     this.authService.loginWithUserAndPassword(email,password)
  }

  googleLogin(){
     this.authService.googleLogin()
     .catch(error=>{
      this.registerService.flashMessage(error.message,'danger')
     })
  }

  resetPasswordForm(form){
    let email = form.email
     this.authService.resetPassword(email)
  }

}
