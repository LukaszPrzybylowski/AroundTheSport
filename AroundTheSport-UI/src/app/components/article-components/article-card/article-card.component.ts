import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article/article.model';
import { PhotoService } from 'src/app/services/photo/photo.service';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit{

  @Input() article!: Article;

  articlePhotoUrl!: string;

  constructor(
    private router: Router,
    private photoService: PhotoService
  ){}

  ngOnInit(): void {
    if(!!this.article.photoId){
      this.photoService.get(this.article.photoId).subscribe(photo => {
        if(!!photo){
          this.articlePhotoUrl = photo.imageUrl;
        }
      })
    }
  }

  readMore(articleId : number){
    this.router.navigate([`/articles/${articleId}`])
  }

}
