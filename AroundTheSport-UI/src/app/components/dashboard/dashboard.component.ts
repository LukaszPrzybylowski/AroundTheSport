import { Component, OnInit } from '@angular/core';
import { Router, withEnabledBlockingInitialNavigation } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Article } from 'src/app/models/article/article.model';
import { AccountService } from 'src/app/services/account/account.service';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userArticles!: Article[];

  constructor(    
    private articleService: ArticleService,
    private router: Router,
    private toastr: ToastrService,
    private accountService: AccountService
    ){}

  ngOnInit(): void {
    this.userArticles = [];

    let currentApplicationUserId = this.accountService.currentUserValue.applicationUserId;

    this.articleService.getArticleByApplicationUserId(currentApplicationUserId!).subscribe(userArticles => {
      this.userArticles = userArticles;
    });
  }

  confirmDelete(article: Article){
    article.deleteConfirm = true;
  }

  cancelDeleteConfirm(article: Article){
    article.deleteConfirm = false;
  }

  deleteConfirmed(article: Article, articles: Article[]){
    this.articleService.deleteArticle(article.articleId).subscribe(() =>{

      let index = 0;

      for(let i=0; i<articles.length; i++)
      {
        if (articles[i].articleId = article.articleId)
        {
          index = i;
        }
      }

      if(index> -1){
        articles.splice(index, 1);
      }

      this.toastr.info("Article deleted");
    });
  }

  editArticle(articleId : number){
    this.router.navigate([`/dashboard/${articleId}`]);
  }

  createArticle(){
    this.router.navigate([`/dashboard/-1`]);
  }

}
