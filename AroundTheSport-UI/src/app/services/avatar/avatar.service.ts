import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Avatar } from 'src/app/models/avatart/avatar.model';
import { AvatarUpdate } from 'src/app/models/avatart/avatar.update';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(
    private http:HttpClient
  ) { }

  create(model: FormData) : Observable<Avatar> {
    return this.http.post<Avatar>(`${environment.webApi}/Avatar`, model);
  }

  getAvatarByUserId() : Observable<Avatar>{
    return this.http.get<Avatar>(`${environment.webApi}/Avatar`);
  }

  get(avatarId: number) : Observable<Avatar> {
    return this.http.get<Avatar>(`${environment.webApi}/Avatar/${avatarId}`);
  }

  delete(avatarId: number) : Observable<number>{
    return this.http.delete<number>(`${environment.webApi}/Avatar/${avatarId}`);
  }

  // update(avatarUpdate: AvatarUpdate, avatarId: number){
  //   return this.http.patch<AvatarUpdate>(`${environment.webApi}/Avatar/${avatarId}`, avatarUpdate);
  // }
}
