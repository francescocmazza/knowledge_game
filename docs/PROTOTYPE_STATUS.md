# Stato attuale: classico alpha 0.4 / Kids alpha 0.2

Aggiunti salto gratuito illimitato con rinvio nella sessione, gestione del pool esaurito, XP effettivi per tema da ID del catalogo, normalizzazione di etichette storiche discordanti e notifiche di promozione accessibili e veritiere. Rimossi i valori iniziali teorici dalle metriche mostrate. `tests/scoring-and-skips.mjs` copre entrambe le versioni, sei risposte numeriche senza XP negli altri temi, miste, salti parziali/ripetuti/esaurimento, nessuna penalità, correzione dello storico e passaggi dal livello 1 al 4. Le sezioni successive sono il registro storico.

# Stato attuale: alpha 0.3

128 enigmi, 8 settori sempre visibili, 4 livelli con 4 quesiti per settore/livello. Rimosso il tasto dell’istinto. Aggiunti 32 enigmi introduttivi illustrati con icone e testi. Il livello iniziale è pensato anche per un ragazzo di 10 anni; non è una validazione empirica su bambini. Dettagli e soglie aggiornati in README.md e GAME_DESIGN.md.

`node tests/progression.mjs` verifica porte di accesso ai livelli, sblocco rapido e lento, esclusione di errori/indizi/rivelazioni/ripassi, tempo in background e navigazione, persistenza dei metadati ed esclusione dello storico precedente dagli sblocchi. `tests/profiles.mjs` verifica ora tutti i 128 percorsi. Le verifiche sotto sono il registro storico della 0.2.

# STONA alpha 0.2 — stato e collaudo

31 ottobre 2026 · repository `francescocmazza/knowledge_game`.

## Implementato

- 96 enigmi: 12 per ciascuno degli otto domini. Conservati i 48 precedenti, aggiunti altri 48 con indizi, correzione e spiegazione.
- Ingresso con un clic come ospite, senza onboarding obbligatorio.
- Area personale, conversione dell’ospite in profilo, username/password locali, logout, più identità per browser.
- Cifratura dei profili nominativi e backup JSON, importazione su un altro dispositivo, unione di vecchi backup senza duplicare XP, migrazione del vecchio salvataggio.
- Mappa, cronologia recente, XP, due indizi, intuizione, interessi, tre modalità e sessioni da dieci.
- Segnalazione visibile se il browser non riesce a salvare.
- Workflow automatico di test e distribuzione GitHub Pages. L’attivazione iniziale di Pages richiede l’impostazione amministrativa del repository; lo stato del deployment è separato dallo stato del codice.

## Architettura

Un solo `index.html`, CSS/catalogo/JavaScript incorporati, nessun framework o servizio esterno. `stona-profiles-v2` nel browser; migrazione da `stona-alpha-v1`. Nessun dato degli utenti nel repository. Dettagli in [PROFILES.md](PROFILES.md).

## Verifiche eseguite durante lo sviluppo

- `node tests/catalog.mjs`: 96 ID unici, otto settori con 12 enigmi, otto elementi, quattro opzioni distinte, due indizi, anomalia e risposta valide come struttura; preservato il quesito fondativo con due posizioni accettate.
- `node tests/content.mjs`: soluzioni numeriche esatte delle sei nuove sequenze, regole ortografiche dei sei nuovi enigmi linguistici, relativi distrattori e duplicazioni inattese.
- `node tests/profiles.mjs`: avvio ospite, ricaricamento, conversione senza perdita, cifratura, password errata, login, ripristino su dispositivo simulato, backup precedente, isolamento di due profili, file alterato, migrazione v1, fallimento storage e percorso completo delle 96 soluzioni. Esecuzione del JavaScript reale con Web Crypto nativo Node in contesti isolati; non è un test grafico del browser.
- Verifica in browser Chromium: schermata iniziale → un clic → intuizione → secondo 5 accettato → correzione 8 → regola corretta → risultato +40 XP. Controllata la resa grafica desktop.

L’anteprima HTTP non espone Web Crypto per i profili; la cifratura va anche provata dal sito HTTPS pubblicato. I test automatici della cifratura usano l’implementazione nativa Web Crypto. Non sono stati completati audit WCAG, collaudo sistematico cross-browser/mobile reale, revisione indipendente di tutti i fatti o playtest con utenti esterni.

## Limiti di questa alpha

Nessuna sincronizzazione cloud automatica: il trasferimento avviene tramite file. Nessun recupero password, multiplayer o classifica pubblica. Un tentativo incompleto può ripartire dopo il ricaricamento; gli enigmi completati sono conservati. Le sostituzioni sono scelte fra opzioni predefinite; le regole alternative libere non sono giudicate automaticamente. Padronanza e difficoltà sono euristiche del gioco, non misure scientifiche.

La versione è destinata al **primo playtest del concetto**, non è il precedente obiettivo di MVP commerciale con almeno 250 enigmi. Checklist in [FIRST_PLAYTEST.md](FIRST_PLAYTEST.md).

Verificato anche in Chromium: otto settori visibili con salvataggio preesistente, livello 1 bloccante per le sfide avanzate, percorso di correzione e spiegazione, due stelle per risposta rapida. Il primo ripasso corretto di una domanda prima rivelata può recuperare stelle, senza duplicare XP.

Correzione icone: eliminate icone di settore ripetute e associazioni approssimative nei tasselli/opzioni. Associazioni esatte e sensibili al contesto, riconosciute anche in maiuscolo. Nessuna immagine se non c’è una rappresentazione appropriata. Aggiunta verifica in tests/progression.mjs.

Collaudo UI Kids alpha 0.2: salto da Pianeta Terra ad altra domanda con XP/stelle/conteggio invariati; risposta rapida successiva con promozione al livello 2, avviso in evidenza e focus sul messaggio; risultato con nome del tema e XP solo in Among Us.
