import { Component, OnInit } from '@angular/core';
import { Commande } from '../../models/commande.model';
import { CommandeService } from '../../services/commande.service';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commande',
  standalone: false,
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent implements OnInit {
  commandes: Commande[] = [];
  articles: Article[] = [];
  currentPage: number = 1; // Page actuelle
  itemsPerPage: number = 5;
  filteredCommandes: Commande[] = [];
  searchText: string = '';
  constructor(private commandeService: CommandeService,    private articleService: ArticleService,    private router: Router
    // Ajoutez ceci
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getArticles().subscribe({
      next: (articles) => {
        this.articles = articles;
        this.loadCommandes(); // Charge les commandes après les articles
      },
      error: (err) => console.error('Erreur chargement articles:', err)
    });
  }

  loadCommandes() {
    this.commandeService.getCommandes().subscribe(data => {
      this.commandes = data;
    });
  }

  deleteCommande(id: number): void {
    const confirmation = confirm('Voulez-vous vraiment supprimer cette commande ?');
    
    if (!confirmation) {
      return; // Annule si l'utilisateur refuse
    }
  
    this.commandeService.deleteCommande(id).subscribe({
      next: () => {
        console.log('Commande supprimée avec succès');
        this.loadCommandes();
        // Optionnel : Ajouter un message de succès à l'utilisateur
      },
      error: (err) => {
        console.error('Échec de la suppression', err);
        // Optionnel : Ajouter un message d'erreur à l'utilisateur
      }
    });
  }
  getArticleName(articleId: number): string {
    const article = this.articles.find(a => a.id === articleId);
    return article?.nom || `ID: ${articleId}`;
  }
  loadData() {
    this.commandeService.getCommandes().subscribe({
      next: (commandes) => {
        console.log('Structure des commandes:', commandes); // Debug
        this.commandes = commandes;
        this.loadArticles();
      }
    });
  }
  editCommande(id: number): void {
    this.router.navigate(['/commandes/edit', id]);
  }
  filterCommandes() {
    if (!this.searchText) {
      this.filteredCommandes = this.commandes;
    } else {
      this.filteredCommandes = this.commandes.filter((commande) =>
        commande.id.toString().includes(this.searchText) ||
        this.getArticleName(commande.articleId).toLowerCase().includes(this.searchText.toLowerCase()) ||
        commande.status.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
  totalPages(): number[] {
    const pageCount = Math.ceil(this.commandes.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
}