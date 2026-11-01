import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const file = process.argv[2] ?? path.join(here, '..', 'index.html');
const html = readFileSync(file, 'utf8');
const match = html.match(/<script id="stona-data" type="application\/json">([\s\S]*?)<\/script>/);
assert(match, 'Catalogo JSON incorporato assente');
const { domains, puzzles } = JSON.parse(match[1]);
assert.equal(Object.keys(domains).length, 8, 'Numero di domini');
assert.equal(puzzles.length, 320, 'Numero di enigmi');
const ids = new Set();
for (const puzzle of puzzles) {
  assert(!ids.has(puzzle.id), 'ID duplicato: ' + puzzle.id);
  ids.add(puzzle.id);
  assert(domains[puzzle.domain], 'Dominio sconosciuto: ' + puzzle.id);
  assert.equal(puzzle.items.length, 8, 'Elementi diversi da 8: ' + puzzle.id);
  assert.equal(puzzle.choices.length, 4, 'Opzioni diverse da 4: ' + puzzle.id);
  assert.equal(new Set(puzzle.choices).size, 4, 'Opzioni duplicate: ' + puzzle.id);
  assert(puzzle.choices.includes(puzzle.correct), 'Risposta non fra le scelte: ' + puzzle.id);
  assert(puzzle.rule && puzzle.why, 'Regola/spiegazione mancante: ' + puzzle.id);
  assert.equal(puzzle.hints.length, 2, 'Indizi insufficienti: ' + puzzle.id);
  assert(puzzle.wrong.length > 0, 'Anomalia mancante: ' + puzzle.id);
  assert(puzzle.wrong.every(n => Number.isInteger(n) && n >= 0 && n < 8),
    'Indice dell’anomalia invalido: ' + puzzle.id);
  assert(puzzle.level >= 1 && puzzle.level <= 10, 'Livello invalido: ' + puzzle.id);
}
for (const name of Object.keys(domains)) {
  assert.equal(puzzles.filter(p => p.domain === name).length, 40, 'Distribuzione: ' + name);
}
const original = puzzles.find(p => p.id === 'numeri-01');
assert(original, 'Manca esempio fondativo');
assert.deepEqual(original.items, ['3','2','6','4','5','7','9','5']);
assert.deepEqual(original.wrong, [4,7]);
assert.equal(original.correct, '8');
assert.equal(puzzles.find(p => p.id === 'musica-02')?.ordered, true);
console.log('OK: 8 domini, 320 enigmi, struttura valida e regola numerica fondativa coerente.');
console.log('Nota: i controlli sintattici NON sostituiscono una revisione fattuale/editoriale.');


for (const d of Object.keys(domains)) for (const level of Array.from({length:10},(_,i)=>i+1)) assert.equal(puzzles.filter(p=>p.domain===d&&p.level===level).length,4,`Tier coverage ${d} ${level}`);
