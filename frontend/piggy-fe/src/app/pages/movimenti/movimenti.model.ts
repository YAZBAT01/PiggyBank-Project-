export interface Movimento {
  id: string;
  date: string;
  amount: number;
  description?: string;
  reference?: string;
  category: {
    id: string;
    name: string;
    type: 'Entrata' | 'Uscita';
  };
}

export interface CategoriaMovimento {
  _id: string;
  name: string;
  type: 'Entrata' | 'Uscita';
}

export interface RicercaMovimentiResponse {
  movements: Movimento[];
  balance?: number;
}
