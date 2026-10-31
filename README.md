# Knowledge Game — STONA

**STONA** è il nome di lavoro di un videogioco di intuizione e riconoscimento di anomalie. Questa repository conserva sia le decisioni di design sia il prototipo giocabile.

> **Cosa c'è di sbagliato?** Otto elementi, una regola non dichiarata: riconosci ciò che stona, ripara lo schema, scopri il perché.

## Avvio immediato
Aprire **[index.html](index.html)** in un browser moderno, anche senza Internet. Il gioco è single-file: HTML, CSS, JavaScript e catalogo degli enigmi. Non servono account o dipendenze.

## Principi consolidati nella conversazione
- Un **cruciverba dell'intuizione**, non un esame di cultura generale. Puoi sbagliare, chiedere indizi e imparare senza sentirti giudicato.
- Il legame nascosto **non viene annunciato** prima del tentativo.
- Tre passaggi: individuare l'anomalia → proporre una sostituzione → riconoscere la regola. Va distinto **sentire che qualcosa non torna** da **saperne dare una spiegazione**.
- **Intuizione**: il giocatore può dichiarare prima della scelta che sta seguendo l'istinto. L'app registra solo gli esiti dichiarati, senza presentare il valore come misura scientifica.
- Personalizzazione: scelta libera dei settori di interesse, senza test d'ingresso giudicante; in futuro esplorazione guidata di settori nuovi.
- Due progressioni distinte: **XP** cumulativa, mai decrescente, e **padronanza per settore** (stima aggiornata dalle risposte, con incertezza). Non equivale a un indice di intelligenza né alla competenza complessiva della persona.
- Tre stili d'uso: **Relax** (senza pressione), **Esplora** (mappa personale), **Sfida** (obiettivi/competizione, inizialmente individuale).
- Classi con nomi non denigratori: Curioso, Esploratore, Cercatore, Intuitivo, Decifratore, Visionario e successivi.
- Il confronto principale è con i propri progressi; le classifiche competitive sono una modalità **facoltativa**.
- Il sistema deve poter accettare **più soluzioni valide** e distinguere tra regole alternative: non far indovinare l'intenzione dell'autore.

## I primi otto domini
**Numeri · Parole · Natura · Cucina · Geografia · Calcio · Cinema · Musica**.

Sono scelti per coprire sia ragionamento formale sia competenze acquisite nella vita quotidiana e interessi popolari; rappresentano una **ipotesi iniziale da testare**, non un risultato di ricerca quantitativa.

## Stato
**Prototipo α, 31 ottobre 2026.** Catalogo previsto per questa versione: **48 enigmi / 8 domini** (6 per dominio), livelli editoriali 1–5; selezione di interessi; sessioni da dieci; due indizi; intuizione; XP; padronanza; salvataggio sul dispositivo. Una verifica funzionale del percorso numerico originale è stata eseguita in browser Chromium, ma **non** sostituisce collaudo completo o validazione editoriale di tutti gli enigmi.

## Documentazione
- [Visione e game design](docs/GAME_DESIGN.md)
- [Analisi dei domini e piano editoriale](docs/DOMAINS.md)
- [Stato tecnico, limiti, test e roadmap](docs/PROTOTYPE_STATUS.md)

## Confini importanti
STONA è un gioco di intrattenimento con elementi educativi. **Non misura il QI**, non permette conclusioni cliniche, non dichiara un incremento dell'intelligenza generale e non definisce il valore di una persona. Evitare classifiche pubbliche senza consenso. Il prototipo salva i progressi nel `localStorage` del browser: non sincronizza dati fra dispositivi.

**Diritti:** la pubblicazione del codice in questo repository non implica concessione di licenze d'uso ulteriori.
