import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {webcrypto} from 'node:crypto';
for(const file of ['../index.html','../kids/index.html']){
 const html=readFileSync(new URL(file,import.meta.url),'utf8'),pack=JSON.parse(html.match(/<script id="stona-data" type="application\/json">([\s\S]*?)<\/script>/)[1]),code=html.match(/<script>\s*('use strict';[\s\S]*?)<\/script>/)[1];
 function app(){let now=1000;const storage=new Map(),root={innerHTML:'',addEventListener(){}};const context=vm.createContext({Date:class extends Date{static now(){return now}},crypto:webcrypto,TextEncoder,TextDecoder,structuredClone,console,setTimeout,Blob,URL,btoa,atob,document:{hidden:false,addEventListener(){},getElementById:id=>id==='stona-data'?{textContent:JSON.stringify(pack)}:root},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)}});vm.runInContext(code,context);return {run:s=>vm.runInContext(s,context),advance:ms=>now+=ms,root,storage};}
 const solve='chooseSpot(active.p.wrong[0]);chooseFix(active.p.correct);chooseRule(active.p.rule)';
 const a=app();a.run('chosenDomain="numeri";choosePuzzle=()=>({p:PUZZLES.find(p=>p.domain==="numeri"&&p.level===playLevel()&&!state.completed[p.id]),replay:false});quickPlay()');
 assert.equal(a.run('active.p.level'),1);
 // Do not conflate difficulty stars with subject XP: only played subjects receive points.
 for(let i=0;i<6;i++){a.advance(10000);a.run(solve);if(i<5)a.run('next()')}
 assert.equal(a.run('state.xp'),210);assert.equal(a.run('domainXP("numeri")'),210);assert.equal(a.run('unlockedLevel()'),4);
 for(const d of Object.keys(pack.domains).filter(x=>x!=='numeri')){assert.equal(a.run('domainXP('+JSON.stringify(d)+')'),0);assert.equal(a.run('history('+JSON.stringify(d)+').length'),0);assert.equal(a.run('mastery('+JSON.stringify(d)+')'),null)}
 assert(a.run('promotionMessage(active)').includes('veloci'));assert(a.run('promotionMessage(active)').includes('livello 4'));assert(a.root.innerHTML.includes('role="alert"'));assert(a.root.innerHTML.includes('+35 XP · Numeri'));
 // Historical category labels cannot move XP into an unrelated category; normalization repairs them.
 const different=Object.keys(pack.domains).find(x=>x!=='numeri');a.run('state.history[0].domain='+JSON.stringify(different));assert.equal(a.run('domainXP("numeri")'),210);assert.equal(a.run('domainXP('+JSON.stringify(different)+')'),0);a.run('state=normalizeState(state)');assert.equal(a.run('state.history[0].domain'),'numeri');assert.equal(a.run('state.xp'),210);
 // The entire current pool can be skipped, with no repeats and no mutations to score or session.
 const b=app();b.run('quickPlay()');const before=b.run('JSON.stringify({xp:state.xp,history:state.history,completed:state.completed})'),seen=new Set();const expected=pack.puzzles.filter(p=>p.level<=2).length;
 for(let i=0;i<expected;i++){const id=b.run('active.p.id');assert(!seen.has(id),'skip must defer '+id);seen.add(id);b.run('passQuestion()')}
 assert.equal(b.run('active'),null);assert.equal(b.run('session.noQuestions'),true);assert.equal(b.run('session.count'),0);assert.equal(b.run('session.gained'),0);assert.equal(b.run('unlockedLevel()'),1);assert.equal(b.run('JSON.stringify({xp:state.xp,history:state.history,completed:state.completed})'),before);assert.equal(b.run('state.learning.events.length'),expected);assert(b.root.innerHTML.includes('Riprova le domande saltate'));
 b.run('resumeDeferred()');assert(b.run('active!==null'));assert.equal(b.run('deferred.size'),0);
 // Passing during correction is not an incorrect or completed attempt, even after an earlier mistake.
 const c=app();c.run('quickPlay();chooseSpot(active.p.wrong.includes(0)?1:0);chooseSpot(active.p.wrong[0])');assert.equal(c.run('active.step'),'fix');c.run('passQuestion()');assert.equal(c.run('state.history.length'),0);assert.equal(c.run('state.xp'),0);assert.equal(c.run('session.count'),0);
 // Skips preserve already earned points/stars and do not touch any category.
 const xp=a.run('state.xp'),stars=a.run('levelCredits(1)');a.run('choosePuzzle=()=>({p:PUZZLES.find(p=>p.domain==="numeri"&&p.level===playLevel()),replay:true});next();passQuestion();passQuestion()');assert.equal(a.run('state.xp'),xp);assert.equal(a.run('levelCredits(1)'),stars);assert.equal(a.run('domainXP('+JSON.stringify(different)+')'),0);
 // Slow players also advance, with a truthful message that does not claim speed.
 const slow=app();slow.run('chosenDomain="numeri";choosePuzzle=()=>({p:PUZZLES.find(p=>p.domain==="numeri"&&p.level===playLevel()&&!state.completed[p.id]),replay:false});quickPlay()');for(let i=0;i<4;i++){slow.advance(80000);slow.run(solve);if(i<3)slow.run('next()')};assert.equal(slow.run('unlockedLevel()'),2);assert(!slow.run('promotionMessage(active)').includes('veloci'));assert(slow.run('promotionMessage(active)').includes('livello 2'));slow.run('next()');assert.equal(slow.run('active.p.level'),2);
 // A mixed sequence is attributed from catalogue IDs, not from the selected Mix tab.
 const mixed=app();mixed.run('quickPlay()');const expectedXP={};for(let i=0;i<12;i++){const domain=mixed.run('active.p.domain');mixed.advance(20000);mixed.run(solve);expectedXP[domain]=(expectedXP[domain]||0)+mixed.run('active.earned');if(i<11){if(mixed.run('session.count>=session.total'))mixed.run('session={count:0,total:10,gained:0,done:false,perfect:0}');mixed.run('next()')}}
 for(const d of Object.keys(pack.domains))assert.equal(mixed.run('domainXP('+JSON.stringify(d)+')'),expectedXP[d]||0);assert.equal(mixed.run('Object.keys(DOMAINS).reduce((n,d)=>n+domainXP(d),0)'),mixed.run('state.xp'));
 console.log('OK '+file+': category XP, no unplayed score, repair legacy labels, unlimited free skips, no repeats, exhausted pool, partial skips, truthful fast/slow promotion through level 4, mixed attribution.');
}
