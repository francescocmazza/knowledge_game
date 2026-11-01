# Stona Kids — alpha 0.4

**320 quesiti · 8 temi · 10 livelli · 8–14 anni.**

[Apri Stona Kids](https://francescocmazza.github.io/knowledge_game/kids/). Gioco immediato come ospite, senza installazione o registrazione obbligatoria. Temi: Numeri e logica, Parole, Animali e natura, Pianeta Terra, Spazio, Sport, Musica, Among Us. Ogni tema ha 40 domande, quattro per difficoltà.

## Ritmo e difficoltà

Il livello del percorso è distinto da quello della domanda. A livello 6 il piano base su dieci proposte è 4, 5, 6, 4, 5, 7, 4, 5, 6, 4. Dopo una sfida c’è spazio per consolidare. Confini della scala, recuperi e disponibilità possono modificare la distribuzione. «Più tranquillo» evita le anticipazioni sopra il livello scelto.

I recuperi dopo una domanda faticosa non abbassano il livello né tolgono punti. Risposte complete e corrette almeno al livello scelto danno stelle, con avanzamento più rapido se veloci. Il tempo di riferimento Kids è 60 secondi +5 per ogni difficoltà oltre 1: nessun conto alla rovescia. Anche chi risponde lentamente può raggiungere il livello 10.

Le figure rappresentano oggetti o dati specifici; niente ABC generico nelle risposte. Conteggi, orologi, pianeti, missioni e registri hanno disegni leggibili e testo accessibile. I nuovi livelli avanzati comprendono relazioni e registri con più condizioni; i dati inventati sono esplicitamente segnalati. Le difficoltà sono stime editoriali da verificare con bambini e ragazzi reali, non etichette scientificamente calibrate.

## Saltare, identità e classifica

«Salta domanda» è illimitato e senza penalità. Non dà XP, non conta come errore o completamento e rinvia il quesito per la sessione. I due motivi facoltativi successivi aiutano a distinguere difficoltà e disinteresse. Gli XP restano attribuiti solo al tema del quesito effettivamente giocato.

Dopo 5 domande distinte completate si può scegliere un soprannome, dopo 7 si può creare un profilo: nessun obbligo, email o nome reale. Gli inviti declinati non si ripetono. Il profilo con password si può esportare in JSON cifrato e importare su un altro computer. Non c’è sincronizzazione automatica o recupero via email.

La classifica facoltativa confronta i profili dello **stesso browser/dispositivo**; è separata dal classico, con podio e filtri per tema. Non è una classifica globale online.

## Feedback per i playtest

Il gioco conserva localmente tempi attivi, aiuti ed esiti. Da Il mio profilo si può esportare un report di test senza soprannome o password; chi organizza i test può importare più report della stessa edizione. Servono almeno 8 codici giocatore distinti, di cui 4 vicini alla difficoltà della domanda, prima di correggere una stima. Salti neutri e ripassi non la alterano automaticamente. Nessun invio automatico dei dati.

Specifica, parametri, procedura per gli aggregati e limiti: [ADAPTIVE_RHYTHM.md](../docs/ADAPTIVE_RHYTHM.md). Non sono stati misurati effetti del gioco sulla neuroplasticità.

## Isolamento e distribuzione

Storage `stona-kids-profiles-v1`, backup `stona-kids-profile`, coorte di test `stona-kids-playtest-v2`. Non leggere o migrare i dati degli adulti. I formati dei profili e dei report rifiutano l’altra edizione. I salvataggi precedenti mantengono XP e identità; scala acquisita 1/2/3/4 → 1/4/7/10.

Il tema Among Us contiene missioni originali ispirate al gioco, senza affiliazione a Innersloth; non richiede un account e non descrive una vera partita. Per giocare bastano gli indizi mostrati.

Le fonti sono `data/catalog-kids.json` e il motore condiviso. Dopo le modifiche: `node scripts/build-adaptive.mjs`. Verificare `node tests/kids.mjs`, `node tests/profiles.mjs kids/index.html`, `node tests/scoring-and-skips.mjs`, `node tests/engagement.mjs` e `node tests/adaptive.mjs`, oltre ai controlli del classico. Il workflow pubblica entrambi gli HTML su GitHub Pages.
