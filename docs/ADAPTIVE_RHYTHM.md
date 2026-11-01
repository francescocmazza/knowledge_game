# Ritmo adattivo e difficoltà 1–10

Versione: STONA alpha 0.6 / Kids alpha 0.4. Specifica implementata, inizialmente sperimentale.

## Obiettivo di gioco

Alternare soddisfazione, varietà e sfida, senza trasformare ogni sessione in un esame al limite delle capacità. Il livello raggiunto dal giocatore è distinto dalla difficoltà della singola domanda. Un giocatore di livello 10 continua a incontrare proposte di livello 8 e 9. Il ritmo è una politica di intrattenimento modificabile, non una formula scientificamente validata.

Ogni edizione ha **320 quesiti, 8 temi, 10 livelli, 4 quesiti per tema e livello**. I 128 precedenti sono conservati nei contenuti e negli ID. Sono aggiunte 192 istanze di logica verificabile: conteggi, sequenze e registri tematici con relazioni progressivamente composte. Le istanze parametrizzate non equivalgono a 192 meccaniche nuove. I registri dichiarano esplicitamente quando i dati sono inventati; i registri Among Us non descrivono regole o partite reali del videogioco.

## Piano di dieci proposte

Per un livello del percorso `L`, il piano equilibrato usa questi scarti:

```json
[-2, -1, 0, -2, -1, 1, -2, -1, 0, -2]
```

| Difficoltà relativa | Numero su 10 | A livello 6 |
| --- | ---: | ---: |
| L − 2: respiro e consolidamento | 4 | 4 domande di livello 4 |
| L − 1: collegamenti familiari | 3 | 3 domande di livello 5 |
| L: sfida ordinaria | 2 | 2 domande di livello 6 |
| L + 1: piccola anticipazione | 1 | 1 domanda di livello 7 |

La sequenza dell’esempio è **4, 5, 6, 4, 5, 7, 4, 5, 6, 4**. Dopo ogni proposta al livello del giocatore o superiore torna una proposta più semplice. La prima domanda del nuovo giocatore resta introduttiva.

Si contano dieci **proposte**, inclusi i salti: un salto avanza il piano, ma non XP, stelle, storico delle soluzioni, inviti 5/7 o conteggio della sessione. La sessione continua a comprendere dieci completamenti. Il cursore del piano persiste tra sessioni e ricaricamenti, senza ricominciare sempre dagli stessi ruoli.

I valori sono limitati fra 1 e 10: al livello 1 molte proposte coincidono con 1; al livello 10 l’anticipazione diventa un’ulteriore domanda di livello 10. Il ritmo **Più tranquillo** limita le anticipazioni al livello scelto. Si può tornare manualmente a un livello del percorso già aperto.

Il piano descrive un blocco a livello stabile. Promozioni, recuperi, scarsità di contenuti, interessi o tema singolo possono modificare la distribuzione effettiva. Non viene presentato come una quota garantita in ogni sessione reale.

## Scelta del quesito e varietà

1. Applicare tema scelto o interessi di Misto, escludendo tutti i quesiti rinviati nella sessione.
2. Limitare la difficoltà stimata al livello scelto +1 (oppure al livello scelto nel ritmo tranquillo).
3. Cercare la difficoltà più vicina allo slot del piano; a pari distanza non introdurre livelli oltre il limite.
4. Preferire quesiti mai completati a quella difficoltà, poi quelli assenti dalle ultime 20 proposte.
5. Quando ci sono candidati equivalenti, evitare più di due temi uguali e più di due tipologie uguali consecutive. In tema singolo il vincolo di varietà dei temi non si applica. Se manca una tipologia alternativa allo stesso livello, il vincolo è una preferenza, non una promessa.
6. Sorteggiare tra i candidati rimasti. Se tutto il pool consentito è stato saltato, offrire esplicitamente di riprovare i rinviati o cambiare tema.

Le tipologie editoriali sono quantità, sequenze, categorie, forme delle parole, relazioni e conoscenze. Il tema e la tipologia non sono sinonimi: una missione spaziale può avere una relazione numerica. Il tipo non viene mostrato come indizio alla regola prima del tentativo.

## Recupero e avanzamento

Rivelazione della soluzione, salto indicato come difficile, aiuti/errori o un tempo attivo oltre 1,6 volte il riferimento su una sfida attivano due proposte di recupero a `L − 2`. Un salto neutro non viene trattato come errore o fatica. I recuperi non abbassano il livello acquisito. Le risposte completate consumano il recupero: una persona lenta non può restarci bloccata soltanto perché legge con calma. Tempo elevato nelle domande già più facili, da solo, non riavvia il recupero.

