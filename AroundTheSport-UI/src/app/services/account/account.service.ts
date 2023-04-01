import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApplicationUserCreate } from 'src/app/models/account/application-user-create.model';
import { ApplicationUserLogin } from 'src/app/models/account/application-user-login.model';
import { ApplicationUser } from 'src/app/models/account/application-user-model';
import { environment } from 'src/environments/environment';
import { ApplicationUserUpdate } from 'src/app/models/account/application-user-update.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSubject$: BehaviorSubject<ApplicationUser>;

  constructor(
    private http: HttpClient
  ) { 

    this.currentUserSubject$ = new BehaviorSubject<ApplicationUser>(JSON.parse(localStorage.getItem('engineerWorld-currentUser')|| '{}'));
  }

  update(model: ApplicationUserUpdate) : Observable<ApplicationUserUpdate>{
    return this.http.patch(`${environment.webApi}/Account/accountSettings`, model).pipe(
      map((user: any)=>{

        if(user){
          localStorage.setItem('engineerWorld-currentUser', JSON.stringify(user));
          this.setCurrentUser(user)
        }
        return user;
      })
    )
  }

  login(model: ApplicationUserLogin) : Observable<ApplicationUser>  {
    return this.http.post(`${environment.webApi}/Account/login`, model).pipe(
      map((user: any)=> {

        if(user){
          localStorage.setItem('engineerWorld-currentUser', JSON.stringify(user));
          this.setCurrentUser(user)
        }
        return user;
      })
    )
  }

  public givenUserIsLoggedIn(username: string){
    return this.isLoggedIn() && this.currentUserValue.username === username;
  }

  public isLoggedIn(){
    const currentUser = this.currentUserValue;
    const isLoggedIn = !!currentUser && !!currentUser.token;
    return isLoggedIn;
  }


  register(model: ApplicationUserCreate) : Observable<ApplicationUser> {
     return this.http.post(`${environment.webApi}/Account/register`, model).pipe(
      map((user : any) => {

        if (user) {
          localStorage.setItem('engineerWorld-currentUser', JSON.stringify(user));
          this.setCurrentUser(user);
        }

        return user;
      })
    )
  }

  
  setCurrentUser(user: ApplicationUser){
    this.currentUserSubject$.next(user);

  }

  public get currentUserValue(): ApplicationUser {
    return this.currentUserSubject$.value;
  }

  logout(){
    localStorage.removeItem('engineerWorld-currentUser');
    this.currentUserSubject$.next(new ApplicationUser(null,null,null,null,null,null,null,null));
  }
}
