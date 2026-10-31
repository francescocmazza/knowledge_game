import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {webcrypto} from 'node:crypto';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const pack=html.match(/<script id="stona-data" type="application\/json">([\s\S]*?)<\/script>/)[1];
const code=html.match(/<script>\s*('use strict';[\s\S]*?)<\/script>/)[1];
function app(){let now=1000;const storage=new Map(),root={innerHTML:'',addEventListener(){}};const document={hidden:false,addEventListener(){},getElementById:id=>id==='stona-data'?{textContent:pack}:root};const c=vm.createContext({Date:class extends Date{static now(){return now}},crypto:webcrypto,TextEncoder,TextDecoder,structuredClone,console,setTimeout,Blob,URL,btoa,atob,document,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)}});vm.runInContext(code,c);return {run:s=>vm.runInContext(s,c),advance:ms=>now+=ms,root,document}}
const solve='chooseSpot(active.p.wrong[0]);chooseFix(active.p.correct);chooseRule(active.p.rule)';
const fast=app();fast.run('quickPlay()');assert.equal(fast.run('active.p.level'),1);assert.equal(fast.run('unlockedLevel()'),1);
for(const domain of ['numeri','calcio','natura','cucina','parole','geografia','cinema','musica'])assert(fast.root.innerHTML.includes('data-val="'+domain+'"'),domain+' visible');
assert(!fast.root.innerHTML.includes('data-action="intuition"'));
fast.advance(10000);fast.run(solve);assert.equal(fast.run('levelCredits(1)'),2);assert.equal(fast.run('unlockedLevel()'),1);
fast.run('next()');fast.advance(15000);fast.run(solve);assert.equal(fast.run('unlockedLevel()'),2);assert.equal(fast.run('state.playLevel'),2);assert(fast.root.innerHTML.includes('Hai sbloccato il livello 2'));
fast.run('next()');assert.equal(fast.run('active.p.level'),2);
const slow=app();slow.run('chosenDomain="numeri";quickPlay()');for(let i=0;i<4;i++){assert.equal(slow.run('active.p.level'),1);slow.advance(60000);slow.run(solve);if(i<3)slow.run('next()')};assert.equal(slow.run('unlockedLevel()'),2,'four slow solutions unlock too');
const error=app();error.run('quickPlay();chooseSpot(active.p.wrong.includes(0)?1:0)');error.advance(1000);error.run(solve);assert.equal(error.run('levelCredits(1)'),0,'mistakes do not unlock');
error.run('next();active.hints=1');error.run(solve);assert.equal(error.run('levelCredits(1)'),0,'hints do not unlock');error.run('next();skip()');assert.equal(error.run('levelCredits(1)'),0,'reveals do not unlock');
const paused=app();paused.run('quickPlay()');paused.advance(5000);paused.document.hidden=true;paused.run('tickClock()');paused.advance(100000);paused.document.hidden=false;paused.run('tickClock()');paused.advance(5000);paused.run('view="profile";render()');paused.advance(100000);paused.run('view="play";render()');paused.advance(5000);paused.run(solve);assert.equal(paused.run('state.history[0].durationMs'),15000,'background and navigation time excluded');assert.equal(paused.run('levelCredits(1)'),2);
const restored=JSON.parse(fast.run('JSON.stringify(normalizeState(state))'));assert.equal(restored.history[0].tierVersion,1);assert.equal(restored.history[0].durationMs,10000);assert.equal(restored.playLevel,2);
const migration=app();migration.run('state.history=[{id:"numeri-01",level:1,clean:true,durationMs:1000},{id:"numeri-02",level:1,clean:true,durationMs:1000}]');assert.equal(migration.run('unlockedLevel()'),1,'legacy results do not silently increase difficulty');
for(const domain of ['numeri','calcio','natura','cucina','parole','geografia','cinema','musica']){const a=app();a.run('chosenDomain='+JSON.stringify(domain)+';quickPlay()');assert.equal(a.run('active.p.level'),1);for(let i=0;i<4;i++){a.run('skip();next()');assert.equal(a.run('active.p.level'),1,'locked content stays locked '+domain)}}
console.log('OK: eight sectors, beginner gates, fast/slow unlocks, error/hint/reveal exclusion, paused timing, migration and profile transfer.');

const replay=app();replay.run('chosenDomain="numeri";quickPlay();skip();state.completed=Object.fromEntries(PUZZLES.filter(p=>p.domain==="numeri"&&p.level===1).map(p=>[p.id,true]));active=null;next()');
// Choose the actual previously revealed puzzle to test a first clean replay.
replay.run('active=null;state.completed={};next();skip();next()');
const firstId=replay.run('state.history[0].id');
replay.run('state.completed=Object.fromEntries(PUZZLES.map(p=>[p.id,true]));choosePuzzle=()=>({p:PUZZLES.find(p=>p.id==='+JSON.stringify(firstId)+'),replay:true});next()');
const oldXP=replay.run('state.xp');replay.run(solve);assert.equal(replay.run('state.xp'),oldXP);assert.equal(replay.run('levelCredits(1)'),2,'first clean replay can earn stars after a reveal');replay.run('next()');replay.run(solve);assert.equal(replay.run('levelCredits(1)'),2,'repeated clean replay cannot farm stars');

const visual=app();
assert(visual.run('visualLabel("MELA",{domain:"parole"})').includes('🍎'),'uppercase labels get object-specific icons');
assert(visual.run('visualLabel("CANE",{domain:"parole"})').includes('🐶'));
assert(visual.run('visualLabel("RE",{domain:"parole"})').includes('🤴'));
for(const text of ['CASA','LUNA','SOLE','MARE','PERA'])assert(visual.run('visualLabel('+JSON.stringify(text)+',{domain:"parole"})').includes('tile-visual'));
for(const text of ['Fischietto dell’arbitro','Parastinchi','Colino','Cuscino','Roma','Mestolo','Pizzaiolo','16','CENA'])assert(!visual.run('visualLabel('+JSON.stringify(text)+',{domain:"parole"})').includes('tile-visual'),'no approximate or generic icon: '+text);
assert(visual.run('visualLabel("Rosa",{domain:"natura"})').includes('🌹'));
assert(visual.run('visualLabel("ROSA",{domain:"parole"})').includes('🩷'));
assert(!visual.run('visualLabel("Viola",{domain:"musica"})').includes('🟣'));
assert(visual.run('visualLabel("<test>",{domain:"parole"})').includes('&lt;test&gt;'),'plain text remains escaped');
console.log('OK: exact icons, uppercase, ambiguous meanings, plain-text fallback without category symbols.');