Quattro stelle aprono il livello successivo. Una risposta completa e senza aiuti/errori a difficoltà almeno pari al livello scelto vale una stella; se veloce ne vale due. Il riferimento è 45 secondi +4 per ogni difficoltà oltre 1 negli adulti, 60 +5 in Kids. Non esiste una scadenza e una risposta corretta lenta resta valida.

Le domande di consolidamento danno gli XP previsti alla prima soluzione, ma non fanno avanzare il percorso da sole. I ripassi non danno nuovi XP. Uno stesso ID può dare credito una sola volta nel livello del percorso corrente; un precedente anticipo, risolto a un livello del percorso inferiore, può essere ripassato al livello appropriato. Non può far superare livelli più alti della sua difficoltà. I livelli già acquisiti sono conservati: ricalibrare una domanda non cambia retroattivamente XP o stelle.

La promozione è annunciata esplicitamente. Il messaggio cita velocità solo se rilevata e spiega che il percorso sale mantenendo domande più facili: la domanda immediatamente successiva non deve essere obbligatoriamente più difficile.

## Stima editoriale iniziale

Ogni quesito ha un `level` iniziale, una `kind`, una `revision` e note `rating` sul numero di passaggi e sul carico di memoria. Livelli bassi: conteggio e oggetti familiari; intermedi: ordinamento, proprietà e relazioni; alti: più vincoli e condizioni. La familiarità culturale rimane una dimensione distinta dalla complessità del ragionamento.

Le nuove domande di livello 5–10 usano progressivamente una relazione, quadrati, due relazioni, una condizione pari/dispari e tre relazioni combinate. La plausibilità della scala va verificata con persone reali. La prima assegnazione dei vecchi quesiti è un affinamento editoriale della scala precedente, non una calibrazione empirica. Le scale Kids e adulti non sono intercambiabili.

## Osservazioni raccolte

Durante il gioco si conserva localmente una prova con ID del quesito e sua revisione, codice casuale del giocatore e dell’evento, livello **raggiunto** della persona all’inizio della prova, stima del tema, difficoltà proposta, tempo attivo, esito, indizi, errori e indicatore di ripasso. Il livello scelto manualmente per rilassarsi non fa sembrare un esperto un principiante nell’analisi.

Il timer esclude scheda nascosta, navigazione nel profilo/mappa e modifica degli interessi. Un tentativo abbandonato ricaricando la pagina non viene inventato come risposta errata. I tempi incompleti non vengono uniti ad altri tentativi. Limite locale: 1.500 eventi, conservati nei profili cifrati e nei backup. Non sono richiesti nome reale, email, data di nascita o contatti.

**Salta domanda** resta un clic e senza penalità. Dopo il salto, due pulsanti facoltativi permettono di indicare «Era difficile» o «Non mi interessava». Il motivo può arricchire l’evento già registrato, senza duplicarlo.

## Ricalibrazione empirica

Il motore usa soltanto la prima esposizione conclusa per codice giocatore/quesito. Se è un salto neutro non contribuisce alla correzione; una prova successiva è già un ripasso e resta esclusa per non confondere familiarità con facilità. I ripassi, i tempi sotto 1,2 secondi e quelli oltre 15 minuti non contribuiscono alla stima. Un salto senza motivo o per disinteresse entra nei conteggi dei salti ma non nella correzione di difficoltà. Un salto esplicitamente difficile pesa 0,35 rispetto a una risposta.

Prima di applicare una correzione servono **almeno 8 codici giocatore distinti**, di cui **almeno 4 vicini alla difficoltà editoriale** (distanza massima 1,5 livelli). Questi codici evitano che importare ripetutamente lo stesso file moltiplichi il campione; non certificano che otto account siano otto esseri umani. Il responsabile del playtest deve reclutare persone diverse.

Il livello di riferimento combina 70% livello raggiunto e 30% stima del tema. Il successo atteso è una curva logistica relativa alla difficoltà editoriale; il successo osservato considera soluzione, aiuti ed errori. Un termine di tempo logaritmico rileva anche risposte corrette molto lente. Il residuo è regolarizzato con 12 osservazioni di prior e un guadagno di 3; la correzione è limitata a ±2 livelli dalla base editoriale. I valori continui sono arrotondati per la selezione. La formula esatta è in `src/adaptive-core.mjs` e i parametri sono in `config/gameplay.json`.

Risposte molto facili/veloci di giocatori comparabili possono abbassare la difficoltà; fatica, rivelazioni e tempi molto lunghi possono alzarla. Soli esperti molto sopra il livello della domanda non bastano a declassificarla. Il livello del giocatore e la sua storia restano congelati al momento della prova: una successiva promozione non riscrive il contesto passato.

