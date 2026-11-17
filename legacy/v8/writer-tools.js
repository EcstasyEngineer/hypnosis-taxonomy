/* Public, static writer workspace + the ONE search function every box uses. No source identities, uploads or remote calls. */
(function () {
  'use strict';
  const kindLabels = {technique:'Lever',recipe:'Recipe',container:'Session structure',principle:'Principle'};
  const gradeLabels = {established:'Established',supported:'Supported',plausible:'Plausible',speculative:'Speculative',folk:'Folk'};
  const W = window.Writer = {
    candidatePage: 0, detailState: new Set(), selected: [], query: '', kind: '', grade: '', risk: '', leave: [], sort: 'auto', page: 0,
    mode: 'similar', match: 'any', minimum: 2, candidateRole: 'writing', rank: 'support',
    classify(n) { return n.writer_role || ({technique:'scriptwriting_move',recipe:'scriptwriting_move',container:'structural_pattern',principle:'supporting_principle'}[n.kind]) || 'scriptwriting_move'; },
    kindLabel(n) { return kindLabels[n.kind] || 'Entry'; },

    /* Search: hyphen, underscore, punctuation and case are all spaces ("yes set" = "Yes-Set"), and
       compounds people write two ways are joined ("safe word" = "safeword", "re-induction" =
       "reinduction"), in the query and the indexed text alike.
       Ranked by tier: name exact > name prefix > phrase in name > every word in name >
       phrase in one-liner > every word in one-liner > a query word IS a name word (every word somewhere) > phrase in body > every word anywhere.
       +0.5 when every query word is a whole word of the matched field; a query word of 3 letters
       or fewer that only matches as a prefix drops a tier. A hit through SYNONYMS scores 0.5 below
       the same hit on the literal word. Ties: the list order (safeguard, gentler care, more seen,
       recipe, name; recognition-only last). */
    norm(s) {
      return String(s==null?'':s).toLowerCase().replace(/\bre-(?=[a-z])/g,'re').replace(/[^a-z0-9]+/g,' ').trim()
        .replace(/(^| )(safe|count|wake) (word|down|up)(?= |$)/g,(m,p,a,b)=>/^(safe word|count down|count up|wake up)$/.test(a+' '+b)?p+a+b:m);
    },
    /* Each row exists because a probe returned nothing or a wrong first hit. A plain array is a
       set of equals; {from,to} expands one way only; when: the row applies only if that word is
       also in the query; role / starter: the alternative is a property, not a word. */
    SYNONYMS: [
      ['safeword','stop word','stop signal','exit cue'],
      ['wakeup','waking','emerge','emergence','countup','bring back'],
      {from:['rapid','instant','quick','fast'],to:['handshake','confusion','shock'],when:'induction'},
      ['aftercare','grounding','reground'],
      {from:['edging'],to:['edge']},
      {from:['spiral','pendulum','watch'],to:['fixation']},
      ['pet','petplay','pet play','puppy','kitten'],
      ['amnesia','forget'],
      {from:['safety','safe','safely','stay safe','keep safe','keep it safe'],role:'safeguard'},
      {from:['hypnotize','hypnotise','put under','induction','induce'],to:['induction','induce'],stage:'induce'},
      {from:['beginner','beginners','first time','newcomer','starter'],starter:true}
    ],
    SAFETY_HEADS: ['safeword','wakeup','aftercare','safety'],
    /* Question and filler words carry no meaning for a lookup ("is it safe" = "safe"). */
    FILLER: ['how','to','is','it','does','do','i','a','the','can','what','why','someone','them','my'],
    clean(q) { const w=q.split(' '), k=w.filter(x=>!W.FILLER.includes(x)); return k.length&&k.length<w.length?k.join(' '):q; },
    /* The safeguard band: any query with the whole word safe / safety / safely. */
    safetyQuery(q) { return /(^| )(safe|safety|safely)( |$)/.test(q); },
    stem(w) { return w.length>=7&&w.endsWith('ing')?w.slice(0,-3):w.length>=6&&w.endsWith('ed')?w.slice(0,-2):w.length>=5&&w.endsWith('s')&&!w.endsWith('ss')?w.slice(0,-1):w; },
    /* The literal query plus its synonym alternatives: [{q, words, pen, role?, starter?, head}]. */
    expand(q) {
      const out=[{q,words:q.split(' '),pen:0}], seen={[q]:1};
      const hasPhrase=(s,t)=>(' '+s+' ').includes(' '+t+' ');
      W.SYNONYMS.forEach(row=>{
        const from=Array.isArray(row)?row:row.from, to=Array.isArray(row)?row:row.to||[];
        if(row.when&&!hasPhrase(q,row.when)) return;
        from.forEach(t=>{
          if(!hasPhrase(q,t)) return;
          if(row.role||row.starter){ if(q===t) out.push({q,words:[],pen:.5,role:row.role,starter:row.starter,head:from[0]}); return; }
          if(row.stage&&q===t&&!out.some(a=>a.stage)) out.push({q,words:[],pen:.5,stage:row.stage,head:from[0]});
          to.forEach(alt=>{ if(alt===t) return; const a=(' '+q+' ').replace(' '+t+' ',' '+alt+' ').trim(); if(!seen[a]){ seen[a]=1; out.push({q:a,words:a.split(' '),pen:.5,head:from[0]}); } });
        });
      });
      return out;
    },
    prep(n) {
      if (n._nn==null) {
        n._nn=W.norm(n.name); n._no=W.norm(n.one_liner);
        // The un-joined name too, so "induction" still finds "re-induction".
        const plain=String(n.name).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
        n._nb=(plain!==n._nn?plain+' ':'')+W.norm([n.mech,n.why_short,n.principle_note,n.finding_name,(n.steps||[]).map(s=>s[1]).join(' '),(n.ex||[]).map(e=>e.f).join(' ')].join(' '));
      }
      return n;
    },
    score(n, q, words, loose) {
      W.prep(n);
      // Matches start at a word boundary, so "yes" never matches "eyes" nor "set" "reset";
      // a word prefix still matches ("fract" finds fractionation).
      const has=(s,t)=>(' '+s).includes(' '+t), whole=(s,t)=>(' '+s+' ').includes(' '+t+' ');
      const stems=words.map(W.stem);
      // A word of 3 letters or fewer matches whole ("pet" never finds "petition"); only when
      // nothing matches that way does search retry with prefixes (loose), a tier lower.
      const all=s=>stems.every((w,i)=>words[i].length<=3&&!loose?whole(s,words[i]):has(s,w));
      // Only the last word of a phrase can match as a prefix.
      const strict=!loose&&words[words.length-1].length<=3, ph=s=>strict?whole(s,q):has(s,q);
      if (n._nn===q || String(n.id)===q) return 10;
      let tier=0, field='';
      if (strict?(n._nn+' ').startsWith(q+' '):n._nn.startsWith(q)) { tier=8; field=n._nn; }
      else if (ph(n._nn)) { tier=7; field=n._nn; }
      else if (all(n._nn)) { tier=6; field=n._nn; }
      else if (ph(n._no)) { tier=5; field=n._no; }
      else if (all(n._no)) { tier=4; field=n._no; }
      else {
        const every=n._nn+' '+n._no+' '+n._nb;
        if (!all(every)) return 0;
        field=every;
        tier=words.some(w=>w.length>=3&&whole(n._nn,w))?3.5:ph(n._nb)?3:2;
      }
      if (words.every((w,i)=>whole(field,w)||whole(field,stems[i]))) tier+=.5;
      else if (words.some(w=>w.length<=3&&!whole(field,w))) tier-=1;
      return tier;
    },
    /* Item-1 list order as a search tie-break. */
    tieOrder(a,b) {
      const care=n=>{const c=n.care||n.risk;return c==='low'?0:c==='medium'?1:c==='high'?2:1.5;};
      return ((a.role==='recognition')-(b.role==='recognition'))||((b.role==='safeguard')-(a.role==='safeguard'))||(care(a)-care(b))||
        ((b.annotation_units||0)-(a.annotation_units||0))||((a.kind==='recipe'?0:1)-(b.kind==='recipe'?0:1))||a.name.localeCompare(b.name);
    },
    nameOrder(a,b) {
      const care=n=>{const c=n.care||n.risk;return c==='low'?0:c==='medium'?1:c==='high'?2:1.5;}, k=n=>n.kind==='recipe'?0:n.kind==='technique'?1:2;
      return ((a.role==='recognition')-(b.role==='recognition'))||(k(a)-k(b))||(care(a)-care(b))||((b.annotation_units||0)-(a.annotation_units||0));
    },
    inStage(n,slug) { const st=(S.stages||[]).filter(t=>(t.slug||String(t.name).replace(/^stage-/,''))===slug).map(t=>t.id); return n.stages&&n.stages.some(id=>st.includes(id)); },
    search(query, nodes) {
      const list=nodes||S.nodes, q=W.clean(W.norm(query)); if (!q) return list.slice();
      const alts=W.expand(q);
      // "beginner" is a request for the starter set, not for the word.
      if (alts.some(a=>a.starter)) return list.filter(n=>W.isStarter(n)).sort(W.tieOrder);
      // "safety" means "how do I keep this safe": every safeguard ranks with a phrase-in-name hit.
      const run=loose=>list.map(n=>{
        let best=0;
        alts.forEach(a=>{ let s=a.role?(n.role===a.role?8:0):a.stage?(W.inStage(n,a.stage)&&W.isStarter(n)?8:0):W.score(n,a.q,a.words,loose); if(s>0) s-=a.pen; if(s>best) best=s; });
        return [best,n];
      }).filter(x=>x[0]>0);
      let hits=run(false);
      if (!hits.length&&q.split(' ').some(w=>w.length<=3)) hits=run(true);
      // A safety question ("safe word", "wake up", "aftercare", "safety") is answered by the
      // safeguards first, then plain moves with no flagged risk in any form, then the rest (the
      // exit cues that keep the programming waiting, the "stop means go" inversions). Nothing
      // is dropped; each band keeps its own ranking.
      const band=alts.some(a=>W.SAFETY_HEADS.includes(a.head))||W.safetyQuery(q)?n=>n.role==='safeguard'?0:n.role!=='recognition'&&n.risk==='low'&&!(n.rk||[]).length?1:2:()=>0;
      // Every name hit short of an exact name is ONE tier: a recipe before a lever, then gentler
      // care, then the more used; the finer name score only breaks what is left.
      const tier=x=>x>=6&&x<10?6:x;
      return hits.sort((a,b)=>band(a[1])-band(b[1])||tier(b[0])-tier(a[0])||(tier(a[0])===6?W.nameOrder(a[1],b[1]):0)||b[0]-a[0]||W.tieOrder(a[1],b[1])).map(x=>x[1]);
    },
    /* Synonym heads that matched the query (for the zero-result hint). */
    synonymHeads(query) { const q=W.clean(W.norm(query)); return Array.from(new Set(W.expand(q).filter(a=>a.head).map(a=>a.head))); },

    /* A recipe that fires something the listener must already have. Every step counts only on
       an explicit marker ("the installed trigger", "a trigger that already works"), so "Fire the
       trigger." in an install loop is the install itself. An install verb earlier in the same
       text cancels it. */
    NEEDS_EXPLICIT: /\b(installed|existing|known|trained|established|working) (trigger|cue|anchor)s?\b|\b(trigger|cue|anchor)s? (that|which) (already|they already)\b|\balready (works|installed|trained|responds)\b/i,
    INSTALLS: /\b(install|pair|teach|build|condition)/i,
    firesFirst(text) { const m=W.NEEDS_EXPLICIT.exec(text||''); return !!m&&!W.INSTALLS.test(text.slice(0,m.index).replace(W.NEEDS_EXPLICIT,'')); },
    /* Levers that by definition fire something installed earlier ("Say a trigger that was
       really installed before"). When step 1 links one, the recipe opens by firing something
       the listener must already have, whatever the step text says. (Later steps are left to the
       text rule: "Test by firing it alone" after an install is the install's own test.) */
    NEEDS_INSTALL_LEVERS: ['trigger-activation'],
    firesLever(step) { const lv=step[0]!=null&&S.byId&&S.byId[step[0]]; return !!lv&&W.NEEDS_INSTALL_LEVERS.includes(lv.name); },
    prerequisite(n) {
      if(n._pre!==undefined) return n._pre;
      n._pre=false;
      if(n.kind==='recipe'&&n.steps&&n.steps.length){
        const first=n.steps[0][1];
        if(W.firesFirst(first)||W.firesLever(n.steps[0])) n._pre=true;
        else if(!W.INSTALLS.test(first)) n._pre=W.firesFirst(n.one_liner);
        for(let i=1;!n._pre&&!W.INSTALLS.test(first)&&i<n.steps.length;i++){ const t=n.steps[i][1]; if(W.INSTALLS.test(t.replace(W.NEEDS_EXPLICIT,''))&&!W.firesFirst(t)) break; n._pre=W.firesFirst(t); }
      }
      return n._pre;
    },
    /* "Start here": a recipe a newcomer can run as written. Standard care at its core, no
       earlier install needed, not aimed at mind control, no core chip against the stop, the undo
       or agreement ("some forms" is the convention for "the plain form is fine"). */
    NOT_A_START: ['undercuts-no','no-undo','not-agreed'],
    isStarter(n) {
      const mind=(S.goals||[]).filter(t=>(t.slug||String(t.name).replace(/^goal-/,''))==='mind-control').map(t=>t.id);
      return n.kind==='recipe'&&n.care==='low'&&!W.prerequisite(n)&&n.role!=='recognition'&&!n.goals.some(g=>mind.includes(g))&&
        !(n.rk||[]).some(c=>W.NOT_A_START.includes(c[0])&&c[1]==null);
    },


    restore() {
      try { W.selected = JSON.parse(sessionStorage.getItem('writer-pins') || '[]').filter((x,i,a) => Number.isInteger(x) && S.byId[x] && a.indexOf(x) === i).slice(0,4); } catch (_) { W.selected=[]; }
      W.updatePins();
    },
    toggle(id) {
      if (!S.byId[id]) return;
      if (W.selected.includes(id)) W.selected=W.selected.filter(x=>x!==id);
      else if (W.selected.length<4) W.selected.push(id);
      else { W.announce('Four entries are pinned. Unpin an entry in your workspace to add another.'); const button=document.activeElement; if(button&&button.matches('[data-pin]')){let feedback=button.parentElement.querySelector('.writer-cap-feedback');if(!feedback){feedback=document.createElement('p');feedback.className='writer-cap-feedback';button.after(feedback);}feedback.textContent='4 of 4 pinned. Unpin an entry to add this one.';} return; }
      try { sessionStorage.setItem('writer-pins',JSON.stringify(W.selected)); } catch (_) {}
      document.querySelectorAll('.writer-cap-feedback').forEach(el=>el.remove());
      W.updatePins();
      window.dispatchEvent(new CustomEvent('writer-selection',{detail:W.selected.slice()}));
      W.announce(W.selected.length+' of 4 entries pinned for comparison.');
      if (currentRoute && currentRoute.startsWith('workbench')) { currentRoute='workbench'+(W.selected.length?'/'+W.selected.join(','):''); history.replaceState(null,'','#/'+currentRoute); W.rememberDetails(); W.renderBoard(document.getElementById('view')); const focus=document.querySelector('[data-pin="'+id+'"]')||document.querySelector('.pinned-heading h3'); if(focus){focus.tabIndex=0;focus.focus({preventScroll:true});} }
    },
    announce(text) { const el=document.getElementById('writerStatus'); if(el) el.textContent=text; let notice=document.getElementById('writerNotice'); if(!notice&&text.startsWith('Four entries')){notice=document.createElement('p');notice.id='writerNotice';notice.className='writer-notice';document.getElementById('view').prepend(notice);} if(notice) notice.textContent=text; },
    workspaceURL() { return '#/workbench'+(W.selected.length?'/'+W.selected.join(','):''); },
    rememberDetails() { document.querySelectorAll('details[data-detail]').forEach(el=>{if(el.open)W.detailState.add(el.dataset.detail);else W.detailState.delete(el.dataset.detail);}); },
    restoreDetails() { document.querySelectorAll('details[data-detail]').forEach(el=>{el.open=W.detailState.has(el.dataset.detail);}); },
    /* What you do: the one-liner (the how-to is on the entry page). */
    operation(n) { return '<p>'+esc(n.one_liner||n.mech||'No description recorded.')+'</p>'; },
    /* Recipes: the ordered steps, each linking its lever — the reason to pin two recipes. */
    steps(n) {
      if (!n.steps||!n.steps.length) return '';
      return '<ol class="compare-steps">'+n.steps.map(s=>{const lv=s[0]!=null?S.byId[s[0]]:null;return '<li>'+esc(s[1])+(lv?' <a href="#/entry/'+lv.id+'">'+esc(lv._title)+'</a>':'')+'</li>';}).join('')+'</ol>';
    },
    why(n) {
      return (n.evidence_grade?'<p class="grade">'+gradePill(n.evidence_grade)+'</p>':'')+(n.why_short?'<p>'+esc(n.why_short)+'</p>':'');
    },
    pinButton(id, unpin) { const on=W.selected.includes(id); return '<button class="pin-btn" data-pin="'+id+'"'+(unpin?' data-unpin':'')+' aria-pressed="'+on+'" aria-label="'+(on?'Unpin ':'Pin ')+esc(S.byId[id]._title)+'">'+W.pinText(on,unpin)+'</button>'; },
    /* On a compare card the button can only remove, so it says so; elsewhere it shows the state. */
    pinText(on, unpin) { return on?(unpin?'Unpin':'Pinned ✓'):'+ Pin'; },
    updatePins() {
      document.querySelectorAll('[data-pin]').forEach(el=>{const on=W.selected.includes(+el.dataset.pin); el.textContent=W.pinText(on,el.hasAttribute('data-unpin')); el.setAttribute('aria-pressed',on); el.setAttribute('aria-label',(on?'Unpin ':'Pin ')+(S.byId[+el.dataset.pin]||{})._title);});
      document.querySelectorAll('a[href^="#/workbench"], a[data-workspace-link]').forEach(el=>{el.dataset.workspaceLink='true';el.href=W.workspaceURL();});
      document.querySelectorAll('[data-compare-cta]').forEach(el=>{el.hidden=!W.selected.length;});
      document.querySelectorAll('[data-compare-n]').forEach(el=>{el.textContent='Compare ('+W.selected.length+')';});
      const link=document.getElementById('workbenchLink'); if(link) { link.textContent='Compare'+(W.selected.length?' ('+W.selected.length+')':''); link.href='#/workbench'+(W.selected.length?'/'+W.selected.join(','):''); }
    },
    /* The sort the table actually uses: with nothing typed, the goal pages' gentlest-first order;
       with a query, best match, unless the reader picked one. */
    effectiveSort() { return W.sort==='auto'?(W.norm(W.query)?'relevance':'gentle'):W.sort; },
    renderTable(view) {
      view.innerHTML=crumbs([['#/','Home']],'All entries')+
        '<div class="writer-heading"><div><h2>All entries</h2><p>Every entry, gentlest first. Search or narrow by kind, grade and care, then pin up to four to compare.</p></div><a class="primary-action" data-compare-cta href="#/workbench"'+(W.selected.length?'':' hidden')+'>Compare pinned →</a></div>'+
        // Search stays visible; on a phone the other controls fold behind one "Filters" toggle, as on the list pages.
        '<div class="writer-filters listfilters tablefilters"><label class="ftext">Search entries<input id="tableQuery" type="search" placeholder="Try yes set, countdown, metaphor…" value="'+esc(W.query)+'"></label>'+
        '<details class="morefilters" id="moreFilters"><summary id="moreSum">Filters</summary><div class="mf-box">'+
        '<label>Kind<select id="tableKind"><option value="">All kinds</option>'+Object.entries(kindLabels).map(([k,v])=>'<option value="'+k+'"'+(W.kind===k?' selected':'')+'>'+v+'</option>').join('')+'</select></label>'+
        '<label>Grade<select id="tableGrade"><option value="">Any grade</option>'+Object.entries(gradeLabels).map(([k,v])=>'<option value="'+k+'">'+v+'</option>').join('')+'</select></label>'+
        riskControls()+
        '<label>Sort by<select id="tableSort"><option value="gentle">Gentlest first</option><option value="relevance">Best match</option><option value="seen">Most used</option><option value="name">Name</option></select></label></div></details></div>'+
        '<p class="risklegend">'+LEGEND+' · <a href="#/risk">What the risk labels mean →</a></p><p id="writerNotice" class="writer-notice"></p><p id="tableCount" class="result-count" role="status"></p><div id="writerTable"></div><div id="tablePager" class="pager"></div>';
      document.getElementById('tableGrade').value=W.grade;
      const mf=document.getElementById('moreFilters'), active=()=>(W.kind?1:0)+(W.grade?1:0)+(W.risk?1:0)+(W.leave.length?1:0);
      W.syncFilters=()=>{const n=active();document.getElementById('moreSum').textContent='Filters'+(n?' ('+n+' active)':'');if(n||!(window.matchMedia&&matchMedia('(max-width:640px)').matches))mf.open=true;};
      mf.open=false; W.syncFilters();
      document.getElementById('tableQuery').addEventListener('input',e=>{W.query=e.target.value;W.page=0;W.paintTable();});
      document.getElementById('tableKind').addEventListener('change',e=>{W.kind=e.target.value;W.page=0;W.paintTable();});
      document.getElementById('tableGrade').addEventListener('change',e=>{W.grade=e.target.value;W.page=0;W.paintTable();});
      // W.risk keeps its name: it now holds the CARE ceiling ('' | 'medium' | 'low').
      bindRiskControls({get care(){return W.risk;},set care(v){W.risk=v;},get leave(){return W.leave;},set leave(v){W.leave=v;}},()=>{W.page=0;W.paintTable();});
      document.getElementById('tableSort').addEventListener('change',e=>{W.sort=e.target.value;W.page=0;W.paintTable();});
      W.paintTable();
    },
    filtered() {
      const rows=W.search(W.query).filter(n=>(!W.kind||n.kind===W.kind)&&(!W.grade||n.evidence_grade===W.grade)&&riskPass(n,{care:W.risk,leave:W.leave}));
      const sort=W.effectiveSort(), hasQuery=!!W.norm(W.query);
      if (sort==='seen'||sort==='relevance'&&!hasQuery) return rows.sort((a,b)=>(b.annotation_units||0)-(a.annotation_units||0)||a.name.localeCompare(b.name));
      if (sort==='name') return rows.sort((a,b)=>a.name.localeCompare(b.name));
      if (sort==='gentle') return rows.sort(typeof byStarter==='function'?byStarter:W.tieOrder);
      return rows;
    },
    paintTable() {
      if(W.syncFilters&&document.getElementById('moreFilters')) W.syncFilters();
      const rows=W.filtered(), limit=30; W.page=Math.min(W.page,Math.max(0,Math.ceil(rows.length/limit)-1));
      const sel=document.getElementById('tableSort'); if(sel) sel.value=W.effectiveSort();
      document.getElementById('tableCount').textContent=(rows.length===1?'1 entry':rows.length+' entries')+(rows.length>limit?' · '+(W.page*limit+1)+'–'+Math.min(rows.length,(W.page+1)*limit):'');
      document.getElementById('writerTable').innerHTML=rows.length?'<table class="writer-table"><caption class="sr-only">Entries matching your filters</caption><thead><tr><th scope="col">Entry</th><th scope="col">What you do</th><th scope="col">In scripts</th><th scope="col"><span class="sr-only">Compare</span></th></tr></thead><tbody>'+rows.slice(W.page*limit,(W.page+1)*limit).map(n=>'<tr><td><a class="knav entry-title" href="#/entry/'+n.id+'">'+esc(n._title)+'</a>'+(n.kind==='recipe'?'<span class="rmeta">'+(n.steps||[]).length+' steps</span>':'')+'</td><td class="table-operation"><p>'+careMark(n)+esc(n.one_liner||n.mech||'')+'</p></td><td class="seen"><span class="mobile-label">Seen in </span>'+(n.annotation_units||0)+'<span class="mobile-label"> scripts</span></td><td>'+W.pinButton(n.id)+'</td></tr>').join('')+'</tbody></table>':'<div class="empty">No entries match these filters. Try fewer words or another kind.</div>';
      const pages=Math.ceil(rows.length/limit);
      document.getElementById('tablePager').innerHTML=pages<=1?'':'<button id="tablePrev" '+(!W.page?'disabled':'')+'>← Previous</button><span>Page '+(W.page+1)+' of '+pages+'</span><button id="tableNext" '+((W.page+1)*limit>=rows.length?'disabled':'')+'>Next →</button>';
      if(pages>1) document.getElementById('tablePrev').onclick=()=>{W.page--;W.paintTable();const focus=document.getElementById('tableCount');focus.tabIndex=-1;focus.focus({preventScroll:true});focus.scrollIntoView({block:'start'});};
      if(pages>1) document.getElementById('tableNext').onclick=()=>{W.page++;W.paintTable();const focus=document.getElementById('tableCount');focus.tabIndex=-1;focus.focus({preventScroll:true});focus.scrollIntoView({block:'start'});};
      W.updatePins();
    },
    recommend(mode=W.mode, match=W.match) {
      const candidates=new Map();
      W.selected.forEach(id=>{
        // Co-occurrence below chance (lift < 1) is not a lead, so it is never offered.
        const links=mode==='similar'?(S.byId[id].nb||[]).map(t=>({id:t[0],sim:t[1]})):mode==='relations'?(S.seeAlso[id]||[]).map(x=>({id:x.o})): (mode==='cooccurrence'?(S.cooc[id]||[]).filter(t=>t[2]>=1):S.next[id]||[]).filter(t=>t[1]>=W.minimum).map(t=>({id:t[0],count:t[1],...(mode==='cooccurrence'?{value:t[2]}:{})}));
        links.forEach(link=>{
          if(!S.byId[link.id]||W.selected.includes(link.id)) return;
          const role=W.classify(S.byId[link.id]);
          if(W.candidateRole==='writing'&&!['scriptwriting_move','structural_pattern'].includes(role)) return;
          const item=candidates.get(link.id)||{id:link.id,basis:[],score:0};
          if(item.basis.some(b=>b.from===id))return;
          item.basis.push({...link,from:id}); item.score+=link.count||link.sim||1; candidates.set(link.id,item);
        });
      });
      const rank=x=>mode==='cooccurrence'&&W.rank==='lift'?x.basis.reduce((sum,b)=>sum+b.value,0)/x.basis.length:x.score;
      return Array.from(candidates.values()).filter(x=>match!=='all'||x.basis.length===W.selected.length).sort((a,b)=>b.basis.length-a.basis.length||rank(b)-rank(a)||S.byId[a.id].name.localeCompare(S.byId[b.id].name));
    },
    /* The risk labels this pin has and the other pins lack: "Only this one: Undercuts the no, Blocks undo". */
    differs(n) {
      if(W.selected.length<2) return '';
      const others=new Set(); W.selected.forEach(id=>{ if(id!==n.id) (S.byId[id].rk||[]).forEach(c=>others.add(c[0])); });
      const mine=Array.from(new Set((n.rk||[]).map(c=>c[0]))).filter(s=>!others.has(s));
      return mine.length?'<p class="cc-differs">Only this one: '+mine.map(s=>esc(chipLabel(s))).join(', ')+'</p>':'';
    },
    /* Seven rows, always: a missing facet is a muted dash, so the rows align across cards. */
    compareCard(n) {
      const dash='<p class="cc-none">—</p>', row=(label,body)=>'<div class="cc-row"><h4>'+label+'</h4>'+(body||dash)+'</div>';
      // Care lives in the Risk row only; the eyebrow is the kind.
      return '<article class="compare-card" id="cmp-'+n.id+'"><div class="cc-head"><p class="cc-kind">'+esc(W.kindLabel(n))+'</p><h3><a href="#/entry/'+n.id+'">'+esc(n._title)+'</a></h3>'+W.differs(n)+W.pinButton(n.id,true)+'</div>'+
        row('What you do',W.operation(n))+row('Risk',riskBlock(n,{compact:true,nolegend:true}))+row('Why it works',W.why(n))+row('Steps',W.steps(n))+
        row('Examples',n.ex&&n.ex.length?'<details class="more" data-detail="pin-'+n.id+'-examples"><summary>'+(n.ex.length===1?'1 example':n.ex.length+' examples')+'</summary>'+W.examples(n)+'</details>':'')+
        row('Seen in',n.annotation_units?'<p>'+n.annotation_units+' of '+((S.meta||{}).annotation_coverage||{}).annotated_units+' scripts</p>':'')+'</article>';
    },
    renderBoard(view) {
      const pins=W.selected.map(id=>S.byId[id]);
      view.innerHTML=crumbs([['#/','Home'],['#/table','All entries']],'Compare')+
        '<div class="writer-heading"><div><h2>Compare</h2><p>Pin up to four entries to read them side by side.</p></div></div>'+
        '<p id="writerNotice" class="writer-notice"></p>'+
        (pins.length?'<div class="pinned-heading"><h3>Pinned · '+pins.length+' of 4</h3><a href="#/table">+ Find an entry</a></div>'+
          '<nav class="cmp-names" aria-label="Jump to a pinned entry">'+pins.map(n=>'<button type="button" data-cmp="'+n.id+'">'+esc(n._title)+'</button>').join('')+'</nav>'+
          '<div class="compare-grid" tabindex="0" aria-label="Pinned entries side by side">'+pins.map(W.compareCard).join('')+'</div>'+
          (pins.some(n=>(n.rk||[]).some(c=>c[1]))?'<p class="cc-legend">Dashed risk label = only some forms · <a href="#/risk">What the risk labels mean →</a></p>':'')
        :'<div class="workspace-empty"><h3>Nothing pinned yet.</h3><p>Pin entries from All entries, an entry page or the network.</p><a class="primary-action" href="#/table">All entries →</a></div>')+
        (pins.length?'<section class="candidate-section"><h3>Related to your pins</h3><div class="writer-filters"><label>Related by<select id="recommendMode"><option value="similar">Similar in meaning</option><option value="relations">Related (curated)</option><option value="cooccurrence">In the same scripts</option><option value="sequence">Comes next in scripts</option></select></label><label>Must relate to<select id="recommendMatch"><option value="any">Any pin</option><option value="all">Every pin</option></select></label><label>Show<select id="candidateRole"><option value="writing">Moves and structures</option><option value="all">Everything, including principles</option></select></label><label id="rankingLabel">Rank by<select id="candidateRank"><option value="support">How often</option><option value="lift">How much more than chance</option></select></label><label id="minimumLabel">Seen at least (times)<input id="minimumSupport" type="number" min="1" max="10000" value="'+W.minimum+'"></label></div><p id="candidateMeaning" class="evidence-note"></p><p id="candidateCount" role="status"></p><div id="candidateList" class="candidate-list"></div><div id="candidatePager" class="pager"></div></section>'+
          '<details class="more methodology"><summary>What these connections can tell you</summary>'+W.coverageNote()+'<p>“Similar” means close in meaning (embedding similarity of what each entry does), not interchangeable. “Related” is a hand-made link, not a recommended order. “In the same scripts” counts scripts that use both entries; “× chance” compares that with what you would expect if they were unrelated. “Comes next” counts back-to-back uses. None of these show that a combination works, only that writers use it.</p><p>A candidate related to every pin is linked to each pin separately; that does not mean all of them appeared together in one script.</p></details>'+
          '<details class="more workspace-export"><summary>Export for writers</summary><label>Candidate detail<select id="exportDetail" class="ctl"><option value="compact">Summaries and links</option><option value="full">Full examples</option></select></label><button id="exportWorkspace" type="button">Export JSON ↓</button><p class="export-note">Pinned entries always include full examples.</p></details>':'');
      if(!pins.length)return;
      document.getElementById('exportWorkspace').onclick=W.export;
      view.querySelectorAll('[data-cmp]').forEach(a=>a.addEventListener('click',()=>{const c=document.getElementById('cmp-'+a.dataset.cmp);if(c){c.scrollIntoView({block:'nearest',inline:'start'});c.querySelector('h3 a').focus({preventScroll:true});}}));
      [['recommendMode','mode'],['recommendMatch','match'],['candidateRole','candidateRole'],['candidateRank','rank']].forEach(([id,key])=>{const el=document.getElementById(id);el.value=W[key];el.onchange=()=>{W[key]=el.value;W.candidatePage=0;W.paintCandidates();};});
      document.getElementById('minimumSupport').oninput=e=>{W.candidatePage=0;W.minimum=Math.max(1,Math.min(10000,Math.floor(+e.target.value)||1));W.paintCandidates();};
      W.restoreDetails(); W.paintCandidates(); W.updatePins();
    },
    coverageNote() {
      const c=(S.meta||{}).annotation_coverage||{};
      if(!Number.isFinite(c.annotated_units)) return '<p>Script coverage is unavailable in this edition.</p>';
      return '<p><strong>Current data:</strong> '+S.nodes.length+' entries, tagged line by line in '+c.annotated_units+' scripts and texts. Some of those files may be versions of the same script, so the counts are approximate.</p>';
    },
    /* Title, then the line to say, then setup and illustration behind one disclosure (open when
       the example has no line to say). */
    examples(n, list) {
      return (list||n.ex||[]).map(ex=>'<div class="writer-example">'+(ex.f?'<h4>'+esc(ex.f)+'</h4>':'')+
        (ex.m?'<blockquote class="sayit"><b>'+(n.role==='recognition'?'What it sounds like:':'Say it like this:')+'</b> '+esc(ex.m)+'</blockquote>':'')+
        (ex.s||ex.t?'<details class="more"'+(ex.m?'':' open')+'><summary>Setup and illustration</summary>'+(ex.s?'<p><b>Setup:</b> '+esc(ex.s)+'</p>':'')+(ex.t?'<p>'+esc(ex.t)+'</p>':'')+'</details>':'')+
        '</div>').join('')||'<p>No worked example in this edition.</p>';
    },
    basisText(b, mode) {
      if(mode==='similar') return 'Similar to '+S.byId[b.from]._title;
      if(mode==='relations') return 'Related to '+S.byId[b.from]._title;
      if(mode==='cooccurrence') return 'With '+S.byId[b.from]._title+': in '+b.count+' of the same scripts'+(b.count>=3?' · '+(b.value>=10?Math.round(b.value):Number(b.value).toFixed(1))+'× chance':'');
      return 'After '+S.byId[b.from]._title+': '+b.count+' times';
    },
    /* The short muted suffix on a candidate row: "like Fractionation", "after Yes set · 5 times". */
    basisShort(item, mode) {
      const b=item.basis[0], t=S.byId[b.from]._title, more=item.basis.length>1?' and '+(item.basis.length-1)+' more':'';
      return (mode==='similar'?'like ':mode==='relations'?'related to ':mode==='cooccurrence'?'with ':'after ')+t+more+
        (mode==='cooccurrence'?' · '+b.count+' scripts':mode==='sequence'?' · '+b.count+' times':'');
    },
    paintCandidates() {
      W.rememberDetails(); let list=W.recommend(), limit=12, widened=false;
      // Nothing relates to EVERY pin: show what relates to any pin instead of an empty list.
      if(!list.length&&W.match==='all'&&W.selected.length>1){ const any=W.recommend(W.mode,'any'); if(any.length){ list=any; widened=true; } } W.candidatePage=Math.min(W.candidatePage,Math.max(0,Math.ceil(list.length/limit)-1));
      document.getElementById('minimumLabel').hidden=W.mode==='relations'||W.mode==='similar';
      document.getElementById('rankingLabel').hidden=W.mode!=='cooccurrence';
      const meaning=document.getElementById('candidateMeaning');
      meaning.textContent=W.mode==='similar'?'Similar in meaning. Read both before swapping.':W.mode==='relations'?'':W.mode==='cooccurrence'?'Used somewhere in the same script, not necessarily next to each other. Common together does not mean they work together.':'Used right after the pinned entry in a script. A habit of writers, not a required order.';
      meaning.hidden=!meaning.textContent;
      document.getElementById('candidateCount').textContent=(widened?'Nothing relates to every pin, so showing what relates to any pin: ':'')+(list.length===1?'1 candidate':list.length+' candidates')+(list.length>limit?' · showing '+(W.candidatePage*limit+1)+'–'+Math.min(list.length,(W.candidatePage+1)*limit):'');
      document.getElementById('candidateList').innerHTML=list.slice(W.candidatePage*limit,(W.candidatePage+1)*limit).map(item=>{const n=S.byId[item.id];
        return '<div class="cand-row"><a class="mrow knav" href="#/entry/'+n.id+'"><div class="mname">'+esc(n._title)+'</div><p class="mmech">'+careMark(n)+'<span class="like">'+esc(W.basisShort(item,W.mode))+'</span><span class="dotsep"> · </span>'+esc(n.one_liner||n.mech||'')+'</p></a>'+W.pinButton(n.id)+'</div>';}).join('')||(W.match==='all'?'<div class="empty">No candidate relates to every pin with these filters. Try “Any pin” or another kind of relation.</div>':'<div class="empty">No candidates match these filters. Try showing everything or lowering the minimum.</div>');
      const pager=document.getElementById('candidatePager');
      pager.innerHTML=list.length>limit?'<button id="candidatePrev" '+(!W.candidatePage?'disabled':'')+'>← Previous candidates</button><span>Page '+(W.candidatePage+1)+' of '+Math.ceil(list.length/limit)+'</span><button id="candidateNext" '+((W.candidatePage+1)*limit>=list.length?'disabled':'')+'>Next candidates →</button>':'';
      [['candidatePrev',-1],['candidateNext',1]].forEach(([id,step])=>{const el=document.getElementById(id);if(el)el.onclick=()=>{W.candidatePage+=step;W.paintCandidates();const count=document.getElementById('candidateCount');count.tabIndex=-1;count.focus({preventScroll:true});count.scrollIntoView({block:'start'});};});
      W.updatePins(); W.restoreDetails();
    },
    exportPayload() {
      const full=n=>({id:n.id,name:n.name,kind:n.kind,writer_role:W.classify(n),one_liner:n.one_liner,mechanism:n.mech,why_short:n.why_short,evidence_grade:n.evidence_grade||null,finding_name:n.finding_name||null,finding_url:n.finding_url||null,steps:n.steps||null,examples:n.ex||[],examples_withheld:n.examples_withheld||0,annotation_units:n.annotation_units,care:n.care||null,risk:n.risk||null,
        risk_chips:n.rk?n.rk.map(([slug,condition])=>({slug,label:(S.riskCat&&S.riskCat[slug]||{}).label||slug,applies:condition?'conditional':'core',condition:condition||null})):null,risk_role:n.role||null,risk_note:n.rr||null});
      const detail=document.getElementById('exportDetail')?.value||'compact';
      const candidate=n=>{const entry=full(n);if(detail==='compact'){delete entry.examples;entry.examples_omitted_from_export=(n.ex||[]).length;entry.entry_url=new URL('#/entry/'+n.id,location.href).href;}return entry;};
      const payload={schema_version:3,candidate_detail:detail,workspace_url:new URL(W.workspaceURL(),location.href).href,exported_at:new Date().toISOString(),data_meta:S.meta,query:{selected_ids:W.selected.slice(),connection:W.mode,match:W.match,minimum_support:W.mode==='relations'||W.mode==='similar'?null:W.minimum,roles:W.candidateRole,ranking:W.mode==='cooccurrence'?W.rank:'support'},method:'Pairwise candidate retrieval, not a generated or validated sequence. Pairwise intersections do not imply joint source occurrence. Counts do not demonstrate outcomes.',selected:W.selected.map(id=>full(S.byId[id])),candidates:W.recommend().map(x=>({entry:candidate(S.byId[x.id]),basis:x.basis.map(b=>({...b,explanation:W.basisText(b,W.mode)}))}))};
      return payload;
    },
    export() {
      const payload=W.exportPayload();
      const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='workspace.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    }
  };
  document.addEventListener('click',e=>{const button=e.target.closest('[data-pin]');if(button)W.toggle(+button.dataset.pin);});
})();
