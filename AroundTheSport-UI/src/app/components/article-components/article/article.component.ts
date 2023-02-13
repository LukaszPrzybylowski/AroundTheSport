import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article/article.model';
import { ArticleService } from 'src/app/services/article/article.service';
import { PhotoService } from 'src/app/services/photo/photo.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article!: Article;
  articlePhotoUrl!: string;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    const articleId = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.articleService.getArticle(articleId).subscribe(article => {
      this.article = article;

      if (!!this.article.photoId) {
        this.photoService.get(this.article.photoId).subscribe(photo => {
          this.articlePhotoUrl = photo.imageUrl;
        });
      }
    });
  }


}
