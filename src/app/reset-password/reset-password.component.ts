import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { NgFlashMessageService } from 'ng-flash-messages';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authService: AuthServiceService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngFlashMessageService:NgFlashMessageService,
     ) { }
  mode;
  actionCode;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params=>{
       if (!params) this.router.navigate(['/home'])
       else {
         this.mode = params['mode'];
         this.actionCode = params['oobCode']
         console.log(this.actionCode)
         console.log(this.mode)
       }
    })
  }
  resetPassword(form){
    let newPassword = form.newPassword;
    console.log(newPassword)
    this.authService.getAuth().verifyPasswordResetCode(this.actionCode)
         .then(email=>{
           if (email) this.authService.getAuth().confirmPasswordReset(this.actionCode,newPassword)
         })
         .catch(error =>{
           this.flashMessage(error.message, 'danger');
           this.router.navigate(['/login']);
         })
         .then(()=>{
          this.flashMessage("Your password has been changed", 'success');
          this.router.navigate(['/login']);
         })
  }
  flashMessage(message, type){
    this.ngFlashMessageService.showFlashMessage({
      messages: [message],
      dismissible: true,
      type: type
    })
  }



}
