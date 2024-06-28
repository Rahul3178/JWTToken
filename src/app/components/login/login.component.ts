import { Component } from '@angular/core';
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

  constructor(private userService:UserService,private router:Router){}

  onLoginWith(){

   debugger;
    this.userService.onLogin(this.loginObj).subscribe((res:any)=>{
      debugger;
          if(res.result)
            {
                localStorage.setItem('user',JSON.stringify(res.data));
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
