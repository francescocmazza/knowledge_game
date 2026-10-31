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
