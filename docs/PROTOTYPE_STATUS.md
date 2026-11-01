# Stato del prototipo — STONA alpha 0.5 / Kids alpha 0.3

Data: 1 novembre 2026. Due applicazioni statiche indipendenti, pubblicate dallo stesso workflow GitHub Pages: classico e Kids (8–14 anni). Ciascuna ha 128 enigmi in 8 temi e 4 difficoltà; nessuna dipendenza esterna o server applicativo.

## Funzioni presenti

- Gioco immediato come ospite, salvataggio automatico nel browser, profili facoltativi con password e backup JSON cifrato importabile altrove.
- Inviti facoltativi dopo 5 domande distinte completate per il soprannome e 7 per il profilo; rinunce persistenti, nessun sollecito ai profili già registrati.
- Classifiche separate per edizione, **solo su questo browser/dispositivo**, podio e filtri per tema; partecipazione e uscita facoltative, nessun partecipante fittizio.
- Tasselli illustrati con SVG e icone pertinenti, anche per quantità esatte, orologi, pianeti, oggetti, ruoli sul campo e missioni Among Us. Testo sempre presente; nessun ABC generico.
- Salti illimitati senza penalità, senza XP o storico; gestione del pool esaurito. Soluzione mostrata tramite un comando separato.
- XP per tema dall’ID canonico del catalogo; nessun punteggio teorico nei temi non giocati. Livelli globali, sblocco accelerato dalle soluzioni veloci, messaggio esplicito di promozione.
- Interessi, modalità, mappa, 2 indizi, tre fasi di soluzione e sessioni da dieci.

## Verifiche

Eseguire le otto verifiche del workflow: catalog, content, profiles, progression, kids, scoring-and-skips, engagement, e profiles sul file Kids. I controlli comprendono cifratura con Web Crypto nativo, migrazioni, tutti i 128 percorsi di soluzione per edizione, livelli e temporizzazione, attribuzione degli XP, salti, inviti 5/7, iscrizione/uscita dalla classifica, importazioni obsolete e isolamento fra edizioni.

Collaudo Chromium dell’alpha corrente: invito al soprannome dopo il quinto risultato e al profilo dopo il settimo in entrambe le edizioni; continuazione senza registrazione, soprannome senza password, partecipazione alla classifica, punteggio totale e filtro Among Us (70 dei 90 XP), nessun giocatore adulto nella classifica Kids. Verificata la resa dei tasselli e delle missioni illustrate; controllo a larghezza 390 px mediante iframe locale. Non equivale a un collaudo su un telefono reale.

## Limiti

Nessuna classifica online condivisa, sincronizzazione automatica, recupero password o multiplayer. Il trasferimento fra computer richiede un backup esportato. Classifica locale informale, senza misure anti-manomissione. Un tentativo incompleto può ripartire al ricaricamento; le domande completate restano salvate. Alcuni nomi e concetti rimangono testuali quando manca una rappresentazione appropriata. Mancano audit WCAG, collaudo sistematico cross-browser e playtest editoriale con utenti esterni. Difficoltà e titoli sono euristiche del gioco, non misure di intelligenza.

La versione è destinata al primo giro di test del concetto. La pubblicazione è completata solo quando il job deploy del workflow è riuscito.
