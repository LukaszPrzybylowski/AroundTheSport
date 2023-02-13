import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ArticleCommentViewModel } from 'src/app/models/article-comment/article-comment-view-model.model';
import { ArticleComment } from 'src/app/models/article-comment/article_comment.model';
import { AccountService } from 'src/app/services/account/account.service';
import { ArticleCommentService } from 'src/app/services/article-comment/article-comment.service';
import { FamousArticlesComponent } from '../../article-components/famous-articles/famous-articles.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() comments!: ArticleCommentViewModel[];

  constructor(
    public accountService: AccountService,
    private toastr: ToastrService,
    private articleCommentService: ArticleCommentService
  ){}

  ngOnInit(): void {
    
  }

  editComment(comment: ArticleCommentViewModel){
    comment.isEditable = true;
  }

  showDeleteConfirm(comment: ArticleCommentViewModel){
    comment.deleteConfirm =true;
  }

  cancelDeleteConfirm(comment: ArticleCommentViewModel){
    comment.deleteConfirm = false;
  }

  deleteConfirm(comment: ArticleCommentViewModel, comments: ArticleCommentViewModel[]){
    this.articleCommentService.deleteArticleComment(comment.articleCommentId).subscribe(() =>{

      let index = 0;

      for(let i=0; i<comments.length; i++){
        if(comments[i].articleCommentId === comment.articleCommentId){
          index = i;
        }
      }

      if(index > -1){
        comments.splice(index, 1);
      }

      this.toastr.info("Article comment deleted.")
    });
  }

  replyComment(comment: ArticleCommentViewModel){

    let replyComment: ArticleCommentViewModel = {
      parentArticleCommentId: comment.articleCommentId,
      content: '',
      articleId: comment.articleId,
      articleCommentId: -1,
      username: this.accountService.currentUserValue.username!,
      publishDate: new Date(),
      updateDate: new Date(),
      isEditable: false,
      deleteConfirm: false,
      isReplying: true,
      comments: []

    };

    comment.comments.push(replyComment);
  }

  onCommentSaved(articleComment: ArticleComment, comment: ArticleCommentViewModel){
    comment.articleCommentId = articleComment.articleCommentId;
    comment.parentArticleCommentId = articleComment.parentArticleCommentId!;
    comment.articleId = articleComment.articleId;
    comment.content = articleComment.content;
    comment.publishDate = articleComment.publishDate;
    comment.updateDate = articleComment.updateDate;
    comment.username = articleComment.username;
    comment.isEditable = false;
    comment.isReplying = false;
  }



}
