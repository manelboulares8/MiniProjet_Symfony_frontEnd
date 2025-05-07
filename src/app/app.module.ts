import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Pour les formulaires
import { ReactiveFormsModule } from '@angular/forms';  // Pour les formulaires réactifs
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // Pour les animations si tu les utilises
import { MatButtonModule } from '@angular/material/button';  // Si tu utilises Material Design pour les boutons
import { MatTableModule } from '@angular/material/table';  // Si tu utilises Material Design pour les tableaux
import { MatInputModule } from '@angular/material/input';  // Pour les champs de saisie
import { MatPaginatorModule } from '@angular/material/paginator';  // Si tu utilises des paginations
import { MatSortModule } from '@angular/material/sort';
import { ArticleAddComponent } from './article/article-add/article-add.component';  // Si tu utilises le tri dans les tableaux
import { RouterModule } from '@angular/router';
import { ArticleEditComponent } from './article/article-edit/article-edit.component';
import { FilterArticlesPipe } from './filter-articles.pipe';
import { CommandeComponent } from './commande/commande/commande.component';
import { AddCommandeComponent } from './commande/add-commande/add-commande.component';
import { ModifierCommandeComponent } from './commande/modifier-commande/modifier-commande.component';
import { ArticleSearchComponent } from './article-search/article-search.component';
import { PaginatePipe } from './pipes/paginate.pipe';
import { ClientComponent } from './client/client.component';
import { AddClientComponent } from './add-client/add-client.component';
@NgModule({
  declarations: [
    AppComponent,
    ArticleAddComponent,
    ArticleListComponent,
    ArticleEditComponent,
    FilterArticlesPipe,
    FilterArticlesPipe,
    CommandeComponent,
    AddCommandeComponent,
    ModifierCommandeComponent,
    ArticleSearchComponent,
    PaginatePipe,
    ClientComponent,
    AddClientComponent,


    
  ],
  imports: [
    BrowserModule,
    CommonModule,  // Module nécessaire pour les directives comme ngIf et ngFor
    HttpClientModule,  // Pour les requêtes HTTP vers l'API
    FormsModule, 
    AppRoutingModule, 
    RouterModule,
    ReactiveFormsModule  // Ajoute le RouterModule ici si nécessaire


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
