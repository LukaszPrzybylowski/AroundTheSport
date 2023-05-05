import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationUser } from 'src/app/models/account/application-user-model';
import { Article } from 'src/app/models/article/article.model';
import { Avatar } from 'src/app/models/avatart/avatar.model';
import { AccountService } from 'src/app/services/account/account.service';
import { ArticleService } from 'src/app/services/article/article.service';
import { AvatarService } from 'src/app/services/avatar/avatar.service';
import { PhotoService } from 'src/app/services/photo/photo.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article!: Article;
  articlePhotoUrl!: string;
  avatarImageUrl!: string;
  applicationUserId!: number;
  user!: ApplicationUser;
  avatarId!: number;
  avatar!: Avatar;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private photoService: PhotoService,
    private avatarService: AvatarService,
    public accountService: AccountService
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
    this.accountService.getApplicationUser(this.article.applicaitonUserId).subscribe(applicationUser => {
      this.user = applicationUser;
      if(!!this.user){
        if(applicationUser.avatarId){
          this.avatarId = applicationUser.avatarId;
          this.avatarService.get(this.avatarId).subscribe(avatar => {
            this.avatarImageUrl= avatar.avatarUrl;
          });
        }
      }
  });
  }


}
