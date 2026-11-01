import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {webcrypto} from 'node:crypto';
import vm from 'node:vm';
function extract(path){const html=readFileSync(new URL(path,import.meta.url),'utf8');return {html,pack:JSON.parse(html.match(/<script id="stona-data" type="application\/json">([\s\S]*?)<\/script>/)[1]),code:html.match(/<script>\s*('use strict';[\s\S]*?)<\/script>/)[1]}}
const kids=extract('../kids/index.html'),classic=extract('../index.html');
const themes=['numeri','parole','animali','pianeta','spazio','sport','musica','amongus'];
assert.deepEqual(Object.keys(kids.pack.domains),themes);assert.equal(kids.pack.puzzles.length,128);
const ids=new Set();for(const p of kids.pack.puzzles){assert(!ids.has(p.id));ids.add(p.id);assert(kids.pack.domains[p.domain]);assert.equal(p.items.length,8,p.id);assert.equal(p.hints.length,2,p.id);assert.equal(p.choices.length,4);assert.equal(new Set(p.choices).size,4);assert(p.choices.includes(p.correct));assert(p.rule&&p.why);assert(p.wrong.every(i=>Number.isInteger(i)&&i>=0&&i<8));assert(p.level>=1&&p.level<=4);assert(!p.choices.includes('undefined'));}
for(const theme of themes)for(let level=1;level<=4;level++)assert.equal(kids.pack.puzzles.filter(p=>p.domain===theme&&p.level===level).length,4,theme+' '+level);
for(const p of kids.pack.puzzles.filter(p=>p.domain==='amongus'))assert(p.context.includes('inventata'));
function app(source,storage=new Map()){let now=1000;const root={innerHTML:'',addEventListener(){}};const doc={hidden:false,addEventListener(){},getElementById:id=>id==='stona-data'?{textContent:JSON.stringify(source.pack)}:root};const c=vm.createContext({Date:class extends Date{static now(){return now}},crypto:webcrypto,TextEncoder,TextDecoder,structuredClone,console,setTimeout,Blob,URL,btoa,atob,document:doc,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)}});vm.runInContext(source.code,c);return {run:s=>vm.runInContext(s,c),advance:ms=>now+=ms,root,storage};}
const a=app(kids);assert(a.root.innerHTML.includes('STONA KIDS'));assert.equal((a.root.innerHTML.match(/class="world-card"/g)||[]).length,8);
a.run('chosenDomain="amongus";quickPlay()');assert.equal(a.run('active.p.level'),1);assert(a.root.innerHTML.includes('mission-note'));assert(!a.root.innerHTML.includes('data-action="intuition"'));
const solve='chooseSpot(active.p.wrong[0]);chooseFix(active.p.correct);chooseRule(active.p.rule)';
a.advance(55000);a.run(solve);assert.equal(a.run('levelCredits(1)'),2,'Kids fast allowance is sixty seconds');a.run('next()');a.advance(10000);a.run(solve);assert.equal(a.run('unlockedLevel()'),2);assert.equal(a.run('state.playLevel'),2);a.run('next()');assert.equal(a.run('active.p.level'),2);
const b=app(kids);b.run('quickPlay()');for(let i=0;i<4;i++){b.advance(75000);b.run(solve);if(i<3)b.run('next()')};assert.equal(b.run('unlockedLevel()'),2,'slow correct answers also unlock');
const shared=new Map();const adult=app(classic,shared);adult.run('quickPlay();skip()');const child=app(kids,shared);assert.equal(child.run('state.xp'),0);child.run('quickPlay();skip()');assert.equal(app(classic,shared).run('state.xp'),4,'Kids does not alter classic progress');
const old=app(kids,new Map([['stona-alpha-v1',adult.run('JSON.stringify(state)')]]));assert.equal(old.run('state.xp'),0,'no accidental migration from classic');
await child.run('registerProfile({username:"Pilota",password:"kids-test-password"})');const envelope=JSON.parse(child.run('JSON.stringify(envelope(currentProfile()))'));adult.run('testEnvelope='+JSON.stringify(envelope));await assert.rejects(adult.run('openEnvelope(testEnvelope,"kids-test-password")'),/compatibile/,'classic must reject Kids backups');
const classics=app(classic);await classics.run('registerProfile({username:"Classic",password:"classic-test"})');child.run('testEnvelope='+classics.run('JSON.stringify(envelope(currentProfile()))'));await assert.rejects(child.run('openEnvelope(testEnvelope,"classic-test")'),/Stona Kids/,'Kids must reject classic backups');
assert(child.run('visualLabel("VIOLA",{domain:"amongus"})').includes('🟣'));assert(!child.run('visualLabel("Missione 1",{domain:"amongus"})').includes('tile-visual'));
// Numeric sequences in the new themes have exact independent expected repairs.
for(const p of kids.pack.puzzles.filter(p=>p.domain==='spazio'||p.domain==='sport'||p.domain==='amongus')){if(p.rule.includes('raddoppia')||p.rule.includes('doppio della precedente')){const fixed=p.items.map((x,i)=>p.wrong.includes(i)?p.correct:x).map(x=>Number(x.match(/\d+/)?.[0]));for(let i=1;i<fixed.length;i++)assert.equal(fixed[i],fixed[i-1]*2,p.id);}}
console.log('OK Kids: 128 puzzles, 8 themes, 4 tiers, Among Us context, fast/slow unlocks, exact icons, classic/legacy/backup isolation.');
