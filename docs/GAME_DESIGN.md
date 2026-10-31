# STONA — Game Design Document (GDD) v0.1
**Data:** 31 ottobre 2026 · **Stato:** concept consolidato + prototipo α · **Lingua iniziale:** italiano

## 1. Visione e posizionamento
STONA / Knowledge Game è un videogioco di **riconoscimento di anomalie con regola nascosta**. La domanda centrale è sempre: **«Cosa c'è di sbagliato?»**. Il giocatore sente che una sequenza è incoerente, ne individua l'elemento fuori posto, suggerisce un sostituto e, se vuole, prova a spiegare la relazione. Il gioco deve essere piacevole in cinque minuti come un cruciverba, ma abbastanza profondo da accompagnare anni di esplorazione.

**Promessa creativa:** «Scopri quanto conosci davvero ciò che credi di conoscere». Non si promette di misurare o aumentare il QI.

### Esperienza emotiva desiderata
1. **Stupore iniziale** — La sequenza sembra quasi coerente, ma qualcosa stona.
2. **Soddisfazione intuitiva** — «Questo elemento non va», talvolta prima di saperne spiegare il motivo.
3. **Comprensione** — Collegamento e correzione diventano chiari; l'errore non è una sconfitta.
4. **Scoperta personale** — Il giocatore accumula esperienza e comprende quali ambiti gli risultano più familiari.

## 2. Regola di base (core loop)
**Input:** generalmente 8 elementi (numeri, nomi, immagini, suoni, parole, oggetti), di cui 7 coerenti con una relazione nascosta e almeno 1 che ne rompe la struttura.

**Passaggi**
- **Osserva**: il dominio può essere suggerito dal percorso scelto, ma la relazione specifica NON è anticipata.
- **Individua**: scegli ciò che stona. Se due elementi sono equivalenti come anomalie, entrambi sono accettati.
- **Ripara**: scegli o scrivi un sostituto valido; più sostituzioni possono essere corretti.
- **Spiega/Scopri**: proponi la regola o sceglila fra opzioni; è possibile chiedere spiegazione.
- **Riflessione**: mostra perché gli altri elementi sono coerenti, che cosa ha cambiato la risposta e un elemento nuovo appreso.
- **Progressione**: aggiunge XP la prima volta che viene affrontato il contenuto; aggiorna il profilo di prestazione.

**Esempio fondativo**: `3, 2, 6, 4, 5, 7, 9, 5`. Ci sono due `5` e manca `8`; uno qualunque dei due `5` può essere sostituito da `8` per ottenere esattamente l'insieme delle cifre 2–9, una volta ciascuna. L'ordine non è la regola; non va imposto di selezionare il primo o il secondo `5`.

## 3. Accessibilità senza infantilizzazione
Il gioco **non chiede titoli di studio**, non usa appellativi come «ignorante», «principiante scarso» o «genio» e non usa graduatorie come giudizio generale sulla persona.

- Sessioni brevi (es. 10 enigmi), con possibilità di interrompere.
- Domini quotidiani e popolari accanto a quelli specialistici.
- **Indizi progressivi**, due nel prototipo: prima orientamento generale, poi aiuto concreto.
- Soluzione spiegata sempre accessibile; scoprirla equivale a imparare.
- Esplorazione di altri quesiti invece di blocco sulla domanda.
- Nessun tempo limite nella modalità relax; opzioni di velocità solo volontarie.
- Tono preciso, adulto, incoraggiante, **non paternalistico**; mai «sei meno intelligente».
- UI accessibile su smartphone, testo leggibile e target touch adeguati; in futuro screen-reader, preferenze di contrasto, tastiera e audio.

## 4. Tre stili d'uso, stessa logica
**Relax**: nessun timer, nessuna classifica; attenzione alla scoperta e al piacere della soluzione.

**Esplora**: mappa delle prestazioni per settore, scoperta di ambiti nuovi, cronologia dei progressi.

**Sfida**: obiettivi opzionali, bonus per soluzione completa senza indizi, eventuali amici/tornei con classifiche **solo per chi sceglie di partecipare**. Non equiparare risultati fra contenuti di difficoltà differente senza calibrazione.

## 5. Personalizzazione
L'utente seleziona interessi iniziali (uno o più fra otto settori). Non è un'ammissione di competenza e la scelta è modificabile. Il motore usa:
- interessi dichiarati;
- storico osservabile di risposte, aiuti ed errori;
- complessità/difficoltà dell'enigma;
- preferenza di esplorazione o sfida;
- ricorrenza degli enigmi già visti, per evitare punti ripetuti.

**Strategia iniziale:** offrire enigmi familiari per agganciare l'utente e introdurre gradualmente sfide di scoperta fuori dagli interessi dichiarati. La personalizzazione non deve rinchiudere il giocatore in una bolla di soli argomenti già conosciuti.

## 6. Due progressioni distinte
### 6.1 Esperienza (XP), cumulativa
Valorizza attività nuove, correzioni e comprensione; aumenta nel tempo, **non diminuisce**. Nel prototipo:
- +10 XP individuando correttamente l'anomalia;
- +10 XP per la correzione;
- +10 XP per la regola;
- +5 XP per intuizione dichiarata e corretta;
- +5 XP per individuazione senza indizi;
- +5 XP nella modalità Sfida solo per soluzione completa senza indizi;
- +4 XP se si scopre la soluzione senza risolverla;
- **0 XP** ripetendo un enigma già contabilizzato (anti-farming).

Queste soglie sono **parametri di test**. Non devono essere pubblicizzate come psicometricamente validate.

