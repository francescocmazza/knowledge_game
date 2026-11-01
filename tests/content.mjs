import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const {puzzles}=JSON.parse(html.match(/<script id="stona-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
const get=id=>puzzles.find(x=>x.id===id);
for(const p of puzzles.filter(p=>!p.verification)){assert.equal(new Set(p.items).size,p.items.length-(p.id==='numeri-01'||p.id==='numeri-06'||p.id==='musica-02'||p.id==='musica-10'?1:0),'Unexpected duplicate '+p.id);assert(p.items.every(x=>typeof x==='string'&&x.length));}
const rules={
 'numeri-07':Array.from({length:8},(_,i)=>2*(i+1)),
 'numeri-08':Array.from({length:8},(_,i)=>(i+1)**3),
 'numeri-09':Array.from({length:8},(_,i)=>(i+1)*(i+2)/2),
 'numeri-10':[1,2,6,24,120,720,5040,40320],
 'numeri-11':Array.from({length:8},(_,i)=>81-9*i),
 'numeri-12':Array.from({length:8},(_,i)=>(i+1).toString(2))
};
for(const [id,expected] of Object.entries(rules)){const p=get(id),fixed=[...p.items];for(const idx of p.wrong)fixed[idx]=p.correct;assert.deepEqual(fixed,expected.map(String),id);}
const wordTests={7:w=>w.length===4,8:w=>w.startsWith('G'),9:w=>/ando$|endo$/i.test(w),10:w=>w.length===4&&w.startsWith('C'),11:w=>/^S[BCDFGHJKLMNPQRSTVWXYZ]/.test(w),12:w=>w.endsWith('MENTE')};
for(const [n,test]of Object.entries(wordTests)){const p=get('parole-'+String(n).padStart(2,'0'));p.items.forEach((w,i)=>assert.equal(test(w),!p.wrong.includes(i),p.id+' '+w));assert(test(p.correct));for(const w of p.choices.filter(x=>x!==p.correct))assert(!test(w),p.id+' alternative '+w);}
console.log('OK: unique items, 6 exact numeric solutions, 6 linguistic rules and distractors.');
