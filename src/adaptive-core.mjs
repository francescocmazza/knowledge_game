/** Pure shared engine. Embedded into both standalone apps by scripts/build-adaptive.mjs. */
export function createAdaptiveEngine(config) {
 const clamp=(n,a=1,b=config.maxLevel)=>Math.max(a,Math.min(b,n));
 const expectedMs=(level,kids)=>config.timing[kids?'kidsBaseMs':'classicBaseMs']+(level-1)*config.timing[kids?'kidsPerLevelMs':'classicPerLevelMs'];
 function legacyCeiling(history,kids=false){let n=1;while(n<4){const seen=new Set();const stars=history.reduce((sum,r)=>{if(r.tierVersion!==1||r.level!==n||!r.clean||seen.has(r.id))return sum;seen.add(r.id);return sum+(r.durationMs!==null&&r.durationMs<=(kids?60000:45000)?2:1)},0);if(stars<4)break;n++;}return config.progression.legacyMap[n];}
 function credits(history,level,kids){const seen=new Set();return history.reduce((n,r)=>{if(r.tierVersion!==2||r.playerLevel!==level||r.level<level||!r.clean||seen.has(r.id))return n;seen.add(r.id);return n+(r.durationMs!==null&&r.durationMs<=expectedMs(r.level,kids)?config.progression.fastStars:config.progression.slowStars)},0);}
 function ceiling(progress,kids){let n=clamp(progress.learning?.floor||1);while(n<config.maxLevel&&credits(progress.history,n,kids)>=config.progression.starsToAdvance)n++;return n;}
 function domainLevel(progress,domain,kids,puzzles){const base=ceiling(progress,kids),played=progress.history.filter(r=>r.tierVersion===2&&r.clean&&puzzles.find(p=>p.id===r.id)?.domain===domain).slice(-12);if(!played.length)return base;const mean=played.reduce((s,r)=>s+r.level,0)/played.length;return clamp(base*.7+mean*.3);}
 function normalizeEvents(events,puzzles){
  const ids=new Map(puzzles.map(p=>[p.id,p.revision||1])),byId=new Map();
  for(const e of Array.isArray(events)?events:[]){
   if(!e||!ids.has(e.id)||(e.revision||1)!==ids.get(e.id)||typeof e.eventId!=='string'||!/^[a-f0-9]{32}$/.test(e.eventId)||typeof e.participant!=='string'||!/^[a-f0-9]{32}$/.test(e.participant)||!['solved','revealed','passed'].includes(e.outcome)||!['hard','interest','unknown','none'].includes(e.reason)||!Number.isFinite(e.durationMs)||e.durationMs<0||e.durationMs>86400000||![e.playerLevel,e.domainLevel,e.difficulty].every(n=>Number.isFinite(n)&&n>=1&&n<=config.maxLevel)||!Number.isInteger(e.hints)||e.hints<0||e.hints>2||!Number.isInteger(e.mistakes)||e.mistakes<0||e.mistakes>1000)continue;
   const clean={eventId:e.eventId,participant:e.participant,id:e.id,revision:e.revision||1,playerLevel:e.playerLevel,domainLevel:e.domainLevel,difficulty:e.difficulty,durationMs:Math.round(e.durationMs),outcome:e.outcome,reason:e.reason,hints:e.hints,mistakes:e.mistakes,replay:!!e.replay};
   const old=byId.get(e.eventId);if(!old)byId.set(e.eventId,clean);else if(old.reason==='unknown'&&['hard','interest'].includes(clean.reason)&&old.id===clean.id&&old.participant===clean.participant&&old.outcome==='passed')old.reason=clean.reason;
  }
  return [...byId.values()].slice(-config.telemetry.maxCohortEvents);
 }
 function estimate(p,events,kids,shared={}){
  // First exposure per anonymous player and item. Replays do not bias calibration.
  const seen=new Set(),all=events.filter(e=>e.id===p.id&&(e.revision||1)===(p.revision||1)&&!e.replay&&!seen.has(e.participant)&&(seen.add(e.participant)));
  const usable=all.filter(e=>e.durationMs>=config.timing.minimumMs&&e.durationMs<=config.timing.maxUsefulMs&&(e.outcome!=='passed'||e.reason==='hard'));
  const near=usable.filter(e=>Math.abs((e.playerLevel*.7+e.domainLevel*.3)-p.level)<=config.calibration.nearBand);
  let weighted=0,weights=0;
  for(const e of usable){const ability=e.playerLevel*.7+e.domainLevel*.3;const predicted=1/(1+Math.exp((p.level-ability-1)*.8));const weight=e.outcome==='passed'?config.calibration.skipHardWeight:1;let observed=e.outcome==='solved'?clamp(1-e.hints*.18-e.mistakes*.12,0.2,1):e.outcome==='revealed'?.1:.25;const timeResidual=e.outcome==='solved'?.3*clamp(Math.log2(Math.max(.1,e.durationMs/expectedMs(p.level,kids))),-1,3):0;weighted+=(predicted-observed+timeResidual)*weight;weights+=weight;}
  const ready=usable.length>=config.calibration.minPlayers&&near.length>=config.calibration.minNearPlayers;
  const localDelta=ready?clamp(weighted/(weights+config.calibration.priorWeight)*config.calibration.residualGain,-config.calibration.maxAdjustment,config.calibration.maxAdjustment):0;
  const published=shared[p.id]&&(shared[p.id].revision||1)===(p.revision||1)?shared[p.id]:null;const useLocal=ready&&usable.length>=(published?.players||0);
  const delta=useLocal?localDelta:(published?.adjustment||0);
  return {value:clamp(Math.round(p.level+delta)),continuous:clamp(p.level+delta),players:useLocal?usable.length:(published?.players||usable.length),nearPlayers:useLocal?near.length:(published?.nearPlayers||near.length),passes:all.filter(e=>e.outcome==='passed').length,hardPasses:all.filter(e=>e.outcome==='passed'&&e.reason==='hard').length,status:useLocal||published?'estimated':'editorial',adjustment:delta};
 }
 function target(anchor,cursor,recovery,pace='balanced') {const cap=pace==='gentle'?anchor:anchor+config.rhythm.maxStretch;const offset=recovery>0?config.rhythm.recoveryOffset:config.rhythm.offsets[cursor%config.rhythm.offsets.length];return clamp(Math.min(cap,anchor+offset));}
 function pick(puzzles,progress,options){
  const {domains,anchor,cursor,recovery,pace,recent,deferred,events,kids,shared,random=Math.random}=options;
  const cap=Math.min(config.maxLevel,anchor+(pace==='gentle'?0:config.rhythm.maxStretch));
  let eligible=puzzles.filter(p=>domains.includes(p.domain)&&!deferred.has(p.id)&&estimate(p,events,kids,shared).value<=cap);
  if(!eligible.length)return {p:null,replay:false};
  const desired=target(anchor,cursor,recovery,pace);const distance=p=>Math.abs(estimate(p,events,kids,shared).value-desired);
  const nearest=Math.min(...eligible.map(distance));eligible=eligible.filter(p=>distance(p)===nearest);
  const unused=eligible.filter(p=>!progress.completed[p.id]);if(unused.length)eligible=unused;
  const recentIds=new Set(recent.map(x=>x.id));const unseen=eligible.filter(p=>!recentIds.has(p.id));if(unseen.length)eligible=unseen;
  const noDomainRun=recent.length>=config.rhythm.maxSameDomain&&recent.slice(-config.rhythm.maxSameDomain).every(x=>x.domain===recent.at(-1).domain);
  if(domains.length>1&&noDomainRun){const other=eligible.filter(p=>p.domain!==recent.at(-1).domain);if(other.length)eligible=other;}
  const noKindRun=recent.length>=config.rhythm.maxSameKind&&recent.slice(-config.rhythm.maxSameKind).every(x=>x.kind===recent.at(-1).kind);
  if(noKindRun){const other=eligible.filter(p=>p.kind!==recent.at(-1).kind);if(other.length)eligible=other;}
  const p=eligible[Math.floor(random()*eligible.length)];return {p,replay:!!progress.completed[p.id],difficulty:estimate(p,events,kids,shared).value,target:desired};
 }
 return {clamp,expectedMs,legacyCeiling,credits,ceiling,domainLevel,normalizeEvents,estimate,target,pick};
}
