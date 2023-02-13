import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForumCreate } from 'src/app/models/forum/forum-create-model';
import { ForumPaging } from 'src/app/models/forum/forum-paging.model';
import { Forum } from 'src/app/models/forum/forum.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(
    private http: HttpClient
  ) { }

  createForum(model: ForumCreate) : Observable<Forum>{
    return this.http.post<Forum>(`${environment.webApi}/Forum`, model);
  }

  getAllForum(forumPaging : ForumPaging) : Observable<Forum[]>{
    return this.http.get<Forum[]>(`${environment.webApi}/Forum?Page = ${forumPaging.page}&PageSize = ${forumPaging.pageSize}`);
  }

  getForum(forumId: number) : Observable<Forum>{
    return this.http.get<Forum>(`${environment.webApi}/Forum/${forumId}`);
  }

  getForumByApplicationUserId(applicationUserId : number) : Observable<Forum[]>{
    return this.http.get<Forum[]>(`${environment.webApi}/Forum/user/${applicationUserId}`);
  }

  getAllFamousForums(): Observable<Forum[]>{
    return this.http.get<Forum[]>(`${environment.webApi}/Article/famous`);
  }

  deleteForum(forumId : number) : Observable<number>{
    return this.http.delete<number>(`${environment.webApi}/Forum/${forumId}`);
  }
}
