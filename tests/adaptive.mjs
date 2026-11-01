import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash,webcrypto} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import vm from 'node:vm';
import {createAdaptiveEngine} from '../src/adaptive-core.mjs';
const root=new URL('../',import.meta.url),config=JSON.parse(readFileSync(new URL('config/gameplay.json',root))),engine=createAdaptiveEngine(config),hashes=JSON.parse(readFileSync(new URL('tests/fixtures/catalog-legacy-hashes.json',root)));
function app(path,storage=new Map()){
 const html=readFileSync(new URL(path,root),'utf8'),pack=JSON.parse(html.match(/<script id="stona-data" type="application\/json">([\s\S]*?)<\/script>/)[1]),code=html.match(/<script>\s*('use strict';[\s\S]*?)<\/script>/)[1];let now=1000;
 const handlers={},element={innerHTML:'',addEventListener:(kind,fn)=>handlers[kind]=fn};const document={hidden:false,addEventListener(){},getElementById:id=>id==='stona-data'?{textContent:JSON.stringify(pack)}:element};
 const c=vm.createContext({Date:class extends Date{static now(){return now}},crypto:webcrypto,TextEncoder,TextDecoder,structuredClone,console,setTimeout,Blob,URL,btoa,atob,document,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)}});vm.runInContext(code,c);return {run:s=>vm.runInContext(s,c),advance:ms=>now+=ms,document,storage,pack,root:element};
}
const solve='chooseSpot(active.p.wrong[0]);chooseFix(active.p.correct);chooseRule(active.p.rule)';
for(const [path,edition]of [['index.html','classic'],['kids/index.html','kids']]){
 const a=app(path),kids=edition==='kids',puzzles=a.pack.puzzles;
 assert.equal(puzzles.length,320);assert.equal(Object.keys(a.pack.domains).length,8);
 for(const d of Object.keys(a.pack.domains))for(let level=1;level<=10;level++)assert.equal(puzzles.filter(p=>p.domain===d&&p.level===level).length,4);
 assert.deepEqual(a.pack, {...JSON.parse(readFileSync(new URL(`data/catalog-${edition}.json`,root))),gameplay:config,calibration:JSON.parse(readFileSync(new URL(`config/calibration-${edition}.json`,root)))});
 const keys=['items','wrong','correct','choices','rule','hints','why','ordered'];
 for(const [id,hash]of Object.entries(hashes[edition])){const p=puzzles.find(p=>p.id===id),record=Object.fromEntries(keys.map(k=>[k,p[k]]));assert.equal(createHash('sha256').update(JSON.stringify(record)).digest('hex'),hash,'legacy content preserved '+id);}
 // Independently verify all generated constraints, each distractor and the seven coherent items.
 for(const p of puzzles.filter(p=>p.verification)){
  const spec=p.verification,values=t=>t.split(' · ').slice(1).map(part=>Number(part.match(/(\d+)$/)[1]));
  if(spec.type==='sequence'){
   const fixed=p.items.map((t,i)=>Number((p.wrong.includes(i)?p.correct:t).match(/(\d+)$/)[1]));assert.deepEqual(fixed,spec.values,p.id);
   p.items.forEach((t,i)=>assert.equal(Number(t.match(/(\d+)$/)[1])===spec.values[i],!p.wrong.includes(i),p.id));
   for(const c of p.choices)assert.equal(Number(c.match(/(\d+)$/)[1])===spec.values[p.wrong[0]],c===p.correct,p.id+' choice');
  }else{
   const check=vals=>{const [x,y,z,w]=vals,k=spec.constant;return spec.formulaLevel===5?y===2*x+k:spec.formulaLevel===6?y===x*x+k:spec.formulaLevel===7?y===2*x+k&&z===y+x:spec.formulaLevel===8?y===x*x+k&&z===y+x:spec.formulaLevel===9?y===(x%2===0?2*x:3*x)+k&&z===y+x:y===(x%2===0?2*x:3*x)+k&&z===y-x&&w===y+z;};
   p.items.forEach((t,i)=>assert.equal(check(values(t)),!p.wrong.includes(i),p.id));for(const c of p.choices)assert.equal(check(values(c)),c===p.correct,p.id+' choice');
   assert(p.context.includes('inventat'));assert(a.run('tileFigure('+JSON.stringify(p.items[0])+','+JSON.stringify(p)+',0)').includes('record-figure'));
  }
 }
 // Exact 4/3/2/1 distribution at a stable level 6, including one-topic play and no repeated question.
 for(const domains of [Object.keys(a.pack.domains),['numeri']]){
  const progress={completed:{}},recent=[],counts={},ids=new Set();for(let cursor=0;cursor<10;cursor++){
   const result=engine.pick(puzzles,progress,{domains,anchor:6,cursor,recovery:0,pace:'balanced',recent,deferred:new Set(),events:[],kids,shared:{},random:()=>.31});assert(result.p);assert.equal(result.difficulty,result.target);counts[result.difficulty]=(counts[result.difficulty]||0)+1;assert(!ids.has(result.p.id));ids.add(result.p.id);progress.completed[result.p.id]=true;recent.push(result.p);
  }assert.deepEqual(counts,{4:4,5:3,6:2,7:1});
 }
 assert.equal(engine.target(6,5,1),4,'strain overrides a scheduled stretch');assert.equal(engine.target(6,5,0,'gentle'),6);assert.equal(engine.target(10,5,0),10);assert.equal(engine.target(1,0,0),1);
 for(let level=1;level<=10;level++){const schedule=config.rhythm.offsets.map((_,i)=>engine.target(level,i,0));for(let i=0;i<9;i++)if(schedule[i]>=level&&level>2)assert(schedule[i+1]<level,'recovery after a challenge');}
 a.run('state.learning.floor=6;state.playLevel=6;choosePuzzle=()=>({p:PUZZLES.find(p=>p.level===4&&!state.completed[p.id]),replay:false});quickPlay()');
 for(let i=0;i<5;i++){a.advance(10000);a.run(solve);if(i<4)a.run('next()')};assert.equal(a.run('unlockedLevel()'),6,'easy successes do not inflate ability');assert.equal(a.run('state.xp'),175);
 const fast=app(path);fast.run('choosePuzzle=()=>({p:PUZZLES.find(p=>p.level===playLevel()&&!state.completed[p.id]),replay:false});session.total=100;quickPlay()');
 for(let i=0;i<18;i++){fast.advance(10000);fast.run(solve);if(i<17)fast.run('next()')};assert.equal(fast.run('unlockedLevel()'),10);assert(fast.run('promotionMessage(active)').includes('livello 10'));assert.equal(fast.run('rankSummary({id:"test",username:"Test"},state).level'),10);
 const gentle=app(path);gentle.run('Math.random=()=>.47;state.learning.pace="gentle";session.total=1000;quickPlay()');let rounds=0;while(gentle.run('unlockedLevel()')<10&&rounds<350){gentle.advance(200000);gentle.run(solve);rounds++;if(gentle.run('unlockedLevel()')<10)gentle.run('next()')};assert.equal(gentle.run('unlockedLevel()'),10,'a slow player in gentle mode can progress without getting trapped in recovery');
 const legacy=app(path);legacy.run(`state=normalizeState({xp:70,playLevel:2,history:[{id:PUZZLES[0].id,level:1,tierVersion:1,clean:true,durationMs:${kids?55000:10000},quality:100,xp:35,date:'2026-11-01T00:00:00Z'},{id:PUZZLES[1].id,level:1,tierVersion:1,clean:true,durationMs:${kids?55000:10000},quality:100,xp:35,date:'2026-11-01T00:00:00Z'}]})`);assert.equal(legacy.run('unlockedLevel()'),4);assert.equal(legacy.run('state.playLevel'),4);assert.equal(legacy.run('state.xp'),70);assert.equal(legacy.run('state.history.length'),2);
 const skips=app(path);skips.run('quickPlay()');skips.advance(3000);skips.run('passQuestion()');assert.equal(skips.run('state.learning.events[0].reason'),'unknown');assert.equal(skips.run('state.history.length'),0);assert.equal(skips.run('state.xp'),0);assert.equal(skips.run('session.count'),0);assert.equal(skips.run('state.learning.recovery'),0);skips.run('notePassReason("hard")');assert.equal(skips.run('state.learning.recovery'),2);assert.equal(skips.run('state.learning.events[0].reason'),'hard');
 const paused=app(path);paused.run('quickPlay()');paused.advance(5000);paused.document.hidden=true;paused.run('tickClock()');paused.advance(300000);paused.document.hidden=false;paused.run('tickClock()');paused.advance(3000);paused.run(solve);assert.equal(paused.run('state.learning.events[0].durationMs'),8000);
 const revision=app(path);revision.run('quickPlay();choosePuzzle=()=>({p:active.p,replay:true})');revision.advance(5000);revision.run(solve);const originalXP=revision.run('state.xp');revision.run('active.p.revision=2;next()');revision.advance(5000);revision.run(solve);assert.equal(revision.run('state.xp'),originalXP);assert.equal(revision.run('state.learning.events.at(-1).revision'),2);assert.equal(revision.run('state.learning.events.at(-1).replay'),false,'a revised question is new evidence, while keeping historical XP');revision.run('next()');revision.advance(5000);revision.run(solve);assert.equal(revision.run('state.learning.events.at(-1).replay'),true);
 const selected=app(path);selected.run('state.learning.floor=6;state.playLevel=2;quickPlay()');selected.advance(5000);selected.run('revealSolution()');assert.equal(selected.run('state.learning.events[0].playerLevel'),6,'calibration uses attained level, not deliberately easier chosen level');
 const imported=app(path),question=puzzles.find(p=>p.level===4);const observations=Array.from({length:60},(_,i)=>({eventId:(i+1).toString(16).padStart(32,'0'),participant:(i+100).toString(16).padStart(32,'0'),id:question.id,revision:question.revision,playerLevel:4,domainLevel:4,difficulty:4,durationMs:30000,outcome:'revealed',reason:'none',hints:0,mistakes:0,replay:false}));
 imported.run('globalThis.report='+JSON.stringify({format:'stona-playtest',version:2,catalogVersion:2,edition,events:observations}));const importCall='importFeedback({querySelector:()=>({files:[{size:100,text:async()=>JSON.stringify(report)}]})})';await imported.run(importCall);assert(imported.run('itemEstimate(PUZZLES.find(p=>p.id==='+JSON.stringify(question.id)+')).value')>4);await imported.run(importCall);assert.equal(imported.run('cohort.events.length'),60);imported.run('report.edition='+JSON.stringify(kids?'classic':'kids'));await assert.rejects(imported.run(importCall));
 if(!kids){const full=app(path);full.run('state.learning.events=Array.from({length:RHYTHM.telemetry.maxStoredEvents},(_,i)=>({eventId:(i+1).toString(16).padStart(32,"0"),participant:state.learning.participant,id:PUZZLES[i%PUZZLES.length].id,revision:1,playerLevel:1,domainLevel:1,difficulty:1,durationMs:12000,outcome:"solved",reason:"none",hints:0,mistakes:0,replay:true}))');await full.run('registerProfile({username:"Report Pieno",password:"test-full-backup"})');const body=full.run('JSON.stringify(envelope(currentProfile()))');assert(body.length<1000000,'maximum stored telemetry still fits profile import limit');const restored=app(path);restored.run('globalThis.fullBackup='+body);await restored.run('importProfile({querySelector:()=>({files:[{size:'+body.length+',text:async()=>JSON.stringify(fullBackup)}]})},{password:"test-full-backup"})');assert.equal(restored.run('state.learning.events.length'),config.telemetry.maxStoredEvents);}
 const report=JSON.parse(fast.run('JSON.stringify(feedbackReport())'));assert.equal(report.edition,edition);assert(!JSON.stringify(report).includes('username'));assert(!JSON.stringify(report).includes('password'));
 await fast.run('registerProfile({username:"Pilota",password:"test-only-1234"})');const saved=JSON.parse(fast.run('JSON.stringify(envelope(currentProfile()))'));
 const other=app(path);other.run('globalThis.backup='+JSON.stringify(saved));await other.run('importProfile({querySelector:()=>({files:[{size:100,text:async()=>JSON.stringify(backup)}]})},{password:"test-only-1234"})');assert.equal(other.run('state.learning.events.length'),18);assert.equal(other.run('unlockedLevel()'),10);
 await other.run('importProfile({querySelector:()=>({files:[{size:100,text:async()=>JSON.stringify(backup)}]})},{password:"test-only-1234"})');assert.equal(other.run('state.learning.events.length'),18,'repeat backup does not duplicate observations');
 console.log(edition+': 320 verified puzzles, ten levels, 4/3/2/1 rhythm, fatigue recovery, legacy migration, feedback portability, score isolation.');
}
// Empirical difficulty needs independent, near-level players; no automatic penalty for neutral skips.
const p={id:'item',level:4},sample=(n,outcome='solved',playerLevel=4,reason='none')=>Array.from({length:n},(_,i)=>({eventId:(i+1).toString(16).padStart(32,'0'),participant:(i+50).toString(16).padStart(32,'0'),id:p.id,playerLevel,domainLevel:playerLevel,difficulty:4,durationMs:30000,outcome,reason,hints:0,mistakes:0,replay:false}));
assert.equal(engine.estimate(p,sample(1,'revealed'),false).value,4);
assert.equal(engine.normalizeEvents(sample(1).map(e=>({...e,revision:2})),[p]).length,0,'observations from another revision are rejected');assert.equal(engine.estimate({...p,revision:2},sample(60,'revealed'),false).value,4);assert.equal(engine.estimate({...p,revision:2},[],false,{item:{revision:1,adjustment:2,players:60,nearPlayers:10}}).status,'editorial');
assert.equal(engine.estimate(p,sample(8,'revealed'),false,{item:{revision:1,adjustment:-1,players:60,nearPlayers:10}}).value,3,'small local cohorts cannot override a larger published sample');

