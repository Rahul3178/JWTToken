import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL='https://freeapi.gerasim.in/api/JWT/login';
@Injectable({
  providedIn: 'root'
})
export class UserService {

 
  constructor(private http:HttpClient) { }



      onLogin(obj:any){
       return this.http.post(URL,obj)
      }
      GetRefreshToken(obj:any){
       return this.http.post('https://freeapi.gerasim.in/api/JWT/refresh',obj)
      }

      getAllTheUsers(){
        return this.http.get('https://freeapi.gerasim.in/api/JWT/GetAllUsers');
      }
}
