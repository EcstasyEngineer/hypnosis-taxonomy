/* Public, static writer workspace. No source identities, uploads or remote calls. */
(function () {
  'use strict';
  const roleLabels = {scriptwriting_move:'Writing move',structural_pattern:'Structural pattern',supporting_principle:'Supporting principle',supporting_assessment:'Assessment'};
  const kindLabels = {technique:'Technique',container:'Structural pattern',principle:'Principle'};
  const W = window.Writer = {
    selected: [], query: '', role: '', sort: 'name', page: 0,
    mode: 'relations', match: 'all', minimum: 2, candidateRole: 'writing', rank: 'support',
    classify(n) { return n.writer_role || ({technique:'scriptwriting_move',container:'structural_pattern',principle:'supporting_principle'}[n.kind]) || 'scriptwriting_move'; },
    roleLabel(n) { return roleLabels[W.classify(n)] || 'Unclassified'; },
    kindLabel(n) { return kindLabels[n.kind] || 'Unclassified'; },
    restore() {
      try { W.selected = JSON.parse(sessionStorage.getItem('writer-pins') || '[]').filter((x,i,a) => Number.isInteger(x) && S.byId[x] && a.indexOf(x) === i).slice(0,4); } catch (_) { W.selected=[]; }
      W.updatePins();
    },
    toggle(id) {
      if (!S.byId[id]) return;
      if (W.selected.includes(id)) W.selected=W.selected.filter(x=>x!==id);
      else if (W.selected.length<4) W.selected.push(id);
      else { W.announce('Four entries are pinned. Remove one to add another.'); return; }
      try { sessionStorage.setItem('writer-pins',JSON.stringify(W.selected)); } catch (_) {}
      W.updatePins();
      window.dispatchEvent(new CustomEvent('writer-selection',{detail:W.selected.slice()}));
      W.announce(W.selected.length+' of 4 entries pinned for comparison.');
      if (currentRoute && currentRoute.startsWith('workbench')) { currentRoute='workbench'+(W.selected.length?'/'+W.selected.join(','):''); history.replaceState(null,'','#/'+currentRoute); W.renderBoard(document.getElementById('view')); const focus=document.querySelector('[data-pin="'+id+'"]')||document.querySelector('.pinned-heading h3'); if(focus){focus.tabIndex=0;focus.focus({preventScroll:true});} }
    },
    announce(text) { const el=document.getElementById('writerStatus'); if(el) el.textContent=text; },
    pinButton(id) { const on=W.selected.includes(id); return '<button class="pin-btn" data-pin="'+id+'" aria-pressed="'+on+'" aria-label="'+(on?'Unpin ':'Pin ')+esc(S.byId[id]._title)+'">'+(on?'Pinned ✓':'+ Pin')+'</button>'; },
    updatePins() {
      document.querySelectorAll('[data-pin]').forEach(el=>{const on=W.selected.includes(+el.dataset.pin); el.textContent=on?'Pinned ✓':'+ Pin'; el.setAttribute('aria-pressed',on); el.setAttribute('aria-label',(on?'Unpin ':'Pin ')+(S.byId[+el.dataset.pin]||{})._title);});
      const link=document.getElementById('workbenchLink'); if(link) { link.textContent='Workspace'+(W.selected.length?' · '+W.selected.length:''); link.href='#/workbench'+(W.selected.length?'/'+W.selected.join(','):''); }
    },
    roleBadge(n) { return '<span class="role-badge role-'+esc(W.classify(n))+'">'+esc(W.roleLabel(n))+'</span>'; },
    renderTable(view) {
      view.innerHTML=crumbs([['#/','Index']],'Browse & compare')+
        '<div class="writer-heading"><div><p class="eyebrow">THE WRITER’S INDEX</p><h2>Find the move that fits.</h2><p>Search the operation, compare alternatives, then pin up to four entries to explore what connects them.</p></div><a class="primary-action" href="#/workbench">Open workspace →</a></div>'+
        '<div class="writer-filters"><label>Search entries<input id="tableQuery" type="search" placeholder="Try breath, countdown, metaphor…" value="'+esc(W.query)+'"></label>'+
        '<label>Writing role<select id="tableRole"><option value="">All roles</option>'+Object.entries(roleLabels).map(([k,v])=>'<option value="'+k+'"'+(W.role===k?' selected':'')+'>'+v+'</option>').join('')+'</select></label>'+
        '<label>Sort by<select id="tableSort"><option value="name">Name</option><option value="role">Writing role</option><option value="coverage">Annotation coverage</option></select></label></div>'+
        '<p id="tableCount" class="result-count" role="status"></p><div id="writerTable"></div><div id="tablePager" class="pager"></div>';
      document.getElementById('tableSort').value=W.sort;
      document.getElementById('tableQuery').addEventListener('input',e=>{W.query=e.target.value;W.page=0;W.paintTable();});
      document.getElementById('tableRole').addEventListener('change',e=>{W.role=e.target.value;W.page=0;W.paintTable();});
      document.getElementById('tableSort').addEventListener('change',e=>{W.sort=e.target.value;W.page=0;W.paintTable();});
      W.paintTable();
    },
    filtered() {
      const terms=W.query.toLowerCase().trim().split(/\s+/).filter(Boolean);
      return S.nodes.filter(n=>(!W.role||W.classify(n)===W.role)&&terms.every(t=>(n._search+' '+(n.disc||'')+' '+n.id).toLowerCase().includes(t)))
        .sort((a,b)=>W.sort==='coverage'?(b.annotation_units||0)-(a.annotation_units||0)||a.name.localeCompare(b.name):W.sort==='role'?W.roleLabel(a).localeCompare(W.roleLabel(b))||a.name.localeCompare(b.name):a.name.localeCompare(b.name));
    },
    paintTable() {
      const rows=W.filtered(), limit=30; W.page=Math.min(W.page,Math.max(0,Math.ceil(rows.length/limit)-1));
      document.getElementById('tableCount').textContent=rows.length+' entries'+(rows.length?' · '+(W.page*limit+1)+'–'+Math.min(rows.length,(W.page+1)*limit):'')+' · role labels describe writing use; they do not establish efficacy';
      document.getElementById('writerTable').innerHTML=rows.length?'<table class="writer-table"><caption class="sr-only">Taxonomy entries matching your filters</caption><thead><tr><th scope="col">Entry / role</th><th scope="col">Operation</th><th scope="col">Source coverage</th><th scope="col">Compare</th></tr></thead><tbody>'+rows.slice(W.page*limit,(W.page+1)*limit).map(n=>'<tr><td><a class="knav entry-title" href="#/entry/'+n.id+'">'+esc(n._title)+'</a>'+W.roleBadge(n)+'<small>#'+n.id+' · '+esc(W.kindLabel(n))+'</small></td><td class="table-operation"><p>'+esc(n.mech||'No operation recorded.')+'</p></td><td><span class="mobile-label">Annotation units: </span><strong>'+(Number.isFinite(n.annotation_units)?n.annotation_units:'Unknown')+'</strong><small>observed, not verified outcomes</small></td><td>'+W.pinButton(n.id)+'</td></tr>').join('')+'</tbody></table>':'<div class="empty">No entries match these filters. Try a broader operation or choose all roles.</div>';
      document.getElementById('tablePager').innerHTML='<button id="tablePrev" '+(!W.page?'disabled':'')+'>← Previous</button><span>Page '+(W.page+1)+' of '+Math.max(1,Math.ceil(rows.length/limit))+'</span><button id="tableNext" '+((W.page+1)*limit>=rows.length?'disabled':'')+'>Next →</button>';
      document.getElementById('tablePrev').onclick=()=>{W.page--;W.paintTable();const focus=document.getElementById('tableCount');focus.tabIndex=-1;focus.focus({preventScroll:true});focus.scrollIntoView({block:'start'});};
      document.getElementById('tableNext').onclick=()=>{W.page++;W.paintTable();const focus=document.getElementById('tableCount');focus.tabIndex=-1;focus.focus({preventScroll:true});focus.scrollIntoView({block:'start'});};
    },
    recommend(mode=W.mode, match=W.match) {
      const candidates=new Map();
      W.selected.forEach(id=>{
        const links=mode==='relations'?(S.seeAlso[id]||[]).map(x=>({id:x.o,note:x.n})): (mode==='cooccurrence'?S.cooc[id]||[]:S.next[id]||[]).filter(t=>t[1]>=W.minimum).map(t=>({id:t[0],count:t[1],value:t[2]}));
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
      view.innerHTML=crumbs([['#/','Index'],['#/table','Browse & compare']],'Writer workspace')+
        '<div class="writer-heading"><div><p class="eyebrow">FROM OPTIONS TO A WRITING DECISION</p><h2>What belongs beside this?</h2><p>Compare operations. Explore related moves. Use corpus patterns as leads to inspect, with the evidence in view.</p></div><button id="exportWorkspace" '+(!W.selected.length?'disabled':'')+'>Export retrieval JSON ↓</button></div>'+
        '<div class="pinned-heading"><h3>Your comparison · '+W.selected.length+'/4</h3><a href="#/table">+ Find an entry</a></div>'+
        '<div class="compare-grid">'+W.selected.map(id=>{const n=S.byId[id];return '<article class="compare-card">'+W.roleBadge(n)+'<h3><a href="#/entry/'+id+'">'+esc(n._title)+'</a></h3>'+W.pinButton(id)+'<h4>Operation</h4><p>'+esc(n.mech)+'</p><details><summary>When to choose it & examples</summary><h4>Selection / distinction</h4><p>'+esc(n.disc||'No selection guidance recorded.')+'</p>'+W.examples(n)+'</details><a class="text-action" href="#/graph/relations/'+id+'">Locate in network ↗</a></article>';}).join('')+(W.selected.length?'':'<div class="workspace-empty"><span class="empty-orbit" aria-hidden="true">◉ · ◌ · ◉</span><h3>Start with a writing choice.</h3><p>Pin two alternatives from the table, an entry, or the network. Their full operations stay here while you explore connections.</p><a class="primary-action" href="#/table">Browse entries →</a></div>')+'</div>'+
        (W.selected.length?'<section class="candidate-section"><h3>Explore a possible next move</h3><div class="writer-filters"><label>Connection<select id="recommendMode"><option value="relations">Curated see also</option><option value="cooccurrence">Observed together</option><option value="sequence">Observed next</option></select></label><label>Match<select id="recommendMatch"><option value="all">Connected to every pin</option><option value="any">Connected to any pin</option></select></label><label>Include<select id="candidateRole"><option value="writing">Writing moves & patterns</option><option value="all">All writing roles</option></select></label><label id="rankingLabel">Rank by<select id="candidateRank"><option value="support">Pair counts</option><option value="lift">Mean association lift</option></select></label><label id="minimumLabel">Minimum observations<input id="minimumSupport" type="number" min="1" max="10000" value="'+W.minimum+'"></label></div><p id="candidateMeaning" class="evidence-note"></p><p id="candidateCount" role="status"></p><div id="candidateList" class="candidate-list"></div></section>':'')+
        '<details class="methodology"><summary>What these connections can tell you</summary>'+W.coverageNote()+'<p>See also is a curated affinity, not a recommended order. Observed together counts annotation units containing both entries; lift compares that overlap with independence in this corpus. Observed next counts non-overlapping consecutive annotations, with a conditional share for each starting entry. Source annotation coverage is incomplete. None of these establish efficacy, compatibility, causality or a required next step.</p><p>Shared candidates are intersections of pairwise links. They do not prove that every pinned entry and the candidate occurred together in one source.</p><p>Retrieval JSON contains full selected entries, candidate IDs, per-pin evidence and this method. It supports a downstream agent’s review; this static page does not run an agent or generate scripts.</p></details>';
      document.getElementById('exportWorkspace').onclick=W.export;
      if(!W.selected.length)return;
      [['recommendMode','mode'],['recommendMatch','match'],['candidateRole','candidateRole'],['candidateRank','rank']].forEach(([id,key])=>{const el=document.getElementById(id);el.value=W[key];el.onchange=()=>{W[key]=el.value;W.paintCandidates();};});
      document.getElementById('minimumSupport').oninput=e=>{W.minimum=Math.max(1,Math.min(10000,Math.floor(+e.target.value)||1));W.paintCandidates();};
      W.paintCandidates();
    },
    coverageNote() {
      const m=S.meta||{}, c=m.annotation_coverage||{};
      if(!Number.isFinite(c.annotated_units)) return '<p>Annotation coverage metadata is unavailable in this edition.</p>';
      return '<p><strong>Current data:</strong> '+S.nodes.length+' entries · '+c.annotated_units+' nonempty annotation units · '+c.ordered_transitions+' ordered transitions. '+(c.unknown_file_units+c.ambiguous_file_units)+' annotation files have unresolved or ambiguous source identity. Counts refer to annotation units, not verified independent sources.</p><p>Node colors use the stored kind (technique, structural pattern, principle); writing-role filters use the reviewed retrieval roles, including assessment. Layout distances are exploratory, not a semantic score.</p>';
    },
    examples(n) { return (n.ex||[]).map(ex=>'<div class="writer-example">'+(ex.f?'<h4>'+esc(ex.f)+'</h4>':'')+(ex.s?'<p><strong>Setup:</strong> '+esc(ex.s)+'</p>':'')+'<p class="example-render"><strong>Illustration:</strong> '+esc(ex.t||'')+'</p>'+(ex.m?'<p><strong>Move:</strong> '+esc(ex.m)+'</p>':'')+'</div>').join('')||'<p>No worked example in this export.</p>'; },
    basisText(b, mode) {
      if(mode==='relations') return 'See also from '+S.byId[b.from]._title+(b.note?': '+b.note:'. A relationship is recorded; no public rationale is available.');
      if(mode==='cooccurrence') return 'With '+S.byId[b.from]._title+': '+b.count+' annotation units · lift '+Number(b.value).toFixed(2)+'×';
      return 'After '+S.byId[b.from]._title+': '+b.count+' transitions · '+(b.value*100).toFixed(1)+'% of this entry’s outgoing transitions';
    },
    paintCandidates() {
      const list=W.recommend();
      document.getElementById('minimumLabel').hidden=W.mode==='relations';
      document.getElementById('rankingLabel').hidden=W.mode!=='cooccurrence';
      document.getElementById('candidateMeaning').textContent=W.mode==='relations'?'Curated affinity. Read the stated relationship and the candidate’s operation before choosing.':W.mode==='cooccurrence'?'Same annotation unit, not necessarily adjacent. Lift measures association in this corpus, not compatibility or effectiveness.':'Following non-overlapping annotations, not a prescribed writing sequence. Each percentage uses its own starting entry’s outgoing total.';
      document.getElementById('candidateCount').textContent=list.length+' candidates · ranked by connected pins, then '+(W.mode==='relations'?'name':W.mode==='cooccurrence'&&W.rank==='lift'?'mean lift across connected pins (not efficacy)':'summed pair counts (not joint support)');
      document.getElementById('candidateList').innerHTML=list.slice(0,40).map(item=>{const n=S.byId[item.id];return '<article class="candidate-card"><div>'+W.roleBadge(n)+'<h4><a href="#/entry/'+n.id+'">'+esc(n._title)+'</a></h4></div><p>'+esc(n.mech)+'</p><ul>'+item.basis.map(b=>'<li>'+esc(W.basisText(b,W.mode))+'</li>').join('')+'</ul><details><summary>Why choose this?</summary><p>'+esc(n.disc||'No selection guidance recorded.')+'</p></details>'+W.pinButton(n.id)+'</article>';}).join('')+(list.length>40?'<p>Showing 40 of '+list.length+'. Export JSON for all candidates or narrow the connection and role filters.</p>':'')||(W.match==='all'?'<div class="empty">No candidate connects to every pin with these filters. Try “Connected to any pin” or a different connection type. Missing evidence is not proof of incompatibility.</div>':'<div class="empty">No candidates match these filters. Try including all roles or lowering the minimum observations.</div>');
    },
    export() {
      const full=n=>({id:n.id,name:n.name,kind:n.kind,writer_role:W.classify(n),mechanism:n.mech,discriminator:n.disc,examples:n.ex||[],examples_withheld:n.examples_withheld||null,annotation_units:n.annotation_units,provenance_counts:n.provenance_counts,writer_role_reviewed:!!n.writer_role_reviewed,consent:n.consent,bounded:n.bounded,risk:n.risk});
      const payload={schema_version:1,exported_at:new Date().toISOString(),data_meta:S.meta,query:{selected_ids:W.selected.slice(),connection:W.mode,match:W.match,minimum_support:W.mode==='relations'?null:W.minimum,roles:W.candidateRole,ranking:W.mode==='cooccurrence'?W.rank:'support'},method:'Pairwise candidate retrieval, not a generated or validated writing sequence. Pairwise intersections do not imply joint source occurrence. Counts do not demonstrate outcomes.',selected:W.selected.map(id=>full(S.byId[id])),candidates:W.recommend().map(x=>({entry:full(S.byId[x.id]),basis:x.basis.map(b=>({...b,explanation:W.basisText(b,W.mode)}))}))};
      const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='writer-retrieval.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    }
  };
  document.addEventListener('click',e=>{const button=e.target.closest('[data-pin]');if(button)W.toggle(+button.dataset.pin);});
})();
