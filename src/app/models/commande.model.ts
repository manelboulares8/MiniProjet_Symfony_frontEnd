export interface Commande {
    id: number;         // optionnel (généré par Symfony)
    quantite: number;
    articleId: number;   // pour lier à un article
    dateCommande: string; // en général au format ISO (ex: "2025-04-26T14:00:00")
    status: string;   
    total:number;   // ex: "en attente", "validée", "annulée", etc.
  }
  