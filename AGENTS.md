# Knowledge Game / STONA — guida per chi continua il progetto

## Punto di partenza
- Leggi **README.md**, poi **docs/GAME_DESIGN.md**, **docs/DOMAINS.md** e **docs/PROTOTYPE_STATUS.md** prima di modificare meccaniche, tono, punteggi o catalogo.
- Il gioco si chiama **STONA** (nome provvisorio), repository **Knowledge Game**.
- Il prototipo funzionante è **index.html**, file unico offline con CSS, dati JSON e JavaScript.
- Catalogo attuale **320 enigmi, 8 settori**, 40 ciascuno (alpha 0.6). Non attribuire alla scelta degli otto una validazione scientifica o statistica che non esiste.

## Invarianti del prodotto
1. La domanda è «Cosa c'è di sbagliato?»; **non rivelare la regola** prima del tentativo.
2. Tre livelli della soluzione: **individuazione**, **riparazione**, **spiegazione**.
3. Supportare più posizioni/risposte valide quando il problema lo richiede; non penalizzare interpretazioni plausibili senza motivazione.
4. Accessibilità da cruciverba: indizi, passaggio ad altri enigmi, possibilità di scoprire la soluzione senza vergogna o linguaggio denigratorio.
5. **XP crescente e padronanza per settore distinte**. La padronanza è una stima di performance nel gioco, **non QI** o misura della persona.
6. Il pulsante «Lo sento d’istinto» è stato rimosso su richiesta dell’utente; non reintrodurlo. Dieci livelli reali con sblocco da soluzioni corrette, accelerato dalla velocità.
7. Personalizzazione dagli interessi, senza imporre segmentazioni educative o sociali.
8. Le competizioni sono **facoltative**, e il confronto con se stessi è centrale.
9. Nessuna falsa affermazione di crescita intellettiva generalizzata; mostrare progressi verificabili su prove comparabili.
10. Non aggiungere dipendenze esterne, raccolta dati, account o pubblicazione online senza necessità e decisione esplicita.

## Procedure prima di ogni modifica
- Verificare il formato dei dati JSON di `index.html`.
- Eseguire `node tests/catalog.mjs`, `node tests/content.mjs` `node tests/profiles.mjs` e `node tests/progression.mjs` (Node 22+), preservando i test esistenti.
- Quando si cambia il catalogo, aggiornare numeri nei documenti e nei testi UI.
- Se si aggiunge un enigma: verificare tutti i sette elementi coerenti, l'intruso, ogni correzione ammessa, due indizi progressivi, spiegazione e contesto fattuale.
- Alzare la difficoltà senza confondere **familiarità culturale** con **complessità cognitiva**.
- Annotare i test eseguiti effettivamente; non dichiarare test o release non eseguiti.

## Prossimi interventi prioritari
1. Gestione sostituzioni multiple e interpretazioni alternative.
2. Test editoriale e umano dei 320 enigmi per edizione.
3. Misura affidabilità della padronanza, indicatori con campione insufficiente.
4. Accessibilità e stress test mobile.
5. Nuove tipologie (visuale, audio, relazioni incrociate) e piano 20 domini.

## Fonte della verità
Se un riepilogo conversazionale è in conflitto con codice e documentazione versionata, controllare il repository, distinguere piano da implementazione e documentare la correzione.


## Alpha 0.2 autorizzata
Accesso ospite immediato; profili opzionali locali cifrati, export/import JSON, GitHub Pages esplicitamente richiesti. Leggere anche docs/PROFILES.md. Non scrivere dati utente né credenziali nel repository. Per la distribuzione: .github/workflows/pages.yml.

## Icone nelle risposte
Usare solo icone che rappresentano l’elemento concreto. Nessun fallback al simbolo del settore (ABC, pallone, nota musicale ecc.) e nessun oggetto vagamente simile. Se manca un’immagine appropriata, mostrare solo il testo senza uno spazio icona vuoto. Normalizzare maiuscole/minuscole; distinguere parole ambigue come rosa/viola dal contesto.

## Stona Kids
`kids/index.html` è la versione separata per 8–14 anni, con 8 temi e 320 enigmi. Leggere kids/README.md. Non mescolare storage, salvataggi legacy o formato dei backup con STONA classico. Eseguire anche `node tests/kids.mjs` e `node tests/profiles.mjs kids/index.html`. Il workflow distribuisce entrambe le versioni. Nessun nome reale o email richiesto: solo soprannome. Il tema Among Us è originale, ispirato e non ufficiale; non presentare i registri inventati come dati di una vera partita.

## Salti, punteggi e livelli (entrambe le versioni)
«Salta domanda» chiama passQuestion(): nessun XP/stella/errore/storico/completamento, rinvio per la sessione e gestione esplicita del pool esaurito. Non confonderlo con revealSolution() e il suo alias interno legacy skip(). I punteggi per tema sono gli XP effettivi attribuiti dall’ID canonico del catalogo: zero per temi non giocati. Le stelle di difficoltà sono globali. Notificare esplicitamente ogni sblocco e citare velocità solo se dimostrata. Eseguire anche node tests/scoring-and-skips.mjs.


## Inviti, classifiche e figure
Dopo 5 domande distinte completate, soprannome facoltativo; dopo 7, profilo facoltativo. Non contare salti/ripassi e non ripetere inviti declinati. Classifiche solo locali a questo browser, separate per edizione, con scelta esplicita e uscita; non chiamarle online. Riepilogo in chiaro solo per i partecipanti, storico cifrato. Le illustrazioni SVG devono riflettere valori e oggetti reali: nessun indizio implicito sull’intruso o immagine generica ripetuta. Eseguire `node tests/engagement.mjs` oltre agli altri controlli.


## Ritmo adattivo (specifica corrente)
Leggere `docs/ADAPTIVE_RHYTHM.md`. Fonti: `config/gameplay.json`, `data/catalog-*.json`, `src/adaptive-core.mjs`, `src/adaptive-app.js`; rigenerare con `node scripts/build-adaptive.mjs`. Non modificare soltanto il blocco generato dentro gli HTML. Dieci livelli, 4 quesiti per tema/livello; piano 4/3/2/1 relativo al livello scelto. Recuperi senza perdita di abilità/XP; salti non diventano errori. La telemetria funzionale locale e lo scambio facoltativo di report sono autorizzati in questa alpha; nessun invio automatico o pubblicazione di report individuali. Pubblicare solo aggregati qualificati. Se cambia il contenuto di un quesito incrementare `revision`; non cancellare il suo ID o gli XP storici. Le nuove stime non riscrivono la prestazione già registrata. Eseguire anche `node tests/adaptive.mjs`, che protegge contenuti preesistenti e formule delle nuove domande. Le descrizioni storiche 1–4 non rappresentano la logica corrente. Non promettere benefici di neuroplasticità non misurati.
