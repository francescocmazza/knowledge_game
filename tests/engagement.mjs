import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {webcrypto} from 'node:crypto';
import vm from 'node:vm';
function app(path,storage=new Map()){
 const html=readFileSync(new URL('../'+path,import.meta.url),'utf8');
 const pack=html.match(/<script id="stona-data" type="application\/json">([\s\S]*?)<\/script>/)[1];
 const code=html.match(/<script>\s*('use strict';[\s\S]*?)<\/script>/)[1];
 const handlers={},root={innerHTML:'',addEventListener:(type,fn)=>handlers[type]=fn};
 const c=vm.createContext({crypto:webcrypto,TextEncoder,TextDecoder,structuredClone,console,setTimeout,Blob,URL,btoa,atob,document:{hidden:false,addEventListener(){},getElementById:id=>id==='stona-data'?{textContent:pack}:root},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)}});
 vm.runInContext(code,c);return {root,storage,run:s=>vm.runInContext(s,c),click:(action,val)=>handlers.click({target:{closest:()=>({dataset:{action,val}})}})};
}
for(const path of ['index.html','kids/index.html']){
 const a=app(path);a.run('quickPlay()');
 // A legacy guest can log out from an upgraded named profile safely.
 const legacy=app(path);legacy.run('vault.guest.state={xp:0,history:[],completed:{}};activate("guest",null,vault.guest.state);offerInvitation()');
 assert.equal(legacy.run('state.invites.register'),false);

 a.click('pass');assert.equal(a.run('state.history.length'),0);assert.equal(a.run('pendingInvitation'),'');
 // Select distinct questions so counts don't depend on random picks or repeats.
 const finish='active=null;choosePuzzle=()=>({p:PUZZLES[state.history.length],replay:false});next();revealSolution()';
 for(let i=1;i<=4;i++){a.run(finish);assert.equal(a.run('pendingInvitation'),'');}
 a.run(finish);assert.equal(a.run('pendingInvitation'),'name');assert(a.root.innerHTML.includes('Continua senza nome'));
 a.click('dismiss-invite');assert.equal(a.run('pendingInvitation'),'');
 const reload=app(path,a.storage);reload.run('offerInvitation()');assert.equal(reload.run('pendingInvitation'),'','dismissal survives reload');
 a.run(finish);assert.equal(a.run('pendingInvitation'),'');a.run(finish);assert.equal(a.run('pendingInvitation'),'register');assert(a.root.innerHTML.includes('Continua senza registrarti'));
 const xp=a.run('state.xp');a.click('dismiss-invite');a.run(finish);assert.equal(a.run('pendingInvitation'),'');assert.equal(a.run('state.xp'),xp+4);
 a.run('chooseGuestName({username:"Volpe Stellare"})');assert.equal(app(path,a.storage).run('state.displayName'),'Volpe Stellare');
 assert.equal(a.run('localRanking().length'),0,'no automatic enrolment');
 a.click('toggle-leaderboard');assert.equal(a.run('localRanking()[0].xp'),a.run('state.xp'));
 assert.equal(a.run('localRanking()[0].level'),a.run('unlockedLevel()'));
 assert.equal(a.run('localRanking("musica").length'),0,'no score in unplayed theme');
 a.click('toggle-leaderboard');assert.equal(a.run('localRanking().length'),0);
 a.click('toggle-leaderboard');await a.run('registerProfile({username:"Volpe Stellare",password:"test1234"})');
 assert.equal(a.run('localRanking().length'),1,'guest adoption does not duplicate rank');
 assert.equal(a.run('vault.profiles[0].rankSummary.xp'),a.run('state.xp'));
 assert(!a.storage.get(a.run('VAULT_STORE')).includes(a.run('state.history[0].id')),'rank does not expose puzzle IDs');
 a.run('offerInvitation()');assert.equal(a.run('pendingInvitation'),'','named users are not prompted');
 const backup=a.run('JSON.stringify(envelope(currentProfile()))');
 a.click('toggle-leaderboard');assert.equal(a.run('localRanking().length'),0,'opt-out removes current row immediately');await a.run('writeQueue');
 assert.equal(app(path,a.storage).run('localRanking().length'),0,'and after logout/reload');
 a.run('globalThis.backup='+backup);await a.run('importProfile({querySelector:()=>({files:[{size:100,text:async()=>JSON.stringify(backup)}]})},{password:"test1234"})');
 assert.equal(a.run('state.leaderboardEnabled'),false,'stale backup cannot undo opt-out');assert.equal(a.run('state.invites.register'),true);
 a.click('toggle-leaderboard');await a.run('writeQueue');await a.run('profileAction("logout")');
 a.run('quickPlay();revealSolution();chooseGuestName({username:"Gufo"})');a.click('toggle-leaderboard');
 const rows=JSON.parse(a.run('JSON.stringify(localRanking())'));assert.equal(rows.length,2);assert.equal(rows[0].name,'Volpe Stellare');assert.equal(rows[1].name,'Gufo');
 assert.equal(a.run('localRanking("numeri").length'),2);assert.equal(a.run('localRanking("musica").length'),0);
 a.click('view','leaderboard');assert(a.root.innerHTML.includes('Classifica su questo dispositivo'));assert(a.root.innerHTML.includes('nessun punteggio viene pubblicato online'));
 const norm=JSON.parse(a.run('JSON.stringify(normalizeState(state))'));assert.equal(norm.displayName,'Gufo');assert.equal(norm.leaderboardEnabled,true);
 // Every visual is native, tied to the actual label and hidden from assistive tech.
 assert.equal((a.run('numberFigure(7)').match(/<circle/g)||[]).length,7);
 assert.equal((a.run('numberFigure("10",true)').match(/<text/g)||[]).length,2,'binary strings show digits rather than ten counters');
 assert(a.run('visualLabel("16",{domain:"numeri"})').includes('quantity-figure'));
 assert(a.run('visualLabel("Colino",{domain:"cucina"})').includes('object-drawing'));
 assert(a.run('visualLabel("Missione 1",{domain:"amongus"})').includes('mission-figure'));
 assert(a.run('visualLabel("Rosso",{domain:"amongus"})').includes('crew-figure'));
 assert(a.run('visualLabel("Saturno",{domain:"spazio"})').includes('planet-figure'));
 assert(a.run('visualLabel("12:00",{domain:"amongus"})').includes('clock-figure'));
 assert(a.run('visualLabel("CENA",{domain:"parole"})').includes('letter-figure'));
 assert(!a.run('visualLabel("Nome sconosciuto",{domain:"cinema"})').includes('tile-figure'));
 assert(!a.run('visualLabel("Viola",{domain:"musica"})').includes('🟣'));
 assert(a.run('pitchFigure("Do",{domain:"musica"},0)').includes('M54 76h34'),'C4 has a ledger line below the staff');
 const coverage=JSON.parse(a.run('JSON.stringify(Array.from({length:10},(_,i)=>i+1).map(level=>{const items=PUZZLES.filter(p=>p.level===level).flatMap(p=>p.items.map((t,i)=>!!tileFigure(t,p,i)));return {level,illustrated:items.filter(Boolean).length,total:items.length}}))'));
 console.log(path,JSON.stringify(coverage));
}
const shared=new Map(),adult=app('index.html',shared),kids=app('kids/index.html',shared);
adult.run('chooseGuestName({username:"Adulto"});state.leaderboardEnabled=true;save()');assert.equal(app('kids/index.html',shared).run('localRanking().length'),0);
kids.run('chooseGuestName({username:"Bimbo"});state.leaderboardEnabled=true;save()');assert.equal(app('index.html',shared).run('localRanking()[0].name'),'Adulto');
console.log('OK: optional 5/7 invitations, dismissals, encrypted profiles, ranking consent, stale imports, sorting, category and edition isolation, precise illustrations.');
