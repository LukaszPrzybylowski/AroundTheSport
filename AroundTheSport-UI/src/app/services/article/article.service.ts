import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleCreate } from 'src/app/models/article/article-create-model';
import { ArticlePaging } from 'src/app/models/article/article-paging.model';
import { Article } from 'src/app/models/article/article.model';
import { PageResultArticle } from 'src/app/models/article/paged-result.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient
  ) { }

  createArticle(model: ArticleCreate) : Observable<Article>{
    return this.http.post<Article>(`${environment.webApi}/Article`, model);
  }

  getAllArticle(articlePaging: ArticlePaging)  : Observable<PageResultArticle<Article>>{
    return this.http.get<PageResultArticle<Article>>(`${environment.webApi}/Article?Page=${articlePaging.page}&PageSize=${articlePaging.pageSize}`);
  }
  getArticle(articleId: number) : Observable<Article>{
    return this.http.get<Article>(`${environment.webApi}/Article/${articleId}`);
  }

  getArticleByApplicationUserId(applicationUserId : number) : Observable<Article[]> {
    return this.http.get<Article[]>(`${environment.webApi}/Article/user/${applicationUserId}`);
  }

  
  getMostFamous() : Observable<Article[]> {
    return this.http.get<Article[]>(`${environment.webApi}/Article/famousArticles`);
  }
  deleteArticle(articleId: number) : Observable<number>{
    return this.http.delete<number>(`${environment.webApi}/Article/${articleId}`);
  }
}
