import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleAddComponent } from './article/article-add/article-add.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { ArticleEditComponent } from './article/article-edit/article-edit.component';

const routes: Routes = [
  { path: 'add-article', component: ArticleAddComponent },

{path :'lister-articles',component:ArticleListComponent},
{ path: '', redirectTo: 'lister-articles', pathMatch: 'full' },
{ path: 'articles/edit/:id', component: ArticleEditComponent }
 // ✅ route par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
