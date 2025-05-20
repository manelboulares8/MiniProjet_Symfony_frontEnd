import { Commande } from "./commande.model";

export interface Client {
    id?: number;
    nom: string;
    email: string;
    adresse: string;
    commandes?: Commande[];
      role?: 'admin' | 'user';

  }