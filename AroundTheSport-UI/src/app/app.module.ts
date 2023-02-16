import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown'
import { CollapseModule} from 'ngx-bootstrap/collapse'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypeaheadModule} from 'ngx-bootstrap/typeahead';
import { CarouselModule} from 'ngx-bootstrap/carousel';
import { PaginationModule} from 'ngx-bootstrap/pagination';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SummaryPipe } from './pipes/summary.pipe';
import { ArticleComponent } from './components/article-components/article/article.component';
import { ForumComponent } from './components/forum-components/forum/forum.component';
import { ArticleCardComponent } from './components/article-components/article-card/article-card.component';
import { ForumCardComponent } from './components/forum-components/forum-card/forum-card.component';
import { ArticleEditComponent } from './components/article-components/article-edit/article-edit.component';
import { ForumEditComponent } from './components/forum-components/forum-edit/forum-edit.component';
import { ArticlesComponent } from './components/article-components/articles/articles.component';
import { ForumsComponent } from './components/forum-components/forums/forums.component';
import { FamousArticlesComponent } from './components/article-components/famous-articles/famous-articles.component';
import { FamousForumsComponent } from './components/forum-components/famous-forums/famous-forums.component';
import { CommentBoxComponent } from './components/comment-components/comment-box/comment-box.component';
import { CommentSystemComponent } from './components/comment-components/comment-system/comment-system.component';
import { CommentsComponent } from './components/comment-components/comments/comments.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PhotoAlbumComponent } from './components/photo-album/photo-album.component';
import { JwtInterceptor } from './interceptors/jwt/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error/error.interceptor';
import { ContactComponent } from './components/contact/contact.component';



@NgModule({
  declarations: [
    AppComponent,
    SummaryPipe,
    ArticleComponent,
    ForumComponent,
    ArticleCardComponent,
    ForumCardComponent,
    ArticleEditComponent,
    ForumEditComponent,
    ArticlesComponent,
    ForumsComponent,
    FamousArticlesComponent,
    FamousForumsComponent,
    CommentBoxComponent,
    CommentSystemComponent,
    CommentsComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    NotFoundComponent,
    PhotoAlbumComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    TypeaheadModule.forRoot(),
    CarouselModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  providers: [
    HttpClient,
    {provide : HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide : HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
