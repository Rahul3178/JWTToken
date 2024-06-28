import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  

  loginForm= new FormGroup({
    
    emailFormControl: new FormControl('',[Validators.required,Validators.email]),
    passwordFormControl:new FormControl('',[Validators.required,Validators.min(6)])
  }

  )

  // loginObj:any={
  //     "EmailId":this.loginForm.value.emailFormControl,
  //     "Password":this.loginForm.value.passwordFormControl
  // }

  constructor(private userService:UserService,private router:Router){}

  onLoginWith(){

   debugger;
    this.userService.onLogin(
      {
        "EmailId":this.loginForm.controls.emailFormControl.value,
        "Password":this.loginForm.controls.passwordFormControl.value
    }
    ).subscribe((res:any)=>{
      debugger;
          if(res.result)
            {
                localStorage.setItem('user',JSON.stringify(res.data));
                localStorage.setItem('userEmail',JSON.stringify(res.data.emailId));
                localStorage.setItem('userRefresh',JSON.stringify(res.data.refreshToken));
                localStorage.setItem('userToken',JSON.stringify(res.data.token));
                localStorage.setItem('userUserId',JSON.stringify(res.data.userId));
                this.router.navigateByUrl('/dashboard');
            }else{
              console.log(res.message)
              alert(res.message)
            }
      },error=>{
        console.log(error.message)
        alert(error.data)

      }
      
    )
    
  }
  
  

}
