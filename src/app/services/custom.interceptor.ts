import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor(private userService:UserService) {}

  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let loggedUserData:any={};
    const localData=localStorage.getItem('user'); 
    if(localData!=null){
      loggedUserData=JSON.parse(localData);
    }
    const cloneRequest=request.clone({
        setHeaders:{
          Authorization:`Bearer ${loggedUserData.token}`
        }
      })
    return next.handle(cloneRequest).pipe(
      catchError((error:HttpErrorResponse)=>{
        // if token get expired we will got 401  unauthorized error here we have to handle that
        if(error.status==401)
          {
              const isRefreshed= confirm("Your session is expired. Do you want to continue?")
              if(isRefreshed){
                  this.userService.$refreshedToken.next(true);
              }
          }
        return throwError(error)
      })
    );
  }
}