### 6.2 Padronanza per settore, variabile
Valore indicativo 0–100 per dominio. Nel prototipo si basa sulla qualità delle ultime 15 prove del settore con un prior iniziale (3 prove fittizie equivalenti a punteggio 45). Peso a individuazione/correzione/spiegazione, errori, indizi e difficoltà. **Non è una metrica scientifica di abilità o conoscenza reale:** pochi dati producono una stima poco affidabile.

**Da progettare per la release:** affidabilità/ampiezza del campione, prove di controllo non ripetute, indici di confidenza e comprensibilità della formula. Mostrare «padronanza stimata nel gioco», non «intelligenza: 78».

## 7. Intuizione, l'elemento differenziante
Interazione dedicata: prima di scegliere, il giocatore può dichiarare **«Lo sento d'istinto»**. Si registra:
- numero delle intuizioni dichiarate;
- numero e percentuale corrette;
- differenza tra identificazione e spiegazione;
- necessità di indizi;
- progressione nel tempo.

Non basta l'accuratezza: in futuro confrontare **intuizione dichiarata + incertezza dichiarata**, senza assimilare il tutto a fenomeni paranormali o a una misura del pensiero inconscio. Nel prototipo la statistica conta le intuizioni dichiarate e corrette.

## 8. Livelli, classi e tono
**Classi trasversali XP** (nomi non denigratori): Curioso → Esploratore → Cercatore → Intuitivo → Decifratore → Visionario → Cartografo → Maestro degli schemi. Questi titoli riconoscono l'attività, non certificano abilità.

**12 gradi di difficoltà aspirazionali**:
1. intruso visivamente/semanticamente evidente;
2. categoria condivisa semplice;
3. sequenza aritmetica nota;
4. caratteristica linguistica osservabile;
5. memoria culturale popolare;
6. eccezione fra caratteristiche sovrapposte;
7. vincolo temporale o relazionale;
8. relazione composita;
9. conoscenza settoriale specialistica;
10. indizi incrociati fra due domini;
11. inferenza con più passaggi e falsi candidati;
12. schema profondo, verificabile con spiegazione non ambigua.

**Attuazione α:** gli enigmi sono etichettati editorialmente 1–4 (scala interna prevista 1–5); non esiste ancora calibrazione empirica dei 12 gradi. I nomi dei livelli e il calcolo effettivo verranno raffinati su dati anonimi/consensuali e test umani.

## 9. Scelta del contenuto e soluzione non ambigua
Ogni enigma ha una **specifica verificabile**:
- `domain`: settore;
- `items`: esattamente 8 elementi;
- `wrong`: insieme delle posizioni accettabili (indice 0-based);
- `correct`: sostituzione campione (nella α è una sola);
- `rule`: regola dichiarabile;
- `choices`: opzioni per la sostituzione;
- `hints`: aiuto progressivo;
- `why`: spiegazione;
- `ordered`: preserva l'ordine quando è essenziale.

**Regola di qualità fondamentale:** tutti gli elementi non anomali devono soddisfare la regola; la sostituzione deve rispettarla; tutte le risposte alternative ragionevoli vanno gestite o il quesito va riscritto. In futuro il formato supporterà `acceptedReplacements` e `alternativeRules`, con revisione umana.

**Generazione AI** eventualmente assistita: generatore → verifica fattuale o simbolica → ricerca di interpretazioni concorrenti → revisione editoriale → playtest → pubblicazione. La generazione automatica da sola non è sufficiente.

## 10. Mappa personale e relazione con i social
Ogni dominio ha XP e padronanza; mostrare più avanti:
- «Prima avevi bisogno di 2 indizi, oggi no» (solo se stesso livello di difficoltà/contenuti comparabili).
- Aree di familiarità dichiarata vs osservata: uno spunto di autoscoperta, non una valutazione di identità o ruolo sociale.
- «Nuovo territorio» per favorire curiosità, non competizione sociale obbligatoria.

La gratificazione deriva da **progressi reali** e da scoperta, senza fingere miglioramenti che i dati non dimostrano.

## 11. Etica, privacy e comunicazione
- Nessuna inferenza su QI, diagnosi, salute mentale o capacità globale.
- Selezioni di interessi e mappa non sono un «profilo della persona» scientificamente valido.
- Evitare dark pattern, streak punitivi e confronti denigratori.
- Preferire salvataggio locale, cancellazione visibile, esportazione dati e sincronizzazione solo su consenso.
- Se in futuro sono previste classifiche tra minori, definire protezioni dedicate prima del lancio.
- Localizzazione dei quesiti per lingua/cultura; non penalizzare per competenze non presenti nel contesto dell'utente.

## 12. Obiettivo del primo playtest
Verificare se persone con istruzione, interessi ed età differenti trovano gratificante riconoscere l'anomalia, se gli indizi consentono di restare nel gioco e se l'utente desidera continuare **anche quando non conosce una risposta**.

**Metriche da sperimentare:** sessioni completate, ritorno volontario, tasso di indizio, anomalie individuate, tempi auto-riferiti, abbandoni, ambiguità contestate, soddisfazione dopo un errore. Non pubblicare risultati senza campioni adeguati.

## 13. Decisioni aperte
Brand definitivo (STONA nome provvisorio), piattaforme e distribuzione, classifiche, forme di remunerazione, regole multiple, audio/immagini, sistema di editing contenuti, account opzionali e revisione legale del nome.

Vedi [DOMAINS.md](DOMAINS.md) e [PROTOTYPE_STATUS.md](PROTOTYPE_STATUS.md).
