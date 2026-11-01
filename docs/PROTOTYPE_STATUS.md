# Stato del prototipo — STONA alpha 0.6 / Kids alpha 0.4

Data: 1 novembre 2026. Due applicazioni statiche indipendenti, pubblicate dallo stesso workflow GitHub Pages: classico e Kids (8–14 anni). Ciascuna ha 320 enigmi in 8 temi e 10 difficoltà; nessuna dipendenza esterna o server applicativo. Fonti condivise e build deterministica incorporano cataloghi, ritmo e calibrazione nei due HTML autonomi.

## Novità del ritmo adattivo

Piano base 4/3/2/1 a difficoltà L−2/L−1/L/L+1, con recuperi e ritmo tranquillo; parametro unico in `config/gameplay.json`. Distinzione tra livello raggiunto e difficoltà del quesito. Stime editoriali e calibrazione sperimentale con tempi attivi, aiuti, salti e contesto del profilo; almeno 8 codici giocatore, di cui 4 vicini alla difficoltà. Report facoltativi esportabili/importabili, nessun invio automatico. CLI per pubblicare solo aggregati; nessun dato reale inventato. Specifica: [ADAPTIVE_RHYTHM.md](ADAPTIVE_RHYTHM.md).

## Funzioni presenti

- Gioco immediato come ospite, salvataggio automatico nel browser, profili facoltativi con password e backup JSON cifrato importabile altrove.
- Inviti facoltativi dopo 5 domande distinte completate per il soprannome e 7 per il profilo; rinunce persistenti, nessun sollecito ai profili già registrati.
- Classifiche separate per edizione, **solo su questo browser/dispositivo**, podio e filtri per tema; partecipazione e uscita facoltative, nessun partecipante fittizio.
- Tasselli illustrati con SVG e icone pertinenti, anche per quantità esatte, orologi, pianeti, oggetti, ruoli sul campo e missioni Among Us. Testo sempre presente; nessun ABC generico.
- Salti illimitati senza penalità, senza XP o storico; gestione del pool esaurito. Soluzione mostrata tramite un comando separato.
- XP per tema dall’ID canonico del catalogo; nessun punteggio teorico nei temi non giocati. Livelli globali, sblocco accelerato dalle soluzioni veloci, messaggio esplicito di promozione.
- Interessi, modalità, mappa, 2 indizi, tre fasi di soluzione e sessioni da dieci.

## Verifiche

Eseguire build/check di coerenza e le nove verifiche del workflow: adaptive, catalog, content, profiles, progression, kids, scoring-and-skips, engagement, e profiles sul file Kids. I controlli comprendono cifratura con Web Crypto nativo, migrazioni, tutti i 320 percorsi di soluzione per edizione, livelli e temporizzazione, attribuzione degli XP, salti, inviti 5/7, iscrizione/uscita dalla classifica, importazioni obsolete e isolamento fra edizioni.

Collaudo Chromium della precedente alpha 0.5 / Kids 0.3, preservato come riferimento: invito al soprannome dopo il quinto risultato e al profilo dopo il settimo in entrambe le edizioni; continuazione senza registrazione, soprannome senza password, partecipazione alla classifica, punteggio totale e filtro Among Us (70 dei 90 XP), nessun giocatore adulto nella classifica Kids. Verificata la resa dei tasselli e delle missioni illustrate; controllo a larghezza 390 px mediante iframe locale. Non equivale a un collaudo su un telefono reale.

Collaudo aggiuntivo del ritmo corrente in Chromium su fixture di test separate dai dati del gioco: percorso livello 6 con prima proposta a difficoltà 4, dettaglio del piano 4/3/2/1 e dieci livelli; cambio ritmo tranquillo, salto a zero XP e feedback «Era difficile» con avviso di recupero; area report di test; schede visive Kids di difficoltà 10 con contesto fittizio esplicito. Le fixture non vengono pubblicate.

## Limiti

Nessuna classifica online condivisa, sincronizzazione automatica, recupero password o multiplayer. Il trasferimento fra computer richiede un backup esportato. Classifica locale informale, senza misure anti-manomissione. Un tentativo incompleto può ripartire al ricaricamento; le domande completate restano salvate. Alcuni nomi e concetti rimangono testuali quando manca una rappresentazione appropriata. La calibrazione tra dispositivi richiede report importati o una nuova release degli aggregati: non è una raccolta globale in tempo reale. I livelli non sono ancora calibrati su un campione reale. Mancano audit WCAG, collaudo sistematico cross-browser e playtest editoriale con utenti esterni. Difficoltà e titoli sono euristiche del gioco, non misure di intelligenza.

La versione è destinata al primo giro di test del concetto. La pubblicazione è completata solo quando il job deploy del workflow è riuscito.
