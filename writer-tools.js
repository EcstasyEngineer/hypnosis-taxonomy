/* Public, static writer workspace + the ONE search function every box uses. No source identities, uploads or remote calls. */
(function () {
  'use strict';
  const kindLabels = {technique:'Lever',recipe:'Recipe',container:'Session structure',principle:'Principle'};
  const gradeLabels = {established:'Established',supported:'Supported',plausible:'Plausible',speculative:'Speculative',folk:'Folk'};
  const W = window.Writer = {
    candidatePage: 0, detailState: new Set(), selected: [], query: '', kind: '', risk: '', sort: 'relevance', page: 0,
    mode: 'relations', match: 'all', minimum: 2, candidateRole: 'writing', rank: 'support',
    classify(n) { return n.writer_role || ({technique:'scriptwriting_move',recipe:'scriptwriting_move',container:'structural_pattern',principle:'supporting_principle'}[n.kind]) || 'scriptwriting_move'; },
    kindLabel(n) { return kindLabels[n.kind] || 'Entry'; },
    kindBadge(n) { return '<span class="kind-badge k-'+esc(n.kind)+'">'+esc(W.kindLabel(n))+'</span>'; },

    /* Search: hyphen, underscore, punctuation and case are all spaces ("yes set" = "Yes-Set").
       Ranked by tier: name exact > name prefix > phrase in name > every word in name >
       phrase in one-liner > every word in one-liner > a query word IS a name word (every word somewhere) > phrase in body > every word anywhere.
       Ties: recipes before other kinds, then more often seen in the annotated scripts, then name. */
    norm(s) { return String(s==null?'':s).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim(); },
    prep(n) {
      if (n._nn==null) {
        n._nn=W.norm(n.name); n._no=W.norm(n.one_liner);
        n._nb=W.norm([n.mech,n.why_short,n.principle_note,n.finding_name,(n.steps||[]).map(s=>s[1]).join(' '),(n.ex||[]).map(e=>e.f).join(' ')].join(' '));
      }
      return n;
    },
    score(n, q, words) {
      W.prep(n);
      // Matches start at a word boundary, so "yes" never matches "eyes" nor "set" "reset";
      // a word prefix still matches ("fract" finds fractionation).
      const has=(s,t)=>(' '+s).includes(' '+t);
      const all=s=>words.every(w=>has(s,w));
      if (n._nn===q || String(n.id)===q) return 9;
      if (n._nn.startsWith(q)) return 8;
      if (has(n._nn,q)) return 7;
      if (all(n._nn)) return 6;
      if (has(n._no,q)) return 5;
      if (all(n._no)) return 4;
      const nameWords=' '+n._nn+' ', everywhere=n._nn+' '+n._no+' '+n._nb;
      // Loose AND (substrings) for the two broadest tiers, so a name hit still needs every word.
      const loose=words.every(w=>everywhere.includes(w));
      if (loose&&words.some(w=>w.length>=3&&nameWords.includes(' '+w+' '))) return 3.5;
      if (has(n._nb,q)) return 3;
      if (loose) return 2;
      return 0;
    },
    search(query, nodes) {
      const q=W.norm(query); if (!q) return (nodes||S.nodes).slice();
      const words=q.split(' ');
      return (nodes||S.nodes).map(n=>[W.score(n,q,words),n]).filter(x=>x[0]>0)
        .sort((a,b)=>b[0]-a[0]||(a[1].kind==='recipe'?0:1)-(b[1].kind==='recipe'?0:1)||(b[1].annotation_units||0)-(a[1].annotation_units||0)||a[1].name.localeCompare(b[1].name)).map(x=>x[1]);
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
    /* What you do (one-liner) up front; the full "how it's done" behind a disclosure. */
    operation(n, key) {
      const lead=n.one_liner||n.mech||'No description recorded.';
      return '<p>'+esc(lead)+'</p>'+(n.one_liner&&n.mech?'<details data-detail="'+key+'-operation"><summary>How it’s done</summary><p>'+esc(n.mech)+'</p></details>':'');
    },
    /* Recipes: the ordered steps, each linking its lever — the reason to pin two recipes. */
    steps(n) {
      if (!n.steps||!n.steps.length) return '';
      return '<h4>Steps</h4><ol class="compare-steps">'+n.steps.map(s=>{const lv=s[0]!=null?S.byId[s[0]]:null;return '<li>'+esc(s[1])+(lv?' <a href="#/entry/'+lv.id+'">'+esc(lv._title)+'</a>':'')+'</li>';}).join('')+'</ol>';
    },
    why(n) {
      return (n.why_short?'<p>'+esc(n.why_short)+'</p>':'')+(n.evidence_grade?'<p class="grade"><span class="grade-badge g-'+esc(n.evidence_grade)+'">'+gradeLabels[n.evidence_grade]+'</span></p>':'');
    },
    pinButton(id) { const on=W.selected.includes(id); return '<button class="pin-btn" data-pin="'+id+'" aria-pressed="'+on+'" aria-label="'+(on?'Unpin ':'Pin ')+esc(S.byId[id]._title)+'">'+(on?'Pinned ✓':'+ Pin')+'</button>'; },
    updatePins() {
      document.querySelectorAll('[data-pin]').forEach(el=>{const on=W.selected.includes(+el.dataset.pin); el.textContent=on?'Pinned ✓':'+ Pin'; el.setAttribute('aria-pressed',on); el.setAttribute('aria-label',(on?'Unpin ':'Pin ')+(S.byId[+el.dataset.pin]||{})._title);});
      document.querySelectorAll('a[href="#/workbench"], a[data-workspace-link]').forEach(el=>{el.dataset.workspaceLink='true';el.href=W.workspaceURL();});
      const link=document.getElementById('workbenchLink'); if(link) { link.textContent='Workspace'+(W.selected.length?' · '+W.selected.length:''); link.href='#/workbench'+(W.selected.length?'/'+W.selected.join(','):''); }
    },
    renderTable(view) {
      view.innerHTML=crumbs([['#/','Home']],'Browse & compare')+
        '<div class="writer-heading"><div><p class="eyebrow">EVERY ENTRY</p><h2>Find the one that fits.</h2><p>Search what each entry does, narrow by kind or risk, then pin up to four to compare side by side.</p></div><a class="primary-action" href="#/workbench">Open workspace →</a></div>'+
        '<div class="writer-filters"><label>Search entries<input id="tableQuery" type="search" placeholder="Try yes set, countdown, metaphor…" value="'+esc(W.query)+'"></label>'+
        '<label>Kind<select id="tableKind"><option value="">All kinds</option>'+Object.entries(kindLabels).map(([k,v])=>'<option value="'+k+'"'+(W.kind===k?' selected':'')+'>'+v+'</option>').join('')+'</select></label>'+
        '<label>Risk<select id="tableRisk"><option value="">Any risk</option><option value="low">Low only</option><option value="medium">Low or medium</option></select></label>'+
        '<label>Sort by<select id="tableSort"><option value="relevance">Best match</option><option value="name">Name</option><option value="seen">Most seen in scripts</option></select></label></div>'+
        '<p id="writerNotice" class="writer-notice"></p><p id="tableCount" class="result-count" role="status"></p><div id="writerTable"></div><div id="tablePager" class="pager"></div>';
      document.getElementById('tableSort').value=W.sort; document.getElementById('tableRisk').value=W.risk;
      document.getElementById('tableQuery').addEventListener('input',e=>{W.query=e.target.value;W.page=0;W.paintTable();});
      document.getElementById('tableKind').addEventListener('change',e=>{W.kind=e.target.value;W.page=0;W.paintTable();});
      document.getElementById('tableRisk').addEventListener('change',e=>{W.risk=e.target.value;W.page=0;W.paintTable();});
      document.getElementById('tableSort').addEventListener('change',e=>{W.sort=e.target.value;W.page=0;W.paintTable();});
      W.paintTable();
    },
    filtered() {
      const hasQuery=!!W.norm(W.query);
      const rows=W.search(W.query).filter(n=>(!W.kind||n.kind===W.kind)&&(!W.risk||n.risk==='low'||(W.risk==='medium'&&n.risk==='medium')));
      if (W.sort==='seen') return rows.sort((a,b)=>(b.annotation_units||0)-(a.annotation_units||0)||a.name.localeCompare(b.name));
      if (W.sort==='name'||!hasQuery) return rows.sort((a,b)=>a.name.localeCompare(b.name));
      return rows;
    },
    paintTable() {
      W.rememberDetails(); const rows=W.filtered(), limit=30; W.page=Math.min(W.page,Math.max(0,Math.ceil(rows.length/limit)-1));
      document.getElementById('tableCount').textContent=(rows.length===1?'1 entry':rows.length+' entries')+(rows.length?' · '+(W.page*limit+1)+'–'+Math.min(rows.length,(W.page+1)*limit):'');
      document.getElementById('writerTable').innerHTML=rows.length?'<table class="writer-table"><caption class="sr-only">Entries matching your filters</caption><thead><tr><th scope="col">Entry</th><th scope="col">What you do</th><th scope="col">Seen in scripts</th><th scope="col">Compare</th></tr></thead><tbody>'+rows.slice(W.page*limit,(W.page+1)*limit).map(n=>'<tr><td><a class="knav entry-title" href="#/entry/'+n.id+'">'+esc(n._title)+'</a>'+W.kindBadge(n)+riskBadge(n)+'</td><td class="table-operation">'+W.operation(n,'table-'+n.id)+'</td><td><span class="mobile-label">Seen in scripts: </span><strong>'+(n.annotation_units||0)+'</strong></td><td>'+W.pinButton(n.id)+'</td></tr>').join('')+'</tbody></table>':'<div class="empty">No entries match these filters. Try fewer words or another kind.</div>';
      document.getElementById('tablePager').innerHTML='<button id="tablePrev" '+(!W.page?'disabled':'')+'>← Previous</button><span>Page '+(W.page+1)+' of '+Math.max(1,Math.ceil(rows.length/limit))+'</span><button id="tableNext" '+((W.page+1)*limit>=rows.length?'disabled':'')+'>Next →</button>';
      document.getElementById('tablePrev').onclick=()=>{W.page--;W.paintTable();const focus=document.getElementById('tableCount');focus.tabIndex=-1;focus.focus({preventScroll:true});focus.scrollIntoView({block:'start'});};
      document.getElementById('tableNext').onclick=()=>{W.page++;W.paintTable();const focus=document.getElementById('tableCount');focus.tabIndex=-1;focus.focus({preventScroll:true});focus.scrollIntoView({block:'start'});};
      W.restoreDetails(); W.updatePins();
    },
    recommend(mode=W.mode, match=W.match) {
      const candidates=new Map();
      W.selected.forEach(id=>{
        // Co-occurrence below chance (lift < 1) is not a lead, so it is never offered.
        const links=mode==='relations'?(S.seeAlso[id]||[]).map(x=>({id:x.o,note:x.n})): (mode==='cooccurrence'?(S.cooc[id]||[]).filter(t=>t[2]>=1):S.next[id]||[]).filter(t=>t[1]>=W.minimum).map(t=>({id:t[0],count:t[1],...(mode==='cooccurrence'?{value:t[2]}:{})}));
        links.forEach(link=>{
          if(!S.byId[link.id]||W.selected.includes(link.id)) return;
          const role=W.classify(S.byId[link.id]);
          if(W.candidateRole==='writing'&&!['scriptwriting_move','structural_pattern'].includes(role)) return;
          const item=candidates.get(link.id)||{id:link.id,basis:[],score:0};
          if(item.basis.some(b=>b.from===id))return;
          item.basis.push({...link,from:id}); item.score+=link.count||1; candidates.set(link.id,item);
        });
      });
      const rank=x=>mode==='cooccurrence'&&W.rank==='lift'?x.basis.reduce((sum,b)=>sum+b.value,0)/x.basis.length:x.score;
      return Array.from(candidates.values()).filter(x=>match!=='all'||x.basis.length===W.selected.length).sort((a,b)=>b.basis.length-a.basis.length||rank(b)-rank(a)||S.byId[a.id].name.localeCompare(S.byId[b.id].name));
    },
    renderBoard(view) {
      view.innerHTML=crumbs([['#/','Home'],['#/table','Browse & compare']],'Workspace')+
        '<div class="writer-heading"><div><p class="eyebrow">YOUR WORKSPACE</p><h2>What belongs beside this?</h2><p>Read pinned entries side by side, then look at what tends to go with them. Patterns from the scripts are leads to check, not rules.</p></div><div class="workspace-export"><label>Candidate detail<select id="exportDetail"><option value="compact">Summaries and links</option><option value="full">Full examples</option></select></label><button id="exportWorkspace" '+(!W.selected.length?'disabled':'')+'>Export JSON ↓</button><small>Pinned entries always include full examples.</small></div></div>'+
        '<p id="writerNotice" class="writer-notice"></p><div class="pinned-heading"><h3>Your comparison · '+W.selected.length+'/4</h3><a href="#/table">+ Find an entry</a></div>'+
        '<div class="compare-grid">'+W.selected.map(id=>{const n=S.byId[id];return '<article class="compare-card">'+W.kindBadge(n)+'<h3><a href="#/entry/'+id+'">'+esc(n._title)+'</a></h3>'+W.pinButton(id)+'<h4>What you do</h4>'+W.operation(n,'pin-'+id)+W.steps(n)+'<details data-detail="pin-'+id+'-examples"><summary>Why it works & examples</summary>'+W.why(n)+W.examples(n)+'</details><a class="text-action" href="#/graph/relations/'+id+'">Locate in network ↗</a></article>';}).join('')+(W.selected.length?'':'<div class="workspace-empty"><span class="empty-orbit" aria-hidden="true">◉ · ◌ · ◉</span><h3>Start with two alternatives.</h3><p>Pin entries from Browse, an entry page, or the network. They stay here while you explore what connects them.</p><a class="primary-action" href="#/table">Browse entries →</a></div>')+'</div>'+
        (W.selected.length?'<section class="candidate-section"><h3>Explore a possible next move</h3><div class="writer-filters"><label>Connection<select id="recommendMode"><option value="relations">Related (curated)</option><option value="cooccurrence">In the same scripts</option><option value="sequence">Comes next in scripts</option></select></label><label>Match<select id="recommendMatch"><option value="all">Connected to every pin</option><option value="any">Connected to any pin</option></select></label><label>Include<select id="candidateRole"><option value="writing">Moves and structures</option><option value="all">Everything, including principles</option></select></label><label id="rankingLabel">Rank by<select id="candidateRank"><option value="support">How often</option><option value="lift">How much more than chance</option></select></label><label id="minimumLabel">Seen at least (times)<input id="minimumSupport" type="number" min="1" max="10000" value="'+W.minimum+'"></label></div><p id="candidateMeaning" class="evidence-note"></p><p id="candidateCount" role="status"></p><div id="candidateList" class="candidate-list"></div><div id="candidatePager" class="pager"></div></section>':'')+
        '<details class="methodology"><summary>What these connections can tell you</summary>'+W.coverageNote()+'<p>“Related” is a hand-made link, not a recommended order. “In the same scripts” counts scripts that use both entries; “× chance” compares that with what you would expect if they were unrelated. “Comes next” counts back-to-back uses. None of these show that a combination works, only that writers use it.</p><p>A candidate connected to every pin is linked to each pin separately; that does not mean all of them appeared together in one script.</p></details>';
      document.getElementById('exportWorkspace').onclick=W.export;
      if(!W.selected.length)return;
      [['recommendMode','mode'],['recommendMatch','match'],['candidateRole','candidateRole'],['candidateRank','rank']].forEach(([id,key])=>{const el=document.getElementById(id);el.value=W[key];el.onchange=()=>{W[key]=el.value;W.candidatePage=0;W.paintCandidates();};});
      document.getElementById('minimumSupport').oninput=e=>{W.candidatePage=0;W.minimum=Math.max(1,Math.min(10000,Math.floor(+e.target.value)||1));W.paintCandidates();};
      W.restoreDetails(); W.paintCandidates(); W.updatePins();
    },
    coverageNote() {
      const c=(S.meta||{}).annotation_coverage||{};
      if(!Number.isFinite(c.annotated_units)) return '<p>Script coverage is unavailable in this edition.</p>';
      return '<p><strong>Current data:</strong> '+S.nodes.length+' entries, tagged line by line in '+c.annotated_units+' scripts and texts. Some of those files may be versions of the same script, so the counts are approximate.</p>';
    },
    examples(n) { return (n.ex||[]).map(ex=>'<div class="writer-example">'+(ex.f?'<h4>'+esc(ex.f)+'</h4>':'')+(ex.s?'<p><strong>Setup:</strong> '+esc(ex.s)+'</p>':'')+'<p class="example-render"><strong>Illustration:</strong> '+esc(ex.t||'')+'</p>'+(ex.m?'<p><strong>Say it like this:</strong> '+esc(ex.m)+'</p>':'')+'</div>').join('')||'<p>No worked example in this edition.</p>'; },
    basisText(b, mode) {
      if(mode==='relations') return 'Related to '+S.byId[b.from]._title+(b.note?': '+b.note:'');
      if(mode==='cooccurrence') return 'With '+S.byId[b.from]._title+': in '+b.count+' of the same scripts'+(b.count>=3?' · '+(b.value>=10?Math.round(b.value):Number(b.value).toFixed(1))+'× chance':'');
      return 'After '+S.byId[b.from]._title+': '+b.count+' times';
    },
    paintCandidates() {
      W.rememberDetails(); let list=W.recommend(), limit=12, widened=false;
      // Nothing connects to EVERY pin: show what connects to any pin instead of an empty list.
      if(!list.length&&W.match==='all'&&W.selected.length>1){ const any=W.recommend(W.mode,'any'); if(any.length){ list=any; widened=true; } } W.candidatePage=Math.min(W.candidatePage,Math.max(0,Math.ceil(list.length/limit)-1));
      document.getElementById('minimumLabel').hidden=W.mode==='relations';
      document.getElementById('rankingLabel').hidden=W.mode!=='cooccurrence';
      document.getElementById('candidateMeaning').textContent=W.mode==='relations'?'Hand-made links. Read how each one relates before choosing.':W.mode==='cooccurrence'?'Used somewhere in the same script, not necessarily next to each other. Common together does not mean they work together.':'Used right after the pinned entry in a script. A habit of writers, not a required order.';
      document.getElementById('candidateCount').textContent=(widened?'Nothing connects to every pin, so showing what connects to any pin: ':'')+(list.length===1?'1 candidate':list.length+' candidates')+(list.length?' · showing '+(W.candidatePage*limit+1)+'–'+Math.min(list.length,(W.candidatePage+1)*limit):'');
      document.getElementById('candidateList').innerHTML=list.slice(W.candidatePage*limit,(W.candidatePage+1)*limit).map(item=>{const n=S.byId[item.id];return '<article class="candidate-card"><div>'+W.kindBadge(n)+'<h4><a href="#/entry/'+n.id+'">'+esc(n._title)+'</a></h4></div>'+W.pinButton(n.id)+W.operation(n,'candidate-'+n.id)+'<ul>'+item.basis.map(b=>'<li>'+esc(W.basisText(b,W.mode))+'</li>').join('')+'</ul><details data-detail="candidate-'+n.id+'-guidance"><summary>Why it works & examples</summary>'+W.why(n)+W.examples(n)+'</details>'+'</article>';}).join('')||(W.match==='all'?'<div class="empty">No candidate connects to every pin with these filters. Try “Connected to any pin” or another connection type.</div>':'<div class="empty">No candidates match these filters. Try including everything or lowering the minimum.</div>');
      const pager=document.getElementById('candidatePager');
      pager.innerHTML=list.length>limit?'<button id="candidatePrev" '+(!W.candidatePage?'disabled':'')+'>← Previous candidates</button><span>Page '+(W.candidatePage+1)+' of '+Math.ceil(list.length/limit)+'</span><button id="candidateNext" '+((W.candidatePage+1)*limit>=list.length?'disabled':'')+'>Next candidates →</button>':'';
      [['candidatePrev',-1],['candidateNext',1]].forEach(([id,step])=>{const el=document.getElementById(id);if(el)el.onclick=()=>{W.candidatePage+=step;W.paintCandidates();const count=document.getElementById('candidateCount');count.tabIndex=-1;count.focus({preventScroll:true});count.scrollIntoView({block:'start'});};});
      W.restoreDetails();
    },
    export() {
      const full=n=>({id:n.id,name:n.name,kind:n.kind,writer_role:W.classify(n),one_liner:n.one_liner,mechanism:n.mech,why_short:n.why_short,evidence_grade:n.evidence_grade||null,finding_name:n.finding_name||null,finding_url:n.finding_url||null,steps:n.steps||null,examples:n.ex||[],examples_withheld:n.examples_withheld||0,annotation_units:n.annotation_units,consent:!!n.consent,bounded:!!n.bounded,risk:n.risk});
      const detail=document.getElementById('exportDetail')?.value||'compact';
      const candidate=n=>{const entry=full(n);if(detail==='compact'){delete entry.examples;entry.examples_omitted_from_export=(n.ex||[]).length;entry.entry_url=new URL('#/entry/'+n.id,location.href).href;}return entry;};
      const payload={schema_version:3,candidate_detail:detail,workspace_url:new URL(W.workspaceURL(),location.href).href,exported_at:new Date().toISOString(),data_meta:S.meta,query:{selected_ids:W.selected.slice(),connection:W.mode,match:W.match,minimum_support:W.mode==='relations'?null:W.minimum,roles:W.candidateRole,ranking:W.mode==='cooccurrence'?W.rank:'support'},method:'Pairwise candidate retrieval, not a generated or validated sequence. Pairwise intersections do not imply joint source occurrence. Counts do not demonstrate outcomes.',selected:W.selected.map(id=>full(S.byId[id])),candidates:W.recommend().map(x=>({entry:candidate(S.byId[x.id]),basis:x.basis.map(b=>({...b,explanation:W.basisText(b,W.mode)}))}))};
      const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='workspace.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    }
  };
  document.addEventListener('click',e=>{const button=e.target.closest('[data-pin]');if(button)W.toggle(+button.dataset.pin);});
})();
