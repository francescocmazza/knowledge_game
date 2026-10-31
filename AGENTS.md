# Knowledge Game / STONA — guida per chi continua il progetto

## Punto di partenza
- Leggi **README.md**, poi **docs/GAME_DESIGN.md**, **docs/DOMAINS.md** e **docs/PROTOTYPE_STATUS.md** prima di modificare meccaniche, tono, punteggi o catalogo.
- Il gioco si chiama **STONA** (nome provvisorio), repository **Knowledge Game**.
- Il prototipo funzionante è **index.html**, file unico offline con CSS, dati JSON e JavaScript.
- Catalogo attuale **96 enigmi, 8 settori**, 12 ciascuno (alpha 0.2). Non attribuire alla scelta degli otto una validazione scientifica o statistica che non esiste.

## Invarianti del prodotto
1. La domanda è «Cosa c'è di sbagliato?»; **non rivelare la regola** prima del tentativo.
2. Tre livelli della soluzione: **individuazione**, **riparazione**, **spiegazione**.
3. Supportare più posizioni/risposte valide quando il problema lo richiede; non penalizzare interpretazioni plausibili senza motivazione.
4. Accessibilità da cruciverba: indizi, passaggio ad altri enigmi, possibilità di scoprire la soluzione senza vergogna o linguaggio denigratorio.
5. **XP crescente e padronanza per settore distinte**. La padronanza è una stima di performance nel gioco, **non QI** o misura della persona.
6. Modalità **Intuizione**: dichiarazione volontaria prima di indicare l'intruso.
7. Personalizzazione dagli interessi, senza imporre segmentazioni educative o sociali.
8. Le competizioni sono **facoltative**, e il confronto con se stessi è centrale.
9. Nessuna falsa affermazione di crescita intellettiva generalizzata; mostrare progressi verificabili su prove comparabili.
10. Non aggiungere dipendenze esterne, raccolta dati, account o pubblicazione online senza necessità e decisione esplicita.

## Procedure prima di ogni modifica
- Verificare il formato dei dati JSON di `index.html`.
- Eseguire `node tests/catalog.mjs`, `node tests/content.mjs` e `node tests/profiles.mjs` (Node 22+), preservando i test esistenti.
- Quando si cambia il catalogo, aggiornare numeri nei documenti e nei testi UI.
- Se si aggiunge un enigma: verificare tutti i sette elementi coerenti, l'intruso, ogni correzione ammessa, due indizi progressivi, spiegazione e contesto fattuale.
- Alzare la difficoltà senza confondere **familiarità culturale** con **complessità cognitiva**.
- Annotare i test eseguiti effettivamente; non dichiarare test o release non eseguiti.

## Prossimi interventi prioritari
1. Gestione sostituzioni multiple e interpretazioni alternative.
2. Test editoriale e umano dei 96 enigmi.
3. Misura affidabilità della padronanza, indicatori con campione insufficiente.
4. Accessibilità e stress test mobile.
5. Nuove tipologie (visuale, audio, relazioni incrociate) e piano 20 domini.

## Fonte della verità
Se un riepilogo conversazionale è in conflitto con codice e documentazione versionata, controllare il repository, distinguere piano da implementazione e documentare la correzione.


## Alpha 0.2 autorizzata
Accesso ospite immediato; profili opzionali locali cifrati, export/import JSON, GitHub Pages esplicitamente richiesti. Leggere anche docs/PROFILES.md. Non scrivere dati utente né credenziali nel repository. Per la distribuzione: .github/workflows/pages.yml.
