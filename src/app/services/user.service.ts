import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

const URL='https://freeapi.gerasim.in/api/JWT/login';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  
  public $refreshedToken= new Subject<boolean>();
  public $refreshTokenReceived = new Subject<boolean>;


  // now we have to subscript this subject and then call the api
  constructor(private http:HttpClient) { 
    this.$refreshedToken.subscribe((res:any)=>{
      this.GetRefreshToken();
    })
  }


      onLogin(obj:any){
       return this.http.post(URL,obj)
      }


      GetRefreshToken(){

        let userData:any;
        let email;
        const localData=localStorage.getItem('user');
        const localEmail=localStorage.getItem('userEmail')
        if(localData!= null){
          userData=JSON.parse(localData);
        }
        if(localEmail!=null)
          {
            email=JSON.parse(localEmail);
          }

      
        const obj={
          "emailId":email,
          "token":userData.token,
          "refreshToken":userData.refreshToken
        }

       this.http.post('https://freeapi.gerasim.in/api/JWT/refresh',obj).subscribe((res:any)=>{

        
          debugger;
        localStorage.setItem('user',JSON.stringify(res.data))
        localStorage.setItem('userToken',JSON.stringify(res.data.token))
        localStorage.setItem('userRefresh',JSON.stringify(res.data.refreshToken))

        this.$refreshTokenReceived.next(true);
        
       })
      }

      getAllTheUsers(){
        return this.http.get('https://freeapi.gerasim.in/api/JWT/GetAllUsers');
      }


      
}
