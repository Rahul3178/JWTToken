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


  loginObj:any={

    "EmailId":"",
    "Password":""
  }

  loginOn:FormGroup| undefined;

  emailFormControl= new FormControl('',[Validators.required,Validators.email]);
  passwordFormControl= new FormControl('',[Validators.required,Validators.min(6)]);

  constructor(private userService:UserService,private router:Router){}

  onLoginWith(){

   debugger;
    this.userService.onLogin(this.loginObj).subscribe((res:any)=>{
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
