import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { ArticleCommentViewModel } from 'src/app/models/article-comment/article-comment-view-model.model';
import { ArticleComment } from 'src/app/models/article-comment/article_comment.model';
import { AccountService } from 'src/app/services/account/account.service';
import { ArticleCommentService } from 'src/app/services/article-comment/article-comment.service';
import { ArticleEditComponent } from '../../article-components/article-edit/article-edit.component';

@Component({
  selector: 'app-comment-system',
  templateUrl: './comment-system.component.html',
  styleUrls: ['./comment-system.component.css']
})
export class CommentSystemComponent implements OnInit {

  @Input() articleId!: number;

  standAloneComment!: ArticleCommentViewModel;
  articleComments!: ArticleComment[];
  articleCommentViewModels!: ArticleCommentViewModel[];

  constructor(
    private articleCommentService: ArticleCommentService,
    public accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.articleCommentService.getAllArticleComment(this.articleId).subscribe(blogComments => {

      if (this.accountService.isLoggedIn()) {
        this.initComment(this.accountService.currentUserValue.username!);
      }

      this.articleComments = blogComments;
      this.articleCommentViewModels = [];

      for (let i=0; i<this.articleComments.length; i++) {
        if (!this.articleComments[i].parentArticleCommentId) {
          this.findCommentReplies(this.articleCommentViewModels, i);
        }
      }

    });
  }

  initComment(username: string) {
    this.standAloneComment = {
      parentArticleCommentId: null,
      content: '',
      articleId: this.articleId,
      articleCommentId: -1,
      username: username,
      publishDate: null,
      updateDate: null,
      isEditable: false,
      deleteConfirm: false,
      isReplying: false,
      comments: []
    };
  }

  findCommentReplies(articleCommentViewModels: ArticleCommentViewModel[], index: number) {

    let firstElement = this.articleComments[index];
    let newComments: ArticleCommentViewModel[] = [];

    let commentViewModel: ArticleCommentViewModel = {
      parentArticleCommentId: firstElement.parentArticleCommentId || null,
      content: firstElement.content,
      articleId: firstElement.articleId,
      articleCommentId: firstElement.articleCommentId,
      username: firstElement.username,
      publishDate: firstElement.publishDate,
      updateDate: firstElement.updateDate,
      isEditable: false,
      deleteConfirm: false,
      isReplying: false,
      comments: newComments
    }

    articleCommentViewModels.push(commentViewModel);

    for (let i=0; i<this.articleComments.length; i++) {
      if (this.articleComments[i].parentArticleCommentId === firstElement.articleCommentId) {
        this.findCommentReplies(newComments, i);
      }
    }
  }

  onCommentSaved(articleComment: ArticleComment) {
    let commentViewModel: ArticleCommentViewModel = {
      parentArticleCommentId: articleComment.parentArticleCommentId!,
      content: articleComment.content,
      articleId: articleComment.articleId,
      articleCommentId: articleComment.articleCommentId,
      username: articleComment.username,
      publishDate: articleComment.publishDate,
      updateDate: articleComment.updateDate,
      isEditable: false,
      deleteConfirm: false,
      isReplying: false,
      comments: []
    }

    this.articleCommentViewModels.unshift(commentViewModel);
  }

}
