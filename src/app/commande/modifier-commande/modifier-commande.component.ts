import { Component } from '@angular/core';
import { Commande } from '../../models/commande.model';
import { Article, ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from '../../services/commande.service';

@Component({
  selector: 'app-modifier-commande',
  standalone: false,
  templateUrl: './modifier-commande.component.html',
  styleUrl: './modifier-commande.component.css'
})
export class ModifierCommandeComponent {
  commande: Commande = {
    id: 0,
    quantite: 1,
    articleId: 0,
    dateCommande: new Date().toISOString(),
    status: 'en cours',
    total: 0
  };
  articles: Article[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commandeService: CommandeService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadArticles();
    this.loadCommande(id);
  }

  loadCommande(id: number): void {
    this.commandeService.getCommande(id).subscribe({
      next: (commande) => {
        this.commande = commande;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  loadArticles(): void {
    this.articleService.getArticles().subscribe({
      next: (articles) => this.articles = articles,
      error: (err) => console.error(err)
    });
  }

  onSubmit(): void {
    this.commande.total = this.calculateTotal();
    
    this.commandeService.updateCommande(this.commande.id, this.commande).subscribe({
      next: () => {
        this.router.navigate(['/commande']);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour', err);
      }
    });
  }

  calculateTotal(): number {
    const article = this.articles.find(a => a.id === this.commande.articleId);
    return article ? article.prix * this.commande.quantite : 0;
  }
}