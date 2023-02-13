import { HttpClient, HttpParameterCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleCommentCreate } from 'src/app/models/article-comment/article-comment-create.model';
import { ArticleComment } from 'src/app/models/article-comment/article_comment.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleCommentService {
  constructor(
    private http: HttpClient
  ) { }

  createArticleComment(model: ArticleCommentCreate) : Observable<ArticleComment>  {
    return this.http.post<ArticleComment>(`${environment.webApi}/ArticleComment`, model);
  }

  deleteArticleComment(articleCommentId: number) : Observable<number>  {
    return this.http.delete<number>(`${environment.webApi}/ArticleComment/${articleCommentId}`);
  }

  getAllArticleComment(articleId: number) : Observable<ArticleComment[]> {
    return this.http.get<ArticleComment[]>(`${environment.webApi}/ArticleComment/${articleId}`);
  }
}
