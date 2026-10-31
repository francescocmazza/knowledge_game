# STONA α — Stato del prototipo, test e roadmap
**Data:** 31 ottobre 2026
**Repository:** francescocmazza/knowledge_game
**Artefatto:** [index.html](../index.html), eseguibile in un browser senza installazione

## 1. Cosa è stato realmente implementato
| Componente | Stato α | Note |
|---|---|---|
| Interfaccia responsive | Implementata | Desktop e smartphone, nessuna dipendenza esterna |
| Onboarding per interessi | Implementato | 8 domini selezionabili e modificabili |
| Primo gioco numerico | Implementato | 2 posizioni valide per il 5 duplicato; sostituzione 8 |
| Catalogo di enigmi | Implementato | 48 enigmi strutturati, 6 per ognuno di 8 domini |
| Individualizzazione iniziale | Implementata, euristica | Preferisce argomenti scelti e livelli iniziali facili |
| Tre fasi per quesito | Implementate | Intruso → correzione a opzioni → regola a opzioni |
| Modalità Intuizione | Implementata | Dichiarazione esplicita prima della scelta, conteggio successi |
| Indizi progressivi | Implementati | Due testi per enigma |
| Modalità Relax/Esplora/Sfida | Interfaccia implementata | Distinte soprattutto nel messaggio e nel bonus XP; no vera competizione |
| Sessioni | Implementate | 10 sfide, riepilogo e riavvio |
| XP e ranghi | Implementati | XP da enigmi inediti, soglie predefinite |
| Padronanza per dominio | Implementata, sperimentale | Formula euristica su ultime 15 prove per settore con prior |
| Mappa delle competenze | Implementata | Valori e progressi per dominio; non diagnostici |
| Persistenza | Implementata | localStorage del singolo browser/dispositivo |
| Spiegazione della risposta | Implementata | Regola e motivazione mostrate |
| Classifica online e multiplayer | NON implementati | Decisione di prodotto futura |
| Generazione automatica dei quesiti | NON implementata | Richiede controlli oggettivi e revisione umana |
| Validazione di soluzioni libere multiple | Solo parziale | Posizioni multiple sì; sostituzione attraverso una risposta campione |
| Sonoro, immagini, gamification sociale | NON implementati | Backlog |
| Account, sync, API, backend | NON implementati | Gioco offline single-file |
| Distribuzione App Store / Play Store | NON implementata | Prototype browser soltanto |

## 2. Architettura attuale
- **File unico `index.html`**: CSS incorporato; catalogo JSON nel tag `<script id="stona-data" type="application/json">`; logica JavaScript incorporata.
- **Stato in browser** tramite localStorage (`stona-alpha-v1`). Non è un database, la cancellazione dei dati del sito elimina i progressi.
- **Nessuna dipendenza di rete** o framework necessaria per utilizzare il prototipo.
- Il catalogo contiene oggetti `id, domain, level, items, wrong, correct, choices, rule, hints, why, ordered`.
- In `wrong` le posizioni sono indicizzate da **0**. L'ordine dei tasselli viene mescolato se `ordered=false`, preservando l'indice originale per la verifica.

### Scelta del quesito
1. Filtra i domini selezionati.
2. Preferisce gli enigmi non completati.
3. Nel primo turno, se si è selezionato Numeri, presenta `numeri-01`.
4. Assegna pesi maggiori ai livelli vicini al target euristico calcolato sullo storico.
5. Quando tutti gli enigmi idonei sono stati completati, li permette in modalità replay senza nuovi XP.

**Limite:** il target non è un sistema di item response theory (IRT); non garantisce un tasso reale di successo o un confronto standardizzato fra giocatori.

## 3. Progressione implementata
- XP dalla soluzione del singolo enigma la **prima volta**; nessun farming da replay.
- Ranghi non giudicanti: Curioso, Esploratore, Cercatore, Intuitivo, Decifratore, Visionario, Cartografo, Maestro degli schemi.
- Padronanza: media pesata su massimo 15 prove recenti con un prior tecnico di 3 pseudo-prove a qualità 45/100. Con poche risposte è un numero **instabile e non validato**; la grafica non deve far credere che quantifichi la persona.
- Intuizione dichiarata: contata solo se attivata prima dell'identificazione e se l'anomalia è stata individuata correttamente.

