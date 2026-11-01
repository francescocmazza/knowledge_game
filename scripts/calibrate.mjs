import {readFileSync,writeFileSync} from 'node:fs';
import {createAdaptiveEngine} from '../src/adaptive-core.mjs';
const args=process.argv.slice(2),take=flag=>{const i=args.indexOf(flag);if(i<0)throw Error('Missing '+flag);const value=args[i+1];args.splice(i,2);return value;};
const edition=take('--edition'),output=take('--output');if(!['classic','kids'].includes(edition)||!args.length)throw Error('Usage: node scripts/calibrate.mjs --edition classic|kids --output FILE report.json ...');
const config=JSON.parse(readFileSync(new URL('../config/gameplay.json',import.meta.url))),pack=JSON.parse(readFileSync(new URL(`../data/catalog-${edition}.json`,import.meta.url))),engine=createAdaptiveEngine(config);
let events=[];for(const file of args){const r=JSON.parse(readFileSync(file));if(r.format!=='stona-playtest'||r.version!==2||r.catalogVersion!==2||r.edition!==edition||!Array.isArray(r.events))throw Error('Incompatible report: '+file);events.push(...engine.normalizeEvents(r.events,pack.puzzles));}
events=engine.normalizeEvents(events,pack.puzzles);const items={};
for(const p of pack.puzzles){const e=engine.estimate(p,events,edition==='kids');if(e.status==='estimated')items[p.id]={revision:p.revision||1,adjustment:Number(e.adjustment.toFixed(4)),players:e.players,nearPlayers:e.nearPlayers,passes:e.passes,hardPasses:e.hardPasses};}
const result={version:2,edition,items,qualifiedQuestions:Object.keys(items).length,note:'Aggregated experimental estimates. No participant identifiers or raw observations are included.'};
writeFileSync(output,JSON.stringify(result,null,2)+'\n');console.log(`Validated ${events.length} observations from ${new Set(events.map(e=>e.participant)).size} anonymous codes; ${Object.keys(items).length} questions meet the sample threshold. Wrote aggregate only: ${output}`);
