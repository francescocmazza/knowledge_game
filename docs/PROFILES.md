# Profili alpha 0.2

## Scelta di architettura

App statica single-file su GitHub Pages, senza backend, email, SDK o dipendenze esterne. L’ospite entra con un clic. Può scegliere in seguito nome/password e convertire il percorso senza perdere XP. I dati degli utenti non vengono inviati a GitHub né salvati nel repository. Una pagina statica non può scrivere in un repository senza credenziali: inserirle nel browser pubblico esporrebbe l’account GitHub. Per l’alpha si adotta quindi un profilo cifrato portatile.

## Persistenza

`stona-profiles-v2` contiene un ospite e fino a 20 profili nominativi per browser. Il precedente `stona-alpha-v1` viene migrato preservando i risultati validi; la chiave precedente non viene rimossa. Ogni enigma completato viene salvato; un tentativo incompleto riparte al ricaricamento. Il salvataggio degli ospiti è sincrono. Per i profili nominativi, una coda serializza la cifratura prima di importare, esportare, accedere o uscire.

Ogni profilo nominativo ha ID casuale, username, data di creazione/aggiornamento, salt, IV e payload cifrato. Nome e metadati locali sono leggibili; cronologia, interessi e XP del profilo sono nel payload cifrato. La password e la chiave non vengono persistite. Al ricaricamento si può giocare come ospite o accedere nuovamente al profilo. Il logout rimuove la chiave dalla sessione applicativa e torna all’ospite separato.

## File di trasferimento

Formato JSON `stona-profile`, versione 2; PBKDF2-SHA-256 con 210.000 iterazioni, salt casuale 16 byte, AES-GCM 256 bit, IV casuale 12 byte per ogni salvataggio. Additional authenticated data: `stona-profile:2`. Il payload include identità e stato, protetti contro modifiche accidentali o intenzionali senza password. Il file non contiene la password. La cifratura usa esclusivamente Web Crypto del browser.

Il file importato deve essere ≤1 MB e rispettare versione e parametri esatti; salt e IV hanno dimensioni controllate. Il payload viene validato, gli XP ricalcolati dalla cronologia e gli ID enigmi confrontati con il catalogo. Una password errata o un file alterato non sostituiscono lo stato. Un backup dello stesso ID viene unito alla cronologia locale per ID enigma, mantenendo il risultato già salvato in locale in caso di sovrapposizione. Nessun doppio premio XP. Un altro profilo con username uguale viene rifiutato con spiegazione.

## Limiti dichiarati nell’interfaccia

- Nessuna sincronizzazione automatica, recupero email o classifica affidabile sul server.
- Il file va esportato dopo i progressi che si desidera trasferire.
- Password minima di quattro caratteri per questa alpha; password deboli restano vulnerabili a tentativi offline.
- La cifratura non protegge un profilo lasciato aperto, un dispositivo compromesso o una pagina modificata da un attaccante.
- I dati del browser possono essere eliminati: conservare un backup.
- Una scheda alla volta per profilo: modifiche concorrenti tra schede non sono un sistema di sincronizzazione.
- Nessuna protezione contro il proprietario del dispositivo che modifica punteggi e codice: non usare per premi o certificazioni.

Riferimenti tecnici: [Web Crypto / MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API), [deriveKey](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey), [encrypt](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt).
