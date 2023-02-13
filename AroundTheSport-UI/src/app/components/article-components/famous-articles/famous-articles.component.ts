import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article/article.model';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-famous-articles',
  templateUrl: './famous-articles.component.html',
  styleUrls: ['./famous-articles.component.css']
})
export class FamousArticlesComponent implements OnInit{

  famousArticles: Article[] = [];

  constructor(
    private articleService: ArticleService
  ){}

  ngOnInit(): void {
    this.articleService.getMostFamous().subscribe(articles =>{
      this.famousArticles = articles;
    });
  }

}
