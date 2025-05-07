import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleAddComponent } from './article/article-add/article-add.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { ArticleEditComponent } from './article/article-edit/article-edit.component';
import { AddCommandeComponent } from './commande/add-commande/add-commande.component';
import { CommandeComponent } from './commande/commande/commande.component';
import { ModifierCommandeComponent } from './commande/modifier-commande/modifier-commande.component';
import { ArticleSearchComponent } from './article-search/article-search.component';
import { ClientComponent } from './client/client.component';
import { AddClientComponent } from './add-client/add-client.component';

const routes: Routes = [
  { path: 'add-article', component: ArticleAddComponent },

{path :'lister-articles',component:ArticleListComponent},
{ path: '', redirectTo: 'lister-articles', pathMatch: 'full' },
{ path: 'articles/edit/:id', component: ArticleEditComponent },
 // ✅ route par défaut
 { path: 'add-commande', component: AddCommandeComponent },
 {path:'commande',component:CommandeComponent},
 { path: 'commandes/edit/:id', component: ModifierCommandeComponent },
 {path:'searchByPrice',component:ArticleSearchComponent},
 {path:'clients',component:ClientComponent},
 {path:'add-client',component:AddClientComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
