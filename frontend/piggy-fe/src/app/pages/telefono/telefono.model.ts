export interface RicaricaTelefonoRequest {
  numeroTelefono: string;
  operatore: string;
  taglio: number;
}

export interface RicaricaTelefonoResponse {
  success: boolean;
  messaggio: string;
  nuovoSaldo?: number;
}