assert(engine.estimate(p,sample(60,'revealed'),false).value>4,'harder after qualified failures');assert(engine.estimate(p,sample(60),false).value<4,'easier after qualified fast clean success');
assert(engine.estimate(p,sample(60).map(e=>({...e,durationMs:engine.expectedMs(4,false)*4})),false).value>4,'very slow successful responses also increase difficulty');
assert.equal(engine.estimate(p,sample(60,'passed',4,'unknown'),false).value,4);assert.equal(engine.estimate(p,sample(60,'passed',4,'interest'),false).value,4);assert.equal(engine.estimate(p,sample(60,'solved',10),false).value,4,'experts cannot reclassify a beginner question without near-level evidence');
const updated=sample(1,'passed',4,'unknown');assert.equal(engine.normalizeEvents([...updated,{...updated[0],reason:'hard'}],[p])[0].reason,'hard');
const same=sample(60,'revealed').map(e=>({...e,participant:'a'.repeat(32)}));assert.equal(engine.estimate(p,same,false).value,4,'one person repeating is not sixty independent players');
assert.equal(engine.estimate(p,sample(60).map(e=>({...e,replay:true})),false).value,4);assert.equal(engine.estimate(p,sample(60).map(e=>({...e,durationMs:0})),false).value,4);
const tmp=mkdtempSync(join(tmpdir(),'stona-calibration-'));try{
 const q=JSON.parse(readFileSync(new URL('data/catalog-classic.json',root))).puzzles.find(p=>p.level===4),events=sample(60,'revealed').map(e=>({...e,id:q.id})),file=join(tmp,'feedback.json'),output=join(tmp,'aggregate.json');writeFileSync(file,JSON.stringify({format:'stona-playtest',version:2,catalogVersion:2,edition:'classic',events}));execFileSync(process.execPath,[new URL('scripts/calibrate.mjs',root).pathname,'--edition','classic','--output',output,file]);const result=JSON.parse(readFileSync(output));assert.equal(result.items[q.id].players,60);assert(!JSON.stringify(result).includes('"participant":'));assert(!JSON.stringify(result).includes('"eventId":'));assert(result.items[q.id].adjustment>0);const blended=engine.estimate(q,[],false,result.items);assert(blended.value>q.level);assert.equal(blended.status,'estimated');
}finally{rmSync(tmp,{recursive:true,force:true});}
console.log('Calibration: sample gates, player-level conditioning, both directions, neutral skips, replay/duplicate rejection and aggregate-only CLI verified.');
