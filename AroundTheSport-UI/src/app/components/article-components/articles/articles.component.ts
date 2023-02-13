import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ArticlePaging } from 'src/app/models/article/article-paging.model';
import { Article } from 'src/app/models/article/article.model';
import { PageResultArticle } from 'src/app/models/article/paged-result.model';
import { ArticleService } from 'src/app/services/article/article.service';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  pagedArticleResult!: PageResultArticle<Article>;

  constructor(
    private articleService: ArticleService
  ){}

  ngOnInit(): void {
    this.loadPagedArticleResult(1, 6)
  }

  pageChange(event : PageChangedEvent) :void{
    this.loadPagedArticleResult(event.page, event.itemsPerPage)
  }

  loadPagedArticleResult(page: number, itemsPerPage: number){
    let articlePaging = new ArticlePaging(page, itemsPerPage);

    this.articleService.getAllArticle(articlePaging).subscribe(pagedArticles => {
      this.pagedArticleResult = pagedArticles;
    });
  }

}
