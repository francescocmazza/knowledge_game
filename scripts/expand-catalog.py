"""One-time authored expansion. Generated records have executable, exact constraints."""
import json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
contexts={
 'numeri':('Scheda','punti','gruppi','totale','bonus'), 'parole':('Tessera','tessere','mosse','punti','totale'),
 'natura':('Serra','vasi','semi','etichette','totale'), 'animali':('Rifugio','recinti','ciotole','scorte','totale'),
 'cucina':('Vassoio','porzioni','biscotti','frutti','totale'), 'geografia':('Percorso','tappe','ponti','segnali','totale'),
 'pianeta':('Percorso','tappe','ponti','segnali','totale'), 'calcio':('Allenamento','giri','passaggi','tiri','totale'),
 'sport':('Allenamento','giri','passaggi','salti','totale'), 'cinema':('Scena','riprese','fotogrammi','ciak','totale'),
 'musica':('Battuta','colpi','battiti','note','totale'), 'spazio':('Sonda','orbite','foto','segnali','totale'),
 'amongus':('Missione','task','energia','scorte','totale')}
for filename,edition in [('index.html','classic'),('kids/index.html','kids')]:
 html=(ROOT/filename).read_text();pack=json.loads(re.search(r'<script id="stona-data" type="application/json">(.*?)</script>',html,re.S)[1])
 if len(pack['puzzles'])!=128: raise SystemExit('Expansion already applied; edit data/catalog-*.json instead.')
 counts={}
 for p in pack['puzzles']:
  old=p['level'];i=counts.get((p['domain'],old),0);counts[p['domain'],old]=i+1
  p['legacyLevel']=old;p['level']=(old-1)*2+1+(i//2)
  # Complexity/familiarity are editorial hypotheses, not population measurements.
  text=p['rule'].lower();p['kind']='sequenza' if p['ordered'] else ('quantita' if p['domain']=='numeri' else 'parole' if p['domain']=='parole' else 'categorie' if old<=2 else 'cultura')
  p['rating']={'source':'editorial-v2','steps':1 if p['level']<=4 else 2,'memory':1 if p['level']<=2 else 2,'note':'Stima editoriale iniziale; familiarità e prestazione saranno verificate nel playtest.'}
 for domain in pack['domains']:
  prefix,*fields=contexts[domain]
  for level in range(1,11):
   have=sum(p['domain']==domain and p['level']==level for p in pack['puzzles'])
   for variant in range(4-have):
    n=variant+1;id=f'{domain}-r{level:02}-{n}'
    context='Schede inventate per un gioco di logica: non descrivono dati reali. Cerca la relazione nascosta fra i valori.'
    if domain=='amongus':context='Mini-missione inventata, ispirata ad Among Us: dati di fantasia, non una regola del videogioco. Cerca lo schema nei registri.'
    wrong=(level+n)%8
    if level<=4:
     start=n if level<3 else n+8
     steps=[1] if level==1 else [2] if level==2 else [-1] if level==3 else [1+n,2+n]
     nums=[start]
     for i in range(7):nums.append(nums[-1]+steps[i%len(steps)])
     if level==3:nums=[x+8 for x in nums]
     correct=str(nums[wrong]);broken=nums.copy();broken[wrong]+=1 if level!=1 else 2
     # Numeric quantities are concrete thematic inventory values, not fake factual knowledge.
     items=[f'{x} {fields[0]}' for x in broken];answer=f'{correct} {fields[0]}'
     choices=[answer]+[f'{int(correct)+j} {fields[0]}' for j in [1,3,4]]
     rule=(f'I valori crescono di {steps[0]} ogni volta.' if level<3 else 'I valori diminuiscono di uno a ogni passo.' if level==3 else f'Gli aumenti si alternano: +{steps[0]}, poi +{steps[1]}, e così via.')
     spec={'type':'sequence','values':nums,'unit':fields[0]}
     why=f'Al posto di {items[wrong]} serve {answer}, così ogni passaggio rispetta lo stesso schema.'
     schema=None;kind='quantita' if level==1 else 'sequenza'
    else:
     schema={'prefix':prefix,'fields':fields[:2 if level<=6 else 3 if level<=9 else 4]}
     def values(x):
      if level==5:return [x,2*x+n]
      if level==6:return [x,x*x+n]
      if level==7:return [x,2*x+n,3*x+n]
      if level==8:return [x,x*x+n,x*x+x+n]
      if level==9:
       y=x*(2 if x%2==0 else 3)+n
       return [x,y,y+x]
      y=x*(2 if x%2==0 else 3)+n;z=y-x
      return [x,y,z,y+z]
     rows=[values(x+n) for x in range(1,9)]
     def label(i,values):return prefix+' '+chr(65+i)+' · '+' · '.join(f'{f} {v}' for f,v in zip(schema['fields'],values))
     items=[label(i,row) for i,row in enumerate(rows)];answer=items[wrong];bad=rows[wrong].copy();bad[-1]+=n+1;items[wrong]=label(wrong,bad)
     choices=[answer]
     for delta in [1,3,5]:
      other=rows[wrong].copy();other[-1]+=delta;choices.append(label(wrong,other))
     a,b=schema['fields'][:2];c=schema['fields'][2] if level>=7 else '';d=schema['fields'][3] if level==10 else ''
     rule={5:f'{b.capitalize()} = 2 × {a} + {n}.',6:f'{b.capitalize()} = {a} × {a} + {n}.',7:f'{b.capitalize()} = 2 × {a} + {n}; {c} = {b} + {a}.',8:f'{b.capitalize()} = {a} × {a} + {n}; {c} = {b} + {a}.',9:f'Se {a} è pari: {b} = 2 × {a} + {n}; se è dispari: {b} = 3 × {a} + {n}. Poi {c} = {b} + {a}.',10:f'Se {a} è pari: {b} = 2 × {a} + {n}; se è dispari: {b} = 3 × {a} + {n}. Poi {c} = {b} − {a}, e {d} = {b} + {c}.'}[level]
     spec={'type':'records','formulaLevel':level,'constant':n,'rows':rows,'schema':schema}
     why=f'La scheda {chr(65+wrong)} interrompe la relazione. Con «{answer}» tutte e otto rispettano i collegamenti indicati.';kind='relazioni'
    pack['puzzles'].append({'id':id,'domain':domain,'level':level,'kind':kind,'items':items,'wrong':[wrong],'correct':answer,'choices':choices,'rule':rule,'hints':['Confronta i passaggi fra elementi vicini.' if level<=4 else 'Confronta i valori dentro ogni scheda, poi quelli delle altre schede.','Ricostruisci il valore fuori posto usando gli elementi che lo precedono e seguono.' if level<=4 else 'La relazione è sempre la stessa: verifica anche l’ultimo valore di ogni scheda.'],'why':why,'ordered':level<=4,'context':context,'schema':schema,'verification':spec,'rating':{'source':'editorial-v2','steps':1 if level<=3 else 2 if level<=6 else 3 if level<=9 else 4,'memory':1 if level<=4 else 2 if level<=8 else 3,'note':'Relazione verificabile su dati inventati; complessità crescente per operazioni, memoria e condizioni.'}})
 assert len(pack['puzzles'])==320
 pack['catalogVersion']=2
 for q in pack['puzzles']:q['revision']=1
 (ROOT/f'data/catalog-{edition}.json').write_text(json.dumps(pack,ensure_ascii=False,indent=2)+'\n')
 (ROOT/f'config/calibration-{edition}.json').write_text(json.dumps({'version':2,'edition':edition,'items':{},'note':'Nessun dato aggregato reale raccolto per questa release.'},ensure_ascii=False,indent=2)+'\n')
