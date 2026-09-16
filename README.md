# Project Work – Gestione Conti Correnti

Creare una applicazione in grado di gestire dei conti correnti.

## Struttura del database
*(il tipo di database è a scelta)*

### BankAccount
*(decidere i tipi di dati)*
- BankAccountID
- OpeningDate
- IBAN
- UserID

### User
- Email
- Password
- Lastname
- Firstname
- Fullname
- UserID

### Transaction
*(decidere i tipi di dati)*
- TransactionID
- BankAccountID
- Date
- Amount
- Balance
- Description
- TransactionCategoryID

### TransactionCategory
*(decidere i tipi di dati)*
- TransactionCategoryID
- Name
- Type

Caricare delle CategorieMovimenti (Apertura Conto, Bonifico Entrata, Bonifico Uscita, Prelievo contanti, Pagamento Utenze, Ricarica, Versamento Bancomat etc…). Ogni Categoria deve avere la tipologia corretta ("Entrata" o "Uscita").

## Architettura dell'applicazione

L'applicazione è strutturata in 2 parti:

- **WebApi** in grado di gestire tutte le chiamate richieste. La tecnologia/linguaggio della WebApi è a scelta.
- **Frontend web** basato su Angular. Chi vuole può usare un altro framework.
- L'applicazione deve essere pubblicata online.

## Funzionalità / Pagine richieste

### Funzionalità di Registrazione

- L'utente deve compilare Email, Password, ConfermaPassword, NomeTitolare, CognomeTitolare.
- Prevedere un controllo lato client:
  - Obbligo di caricamento di tutti i dati
  - Validità formale della mail
  - Password almeno 8 caratteri, una maiuscola e un simbolo
  - Password uguale a conferma password
- Lato WebApi: rifare le verifiche lato client e verificare che la email non sia già esistente. Se la mail non esiste: inserire il record in TContiCorrenti. È necessario implementare l'invio della mail di conferma registrazione. Una volta confermata la registrazione, inserire in automatico nel relativo conto corrente un movimento di apertura con tutti gli importi a zero (sia importo che saldo).
- La password deve essere salvata su db in formato criptato.
- L'IBAN verrà caricato a mano successivamente dopo la registrazione dell'utente (anche se nelle applicazioni reali viene generato automaticamente).
- Per poter continuare con il project work, caricare manualmente almeno 10 Movimenti per due conti correnti di test: il primo movimento deve avere come Descrizione Estesa "Apertura Conto" e poi caricare gli altri movimenti (sia di Entrata che di Uscita). Attenzione: in ogni movimento va caricato il saldo finale (in base al saldo precedente). La descrizione estesa per esempio è "Bonifico disposto a favore di…" oppure "Addebito diretto a favore di…" oppure "Bonifico disposto da…".

### Funzionalità di Login

- Inserimento di Email e Password.
- Se dopo 30 secondi non si preme il pulsante "login" il form viene resettato e si comunica che si è impiegato troppo tempo a fare login.
- Se il login è valido si viene reinviati ad una home page web ove viene visualizzato: Benvenuto Mario Rossi, il saldo del conto corrente e una tabella con gli ultimi 5 movimenti.
- Nella tabella con gli ultimi 5 movimenti deve essere presente un pulsante o link "Dettagli" che permette di accedere alla pagina web DettaglioMovimento dove verrà visualizzato il dettaglio del movimento selezionato (tutti i campi della TMovimentiContoCorrente).
- Per ogni accesso, memorizzare in una tabella l'indirizzo IP, data/ora e se l'accesso è valido oppure no.

### Funzionalità di RicercaMovimenti1

- Deve essere possibile visualizzare gli ultimi n movimenti (n deciso dall'utente) e deve visualizzare il saldo finale del conto corrente. I movimenti verranno visualizzati in una tabella in ordine decrescente di Data (Data, Importo, NomeCategoria).
- Possibilità di esportazione dei movimenti in formato Excel oppure CSV (è sufficiente uno dei due).

### Funzionalità di RicercaMovimenti2

- Deve essere possibile visualizzare gli ultimi n movimenti (n deciso dall'utente) di una certa CategoriaMovimenti scelta dall'utente. Non visualizza il saldo finale. I movimenti verranno visualizzati in una tabella in ordine decrescente di Data (Data, Importo, NomeCategoria).
- Possibilità di esportazione dei movimenti in formato Excel oppure CSV (è sufficiente uno dei due).

### Funzionalità di RicercaMovimenti3

- Deve essere possibile visualizzare gli ultimi n movimenti (n deciso dall'utente) fra due date (scelte dall'utente). Non visualizza il saldo finale. I movimenti verranno visualizzati in una tabella in ordine decrescente di Data (Data, Importo, NomeCategoria).
- Possibilità di esportazione dei movimenti in formato Excel oppure CSV (è sufficiente uno dei due).

### Ricarica di un cellulare

- L'utente deve inserire: numero telefonico, operatore (Iliad, TIM, Vodafone etc.) e taglio della ricarica (5, 10, 20, 30 euro etc.). La procedura andrà ad inserire un nuovo record in TMovimenti col relativo saldo aggiornato.
- Va prima verificato che ci sia saldo disponibile.
- Memorizzare in una tabella l'indirizzo IP, data/ora e se l'operazione è andata a buon fine o meno.

### Bonifico da un conto corrente ad un altro conto corrente della stessa applicazione

- Procedura per l'inserimento dell'IBAN del destinatario e importo bonifico.
- Va verificato che l'IBAN sia presente in TContiCorrenti.
- Va verificato che ci sia saldo disponibile.
- Memorizzare in una tabella l'indirizzo IP, data/ora e se l'operazione è andata a buon fine o meno.

### Modifica Password

- Ovviamente possibile solo se l'utente è loggato.
- Memorizzare in una tabella l'indirizzo IP, data/ora e se l'operazione è andata a buon fine o meno.

### Profilo

- Vengono visualizzati tutti i dati della TContiCorrenti (a parte ovviamente la password).

### Navigazione

- Tutte le varie pagine saranno accessibili tramite un menu (dopo il login).

## Stack tecnologico

- **DB:** MongoDB Atlas
- **Backend:** JS
- **Nome del progetto:** PiggyBank
