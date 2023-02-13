import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, VirtualTimeScheduler } from 'rxjs';
import { ForumCommentCreate } from 'src/app/models/forum-comment/forum-comment-create.model';
import { ForumComment } from 'src/app/models/forum-comment/forum-comment.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForumCommentService {

  constructor(
    private http: HttpClient
  ) { }

  createForumComment(model: ForumCommentCreate) : Observable<ForumComment>{
    return this.http.post<ForumComment>(`${environment.webApi}/ForumComment`, model);
  }

  getAllForumComments(forumId: number) : Observable<ForumComment[]>{
    return this.http.get<ForumComment[]>(`${environment.webApi}/ForumComment/${forumId}`);
  }

  deleteForumComment(forumCommentId: number) : Observable<number>{
    return this.http.delete<number>(`${environment.webApi}/ForumComment/${forumCommentId}`);
  }
}