Il risultato si chiama **stima sperimentale**, non difficoltà oggettiva assoluta o misura dell’intelligenza. Tempi di lettura, dispositivo, conoscenze, accessibilità, distrazioni e selezione volontaria del campione possono confondere il risultato. Soglie e pesi sono ipotesi di lavoro da rivedere.

Se una domanda cambia nei contenuti, incrementare `revision`: le prove e le stime aggregate di revisioni precedenti non la ricalibrano. L’ID resta per preservare i vecchi XP.

## Feedback tra dispositivi e release

Questa alpha su GitHub Pages **non ha un server di telemetria**. Non invia automaticamente dati. In **Il mio profilo → Aiutaci a migliorare il ritmo** il giocatore può esportare un report JSON senza soprannome o password. Il codice casuale è pseudonimo, non una garanzia di anonimato assoluto. Il file del profilo cifrato e il report di test sono due cose diverse.

Chi organizza i test può importare report della stessa edizione nella propria interfaccia. I dati importati restano nel browser, sono deduplicati per evento e producono stime locali quando il campione basta. Un report della versione Kids non viene accettato dal classico e viceversa. Le osservazioni delle versioni precedenti del catalogo o di una revisione incompatibile non vengono usate.

Per distribuire una stima condivisa a tutti i giocatori, il curatore esegue:

```sh
node scripts/calibrate.mjs --edition classic --output config/calibration-classic.json /percorso/report-uno.json /percorso/report-due.json
node scripts/calibrate.mjs --edition kids --output config/calibration-kids.json /percorso/report-kids.json
node scripts/build-adaptive.mjs
node tests/adaptive.mjs
```

I report devono restare fuori dal repository pubblico. Lo script pubblica **solo aggregati per domanda sufficientemente campionata**, senza codici dei giocatori, eventi o tempi individuali. I file di calibrazione di questa release sono inizialmente vuoti: non esistono dati reali inventati. Le stime aggiornate entrano nella normale pubblicazione GitHub Pages. Una stima locale con meno osservazioni non sovrascrive un aggregato condiviso più ampio. I report non sincronizzano automaticamente dispositivi o account.

## Modificare la logica

| Fonte | Cosa cambiare |
| --- | --- |
| `config/gameplay.json` | Ordine/frequenza delle difficoltà, recupero, soglie di tempo e stelle, numerosità e pesi della calibrazione |
| `data/catalog-classic.json`, `data/catalog-kids.json` | Quesiti, difficoltà editoriali, tipologie, revisioni e verifiche delle nuove relazioni |
| `src/adaptive-core.mjs` | Selezione e stima, condivise da interfaccia, CLI e test |
| `src/adaptive-app.js` | Raccolta locale, esportazione/importazione e testo dei controlli |
| `config/calibration-*.json` | Aggregati empirici approvati per la release |

Dopo ogni modifica eseguire `node scripts/build-adaptive.mjs`: incorpora le fonti nei due HTML autonomi. Il gioco resta senza installazione o dipendenze esterne. La CI rigenera e verifica che gli HTML pubblicati siano aggiornati, poi esegue tutte le verifiche.

## Obiettivo cognitivo e limiti delle promesse

Il progetto mira a stimolare osservazione, attenzione e ragionamento attraverso un’attività piacevole. Non ha misurato effetti sulla neuroplasticità né dimostrato benefici cognitivi generali. Migliorare nel gioco non dimostra automaticamente un trasferimento ad altre attività. Un ampio studio primario sul brain training ha osservato miglioramenti nei compiti allenati senza evidenza di trasferimento ai compiti non allenati: Owen et al., Nature 2010, [doi:10.1038/nature09042](https://www.nature.com/articles/nature09042). Questa fonte giustifica prudenza nelle promesse; non valida la nostra politica 4/3/2/1, che va collaudata come scelta di game design.

## Verifiche implementate

`tests/adaptive.mjs` controlla 320 quesiti per edizione, copertura di tutti i temi/livelli, vincoli delle nuove sequenze e relazioni, distrattori, integrità dei 128 contenuti precedenti, piano 4/3/2/1 anche su tema singolo, recupero, progressione lenta/veloce fino a 10, trasferimento del feedback nei profili, soglie di campione, contesto del giocatore, direzioni di riclassificazione, tempi, salti neutri, ripassi, deduplicazione, revisioni e pipeline degli aggregati. Gli altri test coprono profili, inviti, classifiche locali, punteggi e salti.
