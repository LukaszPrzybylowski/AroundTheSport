import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { ArticleCreate } from 'src/app/models/article/article-create-model';
import { Article } from 'src/app/models/article/article.model';
import { Photo } from 'src/app/models/photo/photo.model';
import { ArticleService } from 'src/app/services/article/article.service';
import { PhotoService } from 'src/app/services/photo/photo.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit{

  articleForm!: FormGroup;
  confirmImageDelete: boolean = false;
  userPhotos: Photo[] = [];


  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private photoService: PhotoService,
    private toastr: ToastrService
  ){}


  ngOnInit(): void {
    
    const articleId = parseInt(this.route.snapshot.paramMap.get('id')!);
  
    this.articleForm = this.formBuilder.group({
      articleId: [articleId],
      title: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50)
      ]],
      content: ['', [
        Validators.required,
        Validators.minLength(300),
        Validators.maxLength(100000),
      ]],

      
      photoDescription: [null],
      photoId: [null]
    });

    this.photoService.getByApplicationUserId().subscribe(userPhotos => {
      this.userPhotos = userPhotos;
    });

    if(!!articleId && articleId !== -1){
      this.articleService.getArticle(articleId).subscribe(article =>{
        this.updateForm(article);
      })
    }
  }

  getPhoto(photoId : number){
    for(let i=0; i<this.userPhotos.length; i++){
      if(this.userPhotos[i].photoId === photoId){
        return this.userPhotos[i];
      }
    }
    return null;
  }

  isTouched(field: string){
    return this.articleForm.get(field)!.touched;
  }

  hasErrors(field: string){
    return this.articleForm.get(field)!.errors;
  }

  hasError(field: string, error:string){
    return !!this.articleForm.get(field)!.hasError(error);
  }

  isNew(){
    return parseInt(this.articleForm.get('articleId')!.value) === -1;
  }

  detachPhoto(){
    this.articleForm.patchValue({
      photoId: null,
      photoDescription: null
    });
  }

  updateForm(article: Article){
    let photoDescription = this.getPhoto(article.articleId)?.description;

    this.articleForm.patchValue({
      articleId: article.articleId,
      title: article.title,
      content: article.content,
      photoId: article.photoId,
      photoDescription: photoDescription
    });
  }

  //atached a photo
  onSelect(event: TypeaheadMatch): void {
    let chosenPhoto: Photo = event.item

    this.articleForm.patchValue({
      photoId: chosenPhoto.photoId,
      photoDescription: chosenPhoto.description
    });
  }

  onSubmit(){

    let articleCreate: ArticleCreate = new ArticleCreate(
      this.articleForm.get('articleId')!.value,
      this.articleForm.get('title')!.value,
      this.articleForm.get('content')!.value,
      this.articleForm.get('photoId')!.value,
    );

    this.articleService.createArticle(articleCreate).subscribe(createdArticle =>{
      this.updateForm(createdArticle);
      this.toastr.info('Article saved.');
    })
  }
}
