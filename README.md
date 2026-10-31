# Knowledge Game — STONA α 0.2

**Cosa c’è di sbagliato?** Otto elementi, una regola nascosta: trova l’anomalia, correggila e scopri il collegamento.

**96 enigmi, 8 domini, 12 enigmi per dominio.** Nessuna installazione, email o registrazione obbligatoria. L’alpha ha raddoppiato i 48 enigmi della versione precedente.

## Giocare

Apri il link GitHub Pages del repository (quando la pubblicazione è attiva) e premi **Gioca subito**. Un solo clic avvia il primo enigma come ospite. I progressi di ogni enigma completato si salvano automaticamente su quel browser. Il file `index.html` contiene tutta l’app e funziona anche scaricato; la cifratura richiede un browser moderno con Web Crypto e un contesto sicuro, normalmente HTTPS.

## Profilo facoltativo

Da **Il mio profilo**:

1. Scegli un nome e una password: i progressi dell’ospite vengono trasferiti al nuovo profilo.
2. Premi **Esporta profilo** per scaricare un JSON cifrato.
3. Su un altro computer apri il gioco, scegli **Importa profilo**, seleziona il file e inserisci la stessa password.

Su questo browser puoi usare **Accedi** con nome e password. Su un nuovo dispositivo serve prima l’importazione del file: **non c’è sincronizzazione cloud automatica**. Esporta una copia aggiornata prima di cambiare dispositivo o cancellare i dati del sito. L’importazione dello stesso profilo unisce gli enigmi già completati senza duplicare punti e senza far regredire i progressi locali. Non esiste recupero password via email.

I profili nominativi si salvano cifrati nel browser e nei backup; la chiave rimane in memoria durante la sessione. **Esci dal profilo** prima di lasciare un dispositivo condiviso. Gli ospiti hanno un percorso separato, salvato in chiaro sul dispositivo. Nessun dato personale viene scritto nel repository pubblico e nessuna credenziale GitHub è inserita nel gioco.

## Cosa include

Numeri · Parole · Natura · Cucina · Geografia · Calcio · Cinema · Musica. Due indizi per enigma, tre fasi (individuazione, riparazione, spiegazione), intuizione dichiarata, sessioni da dieci, interessi personalizzabili, modalità Relax/Esplora/Sfida personale, XP e mappa per settore. Nessun timer obbligatorio e nessuna classifica pubblica.

La padronanza descrive le prove nel gioco; **non misura il QI**. Gli otto domini sono una scelta progettuale qualitativa, non una selezione scientificamente validata. Senza prove un settore mostra «Da esplorare», senza una percentuale attribuita alla persona.

## Verifica e pubblicazione

```sh
node tests/catalog.mjs
node tests/content.mjs
node tests/profiles.mjs
```

Il workflow `.github/workflows/pages.yml` verifica il catalogo, le regole numeriche/linguistiche e i profili; poi pubblica soltanto `index.html` su GitHub Pages da `main`. L’amministratore deve abilitare **Settings → Pages → Source: GitHub Actions** una volta. Le modifiche successive vengono pubblicate automaticamente. Uno stato CI verde per i test non equivale a una pubblicazione completata: controllare il job `deploy`.

## Documentazione

- [Game design e principi](docs/GAME_DESIGN.md)
- [Studio degli otto domini](docs/DOMAINS.md)
- [Stato, collaudo e limiti](docs/PROTOTYPE_STATUS.md)
- [Profili, cifratura e trasferimento](docs/PROFILES.md)
- [Revisione del catalogo aggiunto](docs/CATALOG_ALPHA_02.md)
- [Primo giro di test](docs/FIRST_PLAYTEST.md)

**Diritti:** la pubblicazione del codice non implica concessione di licenze ulteriori.