## 4. Test eseguiti e cosa NON dimostrano
**Smoke test locale Chromium (headless) del percorso fondativo:** onboarding → inizio partita → due caselle da `5` nel primo quesito → attivazione Intuizione → selezione di uno dei `5` → sostituzione con `8` → selezione regola corretta → schermata risultato → quesito successivo → mappa. Nessun errore JavaScript riferito dal browser nel percorso eseguito.

**Controlli strutturali del catalogo:** 48 item, otto domini, otto tasselli per enigma, opzioni di correzione coerenti come formato, risposta campione presente nelle scelte, due indizi per domanda.

**Non ancora eseguiti:** verifica indipendente di ogni fatto, test con utenti reali, audit WCAG, test cross-browser sistematico, test di reattività su dispositivi reali, test di sicurezza e privacy di un'eventuale infrastruttura online, calcolo di accuratezza per fasce di difficoltà.

## 5. Priorità organizzate per tranche
### Fase 1 — qualità del core
1. **Validazione editoriale** dei 48 quesiti con registro fonti, regole alternative e motivazioni.
2. Eliminare gli enigmi in cui più di una regola concorrente plausibile rende la risposta indeterminata.
3. Supportare **più sostituzioni corrette** e facoltativamente input libero verificato.
4. Differenziare nettamente «lo sentivo» da un tentativo casuale: dichiarazione preliminare + livello di confidenza.
5. Migliorare accessibilità: navigazione tastiera, focus, annunci screen-reader, contrasto, riduzione del movimento.
6. Test UX su persone con livelli di familiarità culturale diversi.

### Fase 2 — progressione fedele all'esperienza
1. Esplicitare il numero di prove dietro ogni percentuale.
2. Calibrare la difficoltà osservata e aggiungere prove di controllo inedite.
3. Benchmark contro sé stessi **a parità di difficoltà** e con ridotto effetto memorizzazione.
4. Curva di crescita che evita frustrazione senza falsificare la padronanza.
5. Esplorazione oltre gli interessi dichiarati.

### Fase 3 — formato videogioco
1. Animazioni e identità grafica, senza compromettere leggibilità.
2. Immagini, audio, oggetti e sequenze miste.
3. Nuove forme di anomalia, non solo classificazioni 7+1.
4. Prime otto aree → venti, con pipeline editoriale.
5. Profili facoltativi, sincronizzazione e classifiche consensuali.
6. App mobile o PWA offline; distribuzione da valutare.

## 6. Problemi, rischi e debiti tecnici
- Nel quiz α la correzione è una sola opzione codificata, **non** un insieme di sostituzioni libere accettate.
- Le risposte multiple dell'esempio numerico sono solo per le posizioni dei due `5`.
- Le regole secondarie vengono selezionate da altri quiz dello stesso settore e possono essere troppo riconoscibili o poco pertinenti come distrattori.
- L'attuale ordine della difficoltà è autoriale, non empirico; i domini specialistici possono risultare troppo facili o troppo difficili per persone differenti.
- Nel lessico della UI «padronanza» deve rimanere una stima di prestazione interna al gioco.
- Le sei prove per settore sono insufficienti per trend affidabili.
- `localStorage` non offre sincronizzazione, backup o protezioni di sicurezza forti per dati sensibili: **non archiviare dati sensibili**.

## 7. Come usarlo
- Scaricare `index.html` e aprirlo in Chrome, Edge, Firefox o Safari moderno.
- Selezionare interessi; se si seleziona Numeri, il primo enigma sarà l'esempio originale.
- Per ispezionare/azzerare i progressi, usare la mappa e la funzione presente nell'interfaccia.
- È un prototipo locale: un repository GitHub con `index.html` **non significa** che esista già un sito pubblicato tramite GitHub Pages.

## 8. Definizione di «MVP pronto per utenti esterni»
Considerarlo raggiunto quando: catalogo ≥ 250 enigmi verificati, almeno 5 domini coperti adeguatamente, sessioni senza arresti, mobile accessibile, soluzioni valide alternative gestite, feedback positivo anche sugli errori, padronanza con attendibilità esplicitata e ritorno spontaneo misurato in playtest. I numeri sono **obiettivi di progetto**, non traguardi già completati.
