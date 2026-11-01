# Stona Kids — alpha 0.2

Versione autonoma di STONA per la fascia 8–14 anni, pubblicata a `/knowledge_game/kids/`. Si apre dal browser senza installazione, senza email e senza registrazione obbligatoria. Non è una divisione rigida per età: il primo livello è accessibile e i successivi introducono collegamenti più articolati. La taratura sulla fascia d’età è progettuale, da verificare con playtest reali.

## Otto temi

Numeri e logica · Parole · Animali e natura · Pianeta Terra · Spazio · Sport · Musica · Among Us.

128 enigmi totali, 16 per tema, quattro per ciascuno dei quattro livelli. I contenuti di STONA classico riutilizzati sono stati selezionati/adattati; il catalogo Kids ha ID propri nel suo namespace. Sport, Spazio e Among Us hanno ciascuno 16 mini-enigmi preparati per questa versione. Le parole specialistiche hanno spiegazioni e due indizi; nessun timer blocca la risposta.

## Progressione

Primi passi → Caccia agli indizi → Connessioni → Super sfide. Una soluzione completa senza errori o indizi vale una stella, due se data entro 60 secondi di gioco attivo. Quattro stelle uniche nello stesso livello aprono il successivo. Anche rispondendo con calma si avanza. Un ripasso può recuperare stelle non ottenute in precedenza, senza duplicare XP. La navigazione in altre sezioni e il tempo con scheda nascosta non contano. La soglia di 60 secondi è un parametro di alpha, non una misura delle capacità del bambino.

## Tema speciale Among Us

Mini-missioni originali con colori di tute, compiti, schede, collegamenti, pannelli e registri di bordo. I registri sono dichiarati inventati, gli indizi sono nei tasselli e non occorre conoscere il videogioco. Nessuna chat, connessione al gioco o installazione di Among Us. Le descrizioni non sono regole di vere partite e non indicano chi sia un impostore reale.

Riferimento fattuale primario: [Among Us — Innersloth](https://www.innersloth.com/games/among-us/), consultato il 1 novembre 2026, per il concetto di equipaggio, compiti e impostori. Il tema è non ufficiale e non affiliato a Innersloth. Nessuna immagine o schermata del gioco è incorporata.

## Profili separati

Solo soprannome, password facoltativa e progressi locali. La UI invita a non inserire nome e cognome. Storage `stona-kids-profiles-v1`, formato di esportazione cifrata `stona-kids-profile`, versione envelope 2. Password e dati non vengono inviati a server. Il motore crittografico è lo stesso di STONA classico (PBKDF2/AES-GCM); i formati sono separati e le due versioni rifiutano reciprocamente i backup. Nessuna lettura o migrazione dei salvataggi classici, neppure legacy. Come nel gioco classico, esportare il file per continuare su un altro dispositivo.

## Icone

Solo corrispondenze pertinenti all’elemento e riconosciute anche in maiuscolo. Nessun simbolo del tema ripetuto automaticamente nelle risposte e nessuna immagine approssimativa. Dove manca un’icona adatta rimane solo il testo.

## Verifiche

- `node tests/kids.mjs`: catalogo e distribuzione, missioni originali, ingresso immediato, livelli, sblocco rapido/lento, separazione dei salvataggi e dei backup, icone pertinenti.
- `node tests/profiles.mjs kids/index.html`: ciclo dei profili e percorso completo delle 128 soluzioni, con Web Crypto nativo in contesti isolati.
- I test classici restano nel workflow, che pubblica entrambe le versioni dopo esito positivo.

I test automatici non sostituiscono la revisione editoriale indipendente, l’audit di accessibilità e la prova con bambini della fascia indicata.

Collaudo UI eseguito in Chromium: pagina iniziale e otto temi, ingresso diretto in Among Us, scelta di Missione 9, correzione in Missione 8, spiegazione corretta, risultato +35 XP e due stelle. Controllata visivamente la pagina iniziale desktop. La cifratura è coperta dai test automatici nativi e richiede HTTPS in browser.

## Domande saltate, temi e notifiche
«Salta domanda» rimanda il quesito senza penalità, stelle, XP, errori o completamento; si può usare più volte anche dopo un tentativo parziale. Se tutti i quesiti attuali sono saltati, l’interfaccia offre di riprovarli o cambiare tema. Nessun riproporsi immediato e nessun blocco definitivo. «Scopri la soluzione» resta distinto.

La mappa mostra XP effettivi per tema (zero per quelli mai giocati), attribuiti tramite ID del catalogo. Il risultato indica il tema: anche una sequenza numerica può essere una missione Among Us. I livelli di difficoltà sono invece globali e non assegnano XP ai temi non giocati. L’avviso di promozione riceve il focus e descrive le risposte veloci soltanto quando il tempo registrato lo giustifica.

`node tests/scoring-and-skips.mjs` verifica entrambe le versioni: sei domande di Numeri senza punti negli altri temi, categorie miste, correzione di etichette discordanti, salto di tutte le domande disponibili senza effetti sui punteggi, salti dopo tentativi parziali, esaurimento e ripresa, messaggi veritieri e progressione dal livello 1 al 4.


## Alpha 0.3
Dopo 5 domande completate si può scegliere un soprannome, dopo 7 si può creare un profilo: nessun obbligo, nessuna email, nessun nome reale richiesto. Le rinunce sono conservate, i salti non contano. Classifica facoltativa separata dal classico, **solo su questo browser/dispositivo**, con podio e filtri per tema. Non è una classifica online tra tutti i bambini.

Più illustrazioni pertinenti: quantità, animali, piante, pianeti, missioni, astronauti colorati, oggetti e diagrammi dei ruoli sportivi. Nel livello iniziale 246 dei 256 tasselli del catalogo hanno una figura; questo conteggio include ripetizioni dello stesso soggetto e non è il numero di immagini uniche. Test aggiuntivo: `node tests/engagement.mjs`.
