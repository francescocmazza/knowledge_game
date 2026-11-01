# Knowledge Game — STONA α 0.6

**Cosa c’è di sbagliato?** Otto elementi, una regola nascosta: trova l’anomalia, correggila e scopri il collegamento.

**320 enigmi, 8 domini, 40 enigmi per dominio e 10 difficoltà.** Nessuna installazione, email o registrazione obbligatoria. I 128 contenuti precedenti restano disponibili, con 192 nuove istanze di logica verificabile.

## Giocare

Apri [STONA su GitHub Pages](https://francescocmazza.github.io/knowledge_game/) e premi **Gioca subito**. Un solo clic avvia il primo enigma come ospite. I progressi di ogni enigma completato si salvano automaticamente su quel browser. Il file `index.html` contiene tutta l’app e funziona anche scaricato; la cifratura richiede un browser moderno con Web Crypto e un contesto sicuro, normalmente HTTPS.

## Profilo facoltativo

Da **Il mio profilo**:

1. Scegli un nome e una password: i progressi dell’ospite vengono trasferiti al nuovo profilo.
2. Premi **Esporta profilo** per scaricare un JSON cifrato.
3. Su un altro computer apri il gioco, scegli **Importa profilo**, seleziona il file e inserisci la stessa password.

Su questo browser puoi usare **Accedi** con nome e password. Su un nuovo dispositivo serve prima l’importazione del file: **non c’è sincronizzazione cloud automatica**. Esporta una copia aggiornata prima di cambiare dispositivo o cancellare i dati del sito. L’importazione dello stesso profilo unisce gli enigmi già completati senza duplicare punti e senza far regredire i progressi locali. Non esiste recupero password via email.

I profili nominativi si salvano cifrati nel browser e nei backup; la chiave rimane in memoria durante la sessione. **Esci dal profilo** prima di lasciare un dispositivo condiviso. Gli ospiti hanno un percorso separato, salvato in chiaro sul dispositivo. Nessun dato personale viene scritto nel repository pubblico e nessuna credenziale GitHub è inserita nel gioco.

## Cosa include

Numeri · Parole · Natura · Cucina · Geografia · Calcio · Cinema · Musica. Due indizi per enigma, tre fasi (individuazione, riparazione, spiegazione), sessioni da dieci, interessi personalizzabili, modalità Relax/Esplora/Sfida personale, XP e mappa per settore. Nessun timer obbligatorio e nessuna classifica pubblica.

Gli XP per tema sono la somma dei punti delle domande di quel tema; **non misurano il QI**. Gli otto domini sono una scelta progettuale qualitativa, non una selezione scientificamente validata. Un tema non ancora giocato mostra 0 XP e «Non ancora giocato». La barra indica le domande esplorate.

## Verifica e pubblicazione

```sh
node tests/catalog.mjs
node tests/content.mjs
node tests/profiles.mjs
node tests/progression.mjs
```

Il workflow `.github/workflows/pages.yml` verifica il catalogo, le regole numeriche/linguistiche e i profili; poi pubblica `index.html` e la versione `kids/` su GitHub Pages da `main`. L’amministratore deve abilitare **Settings → Pages → Source: GitHub Actions** una volta. Le modifiche successive vengono pubblicate automaticamente. Uno stato CI verde per i test non equivale a una pubblicazione completata: controllare il job `deploy`.

## Documentazione

- [Ritmo adattivo, calibrazione e parametri](docs/ADAPTIVE_RHYTHM.md)
- [Game design e principi](docs/GAME_DESIGN.md)
- [Studio degli otto domini](docs/DOMAINS.md)
- [Stato, collaudo e limiti](docs/PROTOTYPE_STATUS.md)
- [Profili, cifratura e trasferimento](docs/PROFILES.md)
- [Revisione del catalogo aggiunto](docs/CATALOG_ALPHA_02.md)
- [Primo giro di test](docs/FIRST_PLAYTEST.md)

**Diritti:** la pubblicazione del codice non implica concessione di licenze ulteriori.

## Evoluzione storica: alpha 0.3 (scala precedente)

Tutti gli otto settori sono sempre selezionabili; Misto segue gli interessi. Quattro gradi: Primi passi, Collegamenti, Esploratore, Sfide esperte. I 32 nuovi enigmi del livello 1 usano numeri piccoli e oggetti familiari, con icone e testi, pensati anche per 10 anni (ipotesi da verificare in playtest). Una soluzione completa senza errori o indizi dà una stella; entro 45 secondi di gioco attivo ne dà due. Quattro stelle nello stesso livello aprono il successivo. Nessuna scadenza o sottrazione di punti; si può tornare a un livello più facile. Errori, aiuti e soluzioni mostrate non danno stelle. Ogni enigma può dare stelle una sola volta: un ripasso risolto correttamente dopo un errore o una rivelazione può recuperarle, senza nuovi XP. Lo storico e gli XP precedenti sono conservati, ma non sbloccano automaticamente difficoltà maggiori. Il tasto dell’istinto e il relativo bonus sono rimossi.

## Stona Kids (8–14 anni)

[Apri Stona Kids](https://francescocmazza.github.io/knowledge_game/kids/) · [Documentazione Kids](kids/README.md). Versione separata con 320 enigmi e 8 temi: Numeri e logica, Parole, Animali e natura, Pianeta Terra, Spazio, Sport, Musica e Among Us. Dieci livelli, soprannomi e salvataggi autonomi; nessuna registrazione obbligatoria. I backup Kids non si mescolano con quelli classici. Il tema Among Us propone missioni di logica originali e non ufficiali.

## Saltare, punti per tema e passaggi di livello

«Salta domanda» è disponibile prima di completare la risposta, anche dopo un errore o durante la correzione. Non dà né toglie XP o stelle, non registra un errore, non conta come domanda completata e rimanda quel quesito per la sessione. Puoi saltarne quante vuoi. Se termini le domande disponibili, puoi riprovare quelle saltate o scegliere un altro tema. Le domande saltate tornano disponibili in una nuova sessione o al ricaricamento. «Scopri la soluzione» è un comando separato: mostra la spiegazione e conserva la precedente ricompensa di scoperta.

Gli XP sono attribuiti dal tema del catalogo associato all’ID dell’enigma, non dal pulsante Misto o da etichette salvate. L’importazione/ricaricamento corregge eventuali etichette discordanti preservando XP e risposte. Le stime con valore iniziale teorico non sono più presentate come punteggio: mappa e pannello mostrano gli XP effettivi. Anche il risultato nomina il tema, così un enigma numerico all’interno di Among Us è riconoscibile come missione di quel tema.

Lo sblocco rapido mostra un avviso in evidenza: «Bravo, complimenti! Le tue risposte corrette e veloci hanno aperto il livello successivo. Ti abbiamo passato al livello…». Con risposte lente il messaggio riconosce le risposte corrette senza attribuire velocità non dimostrata. Il livello di gioco è comune agli otto temi; le stelle di sblocco non sono XP di una materia.


## Alpha 0.5: inviti gentili, classifiche locali e figure

In entrambe le versioni, dopo **5 domande distinte completate** (anche con soluzione mostrata) l’ospite riceve un invito facoltativo al soprannome; dopo **7** può creare il profilo con password, mantenendo tutti i punti. Entrambi gli inviti si possono ignorare e non vengono ripetuti. Saltare una domanda non aumenta il conteggio. Se il soprannome è già stato scelto, non viene richiesto di nuovo; chi ha già un profilo non riceve gli inviti.

**Classifica → Partecipa alla classifica locale** abilita il confronto solo per chi lo desidera. Podio, elenco e filtri per tema mostrano gli XP effettivi dei profili di **questo browser/dispositivo**, con classifiche separate per Kids e classico. Si può uscire in qualsiasi momento. Non c’è una classifica online condivisa o sincronizzazione fra browser. Nessun giocatore o punteggio fittizio è inserito per riempirla. Per conservare più giocatori sullo stesso browser, usare i profili facoltativi.

Illustrazioni native SVG e icone concrete nei tasselli e nelle sostituzioni: quantità esatte, orologi, pianeti, oggetti, strumenti, persone con strumenti, posizioni sul campo, ambienti e missioni con personaggi colorati. Le parole prive di un oggetto raffigurabile possono essere composte dalle loro lettere effettive; nessun ABC generico. Nessuna figura approssimativa per nomi di persone o titoli senza un’immagine appropriata. L’interfaccia ha tasselli più ampi, colori morbidi e controlli compatti; su mobile le risposte hanno due colonne.

Verificare anche `node tests/kids.mjs`, `node tests/scoring-and-skips.mjs`, `node tests/engagement.mjs` e `node tests/profiles.mjs kids/index.html`. Il nuovo test copre soglie 5/7, salti, rinunce persistenti, consenso alla classifica, ordine, filtri, cifratura, importazioni vecchie e isolamento delle versioni.


## Alpha 0.6: difficoltà 1–10 e ritmo adattivo (Kids 0.4)

Il livello del percorso e quello della domanda sono distinti. A livello 6, il piano base su dieci proposte è **4, 5, 6, 4, 5, 7, 4, 5, 6, 4**: quattro domande di livello 4, tre di livello 5, due di livello 6 e una di livello 7. Confini 1/10, promozioni, recupero e disponibilità possono cambiare la distribuzione reale. «Più tranquillo» evita le anticipazioni sopra il proprio livello. Dopo una risposta faticosa arrivano proposte più leggere, senza perdita di livello o punti.

La difficoltà parte da una stima editoriale e può essere ricalibrata con tempi attivi, aiuti, esiti e salti **contestualizzati al livello del giocatore e del tema**. Un salto neutro o per disinteresse non viene interpretato come incapacità. Servono almeno 8 codici giocatore distinti, di cui 4 vicini al livello della domanda, per modificare la stima; i ripassi non moltiplicano il campione.

I dati restano locali. I giocatori possono esportare un report da Il mio profilo; il curatore può unire i report in locale e distribuire solo aggregati con una release. Nessun invio automatico e nessun dato reale inventato. La specifica completa, la procedura e i limiti delle stime sono in [ADAPTIVE_RHYTHM.md](docs/ADAPTIVE_RHYTHM.md).

Le fonti modificabili sono `config/gameplay.json`, `data/catalog-*.json` e `src/adaptive-*.js/mjs`. Rigenerare con `node scripts/build-adaptive.mjs`; verificare anche `node tests/adaptive.mjs`. I file HTML restano autonomi e il gioco si apre dal link senza installazioni. I salvataggi precedenti mantengono XP, identità e progressi; il vecchio livello acquisito 1/2/3/4 corrisponde a 1/4/7/10 nella nuova scala.
