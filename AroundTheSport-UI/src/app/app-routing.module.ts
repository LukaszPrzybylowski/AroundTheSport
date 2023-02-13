import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleEditComponent } from './components/article-components/article-edit/article-edit.component';
import { ArticleComponent } from './components/article-components/article/article.component';
import { ArticlesComponent } from './components/article-components/articles/articles.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForumComponent } from './components/forum-components/forum/forum.component';
import { ForumsComponent } from './components/forum-components/forums/forums.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PhotoAlbumComponent } from './components/photo-album/photo-album.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path : '', redirectTo: '/home', pathMatch: 'full'},
  {path : 'home', component : HomeComponent},
  {path : 'login', component: LoginComponent},
  {path : 'register', component: RegisterComponent},
  {path : 'articles', component : ArticlesComponent},
  {path : 'articles/:id', component: ArticleComponent},
  {path : 'forums', component : ForumComponent},
  {path : 'forums/:id', component: ForumsComponent},
  {path : 'photo-album', component: PhotoAlbumComponent, canActivate: [AuthGuard]},
  {path : 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path : 'dashboard/:id', component: ArticleEditComponent, canActivate: [AuthGuard]},
  {path : 'not-found', component: NotFoundComponent},
  {path : "**", redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
