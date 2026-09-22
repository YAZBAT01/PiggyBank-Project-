export type CategoriaMovimento = 'Ricarica Telefonica' | 'Shopping' | 'Utenze' | 'Stipendio' | 'Intrattenimento';

export interface Movimento {
  id: string;
  data: Date;
  descrizione: string;
  categoria: CategoriaMovimento;
  importo: number;
  esito: 'OK' | 'FALLITO';
  indirizzoIP: string;
}

export interface RicaricaTelefonoRequest {
  numeroTelefono: string;
  operatore: string;
  taglio: number;
}

export interface RicaricaTelefonoResponse {
  success: boolean;
  messaggio: string;
  nuovoSaldo?: number;
  movimentoCreato?: Movimento;
}