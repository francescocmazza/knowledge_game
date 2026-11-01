import {readFileSync,writeFileSync} from 'node:fs';
const root=new URL('../',import.meta.url),read=p=>readFileSync(new URL(p,root),'utf8');
const config=JSON.parse(read('config/gameplay.json'));if(config.maxLevel!==10||config.rhythm.offsets.length!==10)throw Error('Invalid game rhythm');
const core=read('src/adaptive-core.mjs').replace('export function','function'),adapter=read('src/adaptive-app.js');
for(const [path,edition]of [['index.html','classic'],['kids/index.html','kids']]){
 let html=read(path),pack=JSON.parse(read(`data/catalog-${edition}.json`));pack.gameplay=config;pack.calibration=JSON.parse(read(`config/calibration-${edition}.json`));
 html=html.replace(/(<script id="stona-data" type="application\/json">)[\s\S]*?(<\/script>)/,(_,a,b)=>a+JSON.stringify(pack,null,2).replace(/</g,'\\u003c')+b);
 html=html.replace(/\/\/ BEGIN ADAPTIVE CORE[\s\S]*?\/\/ END ADAPTIVE CORE/,()=>`// BEGIN ADAPTIVE CORE\n${core}\nconst RHYTHM=PACK.gameplay, ADAPTIVE=createAdaptiveEngine(RHYTHM);\nconst COHORT_STORE=KIDS_EDITION?'stona-kids-playtest-v2':'stona-playtest-v2';\nlet cohort;try{cohort={events:ADAPTIVE.normalizeEvents(JSON.parse(localStorage.getItem(COHORT_STORE)||'{}').events,PUZZLES)}}catch(e){cohort={events:[]}}\nlet lastPassId='';\n${adapter}\n// END ADAPTIVE CORE`);
 html=html.replace(/128 enigmi/g,'320 enigmi');
 writeFileSync(new URL(path,root),html);
}
console.log('Built both standalone games from shared catalogs, rhythm and calibration sources.');
