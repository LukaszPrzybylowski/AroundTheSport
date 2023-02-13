import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ArticleCommentCreate } from 'src/app/models/article-comment/article-comment-create.model';
import { ArticleCommentViewModel } from 'src/app/models/article-comment/article-comment-view-model.model';
import { ArticleComment } from 'src/app/models/article-comment/article_comment.model';
import { ArticleCommentService } from 'src/app/services/article-comment/article-comment.service';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit{

  @Input() comment!: ArticleCommentViewModel;
  @Output() commentSaved = new EventEmitter<ArticleComment>();

  @ViewChild('commentForm') commentForm!: NgForm;

  constructor(
    private articleCommentService: ArticleCommentService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  resetComment() {
    this.commentForm.reset();
  }

  onSubmit() {

    let articleCommentCreate: ArticleCommentCreate = {
      articleCommentId: this.comment.articleCommentId,
      parentArticleCommentId: this.comment.parentArticleCommentId!,
      articleId: this.comment.articleId,
      content: this.comment.content
    };

    this.articleCommentService.createArticleComment(articleCommentCreate).subscribe(articleComment => {
      this.toastr.info("Comment saved.");
      this.resetComment();
      this.commentSaved.emit(articleComment);
    })
  }
}

