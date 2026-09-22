/*export type LogOperation =
  | 'Login'
  | 'Ricarica cellulare'
  | 'Bonifico'
  | 'Modifica password'; */

export interface AccessLog {
  id: string;
  date: string;
  //operation: LogOperation;
  ipAddress: string;
  success: boolean;
}