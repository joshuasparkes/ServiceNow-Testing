//Add your Fluent APIs here and in other now.ts files under src/fluent
import { UiPage } from '@servicenow/sdk-core/ui';

UiPage({
    name: 'x_1925689_test_3_dashboard',
    endpoint: 'x_1925689_test_3_dashboard.do',
    description: 'Test 3 Application Dashboard',
    direct: true,
    category: 'general',
    html: `<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">
<g:ui_page name="x_1925689_test_3_dashboard">
<style>
  body { font-family: "Source Sans Pro", Arial, sans-serif; background: #f2f4f7; margin: 0; padding: 0; }
  .sn-header { background: #293e40; color: #fff; padding: 16px 32px; display: flex; align-items: center; gap: 12px; }
  .sn-header h1 { margin: 0; font-size: 20px; font-weight: 600; }
  .sn-header .badge { background: #81b5a1; color: #fff; border-radius: 12px; padding: 2px 10px; font-size: 12px; }
  .dashboard { max-width: 1100px; margin: 32px auto; padding: 0 24px; }
  .stats-row { display: flex; gap: 20px; margin-bottom: 28px; flex-wrap: wrap; }
  .stat-card { background: #fff; border-radius: 8px; padding: 24px 28px; flex: 1; min-width: 180px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.08); border-left: 4px solid #293e40; }
  .stat-card .label { font-size: 12px; color: #6b7b8d; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
  .stat-card .value { font-size: 32px; font-weight: 700; color: #293e40; }
  .stat-card.open  { border-left-color: #e57373; }
  .stat-card.in-progress { border-left-color: #f4a836; }
  .stat-card.resolved { border-left-color: #4caf50; }
  .panel { background: #fff; border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); margin-bottom: 24px; }
  .panel-header { padding: 16px 24px; border-bottom: 1px solid #e8eaed; display: flex; justify-content: space-between; align-items: center; }
  .panel-header h2 { margin: 0; font-size: 16px; color: #293e40; }
  .panel-body { padding: 16px 24px; }
  table { width: 100%; border-collapse: collapse; }
  th { text-align: left; font-size: 12px; text-transform: uppercase; color: #6b7b8d; padding: 8px 12px;
    border-bottom: 2px solid #e8eaed; letter-spacing: 0.4px; }
  td { padding: 10px 12px; border-bottom: 1px solid #f0f2f5; font-size: 14px; color: #3d475c; }
  tr:last-child td { border-bottom: none; }
  .pill { display: inline-block; border-radius: 10px; padding: 2px 10px; font-size: 11px; font-weight: 600; }
  .pill-open     { background: #fce8e8; color: #c62828; }
  .pill-progress { background: #fff3e0; color: #e65100; }
  .pill-resolved { background: #e8f5e9; color: #2e7d32; }
  .pill-high { background: #fce8e8; color: #c62828; }
  .pill-medium { background: #fff3e0; color: #e65100; }
  .pill-low  { background: #e8f5e9; color: #2e7d32; }
  .actions { display: flex; gap: 8px; flex-wrap: wrap; }
  .btn { padding: 8px 18px; border-radius: 4px; border: none; cursor: pointer; font-size: 13px; font-weight: 600; }
  .btn-primary { background: #293e40; color: #fff; }
  .btn-secondary { background: #fff; color: #293e40; border: 1px solid #293e40; }
  .btn:hover { opacity: 0.88; }
  .quick-links { display: flex; gap: 16px; flex-wrap: wrap; }
  .quick-link { flex: 1; min-width: 150px; background: #f2f4f7; border-radius: 6px; padding: 14px 18px;
    text-align: center; text-decoration: none; color: #293e40; font-size: 13px; font-weight: 600;
    border: 1px solid #dde1e7; transition: background 0.15s; }
  .quick-link:hover { background: #293e40; color: #fff; }
  #search-box { width: 100%; padding: 8px 12px; border: 1px solid #dde1e7; border-radius: 4px;
    font-size: 14px; margin-bottom: 12px; box-sizing: border-box; }
  .empty { text-align: center; color: #9aa5b4; padding: 32px; }
</style>

<div class="sn-header">
  <span>&#9632;</span>
  <h1>Test 3 Application</h1>
  <span class="badge">Dashboard</span>
</div>

<div class="dashboard">

  <!-- Stat cards -->
  <div class="stats-row">
    <div class="stat-card open">
      <div class="label">Open Incidents</div>
      <div class="value" id="count-open">—</div>
    </div>
    <div class="stat-card in-progress">
      <div class="label">In Progress</div>
      <div class="value" id="count-progress">—</div>
    </div>
    <div class="stat-card resolved">
      <div class="label">Resolved Today</div>
      <div class="value" id="count-resolved">—</div>
    </div>
    <div class="stat-card">
      <div class="label">Total Records</div>
      <div class="value" id="count-total">—</div>
    </div>
  </div>

  <!-- Search & Recent Incidents -->
  <div class="panel">
    <div class="panel-header">
      <h2>Recent Incidents</h2>
      <div class="actions">
        <button class="btn btn-primary" onclick="createNewIncident()">+ New Incident</button>
        <button class="btn btn-secondary" onclick="refreshData()">&#8635; Refresh</button>
      </div>
    </div>
    <div class="panel-body">
      <input id="search-box" type="text" placeholder="Search incidents..." onkeyup="filterTable()" />
      <table id="incidents-table">
        <thead>
          <tr>
            <th>Number</th>
            <th>Short Description</th>
            <th>Priority</th>
            <th>State</th>
            <th>Assigned To</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody id="incidents-body">
          <tr><td colspan="6" class="empty">Loading...</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Quick Links -->
  <div class="panel">
    <div class="panel-header"><h2>Quick Links</h2></div>
    <div class="panel-body">
      <div class="quick-links">
        <a class="quick-link" href="/incident_list.do">All Incidents</a>
        <a class="quick-link" href="/task_list.do">All Tasks</a>
        <a class="quick-link" href="/change_request_list.do">Change Requests</a>
        <a class="quick-link" href="/problem_list.do">Problems</a>
        <a class="quick-link" href="/sc_request_list.do">Service Requests</a>
        <a class="quick-link" href="/x_1925689_test_3_list.do">App Records</a>
      </div>
    </div>
  </div>

</div>
</g:ui_page>
</j:jelly>`,

    clientScript: `
var _allRows = [];

function initialize() {
  refreshData();
}

function refreshData() {
  setTableContent('<tr><td colspan="6" class="empty">Loading&#8230;</td></tr>');
  var ga = new GlideAjax('AJAXEvaluator');
  ga.addParam('sysparm_name', 'getIncidents');
  ga.getXML(handleResponse);
  loadCounts();
}

function loadCounts() {
  ['open', 'progress', 'resolved', 'total'].forEach(function(id) {
    var el = document.getElementById('count-' + id);
    if (el) el.textContent = '—';
  });
  // Simulate counts with GlideRecord aggregate via form post
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/x_1925689_test_3_dashboard.do?sysparm_ajax=true&action=getCounts', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      try {
        var d = JSON.parse(xhr.responseText);
        document.getElementById('count-open').textContent     = d.open     !== undefined ? d.open     : '—';
        document.getElementById('count-progress').textContent = d.progress !== undefined ? d.progress : '—';
        document.getElementById('count-resolved').textContent = d.resolved !== undefined ? d.resolved : '—';
        document.getElementById('count-total').textContent    = d.total    !== undefined ? d.total    : '—';
      } catch(e) { /* counts unavailable */ }
    }
  };
  xhr.send();
}

function handleResponse(response) {
  var rows = response.getElementsByTagName('incident');
  _allRows = [];
  if (!rows || rows.length === 0) {
    setTableContent('<tr><td colspan="6" class="empty">No incidents found.</td></tr>');
    return;
  }
  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    _allRows.push({
      number:      r.getAttribute('number')      || '',
      short_desc:  r.getAttribute('short_desc')  || '',
      priority:    r.getAttribute('priority')    || '',
      state:       r.getAttribute('state')       || '',
      assigned_to: r.getAttribute('assigned_to') || 'Unassigned',
      updated:     r.getAttribute('updated')     || ''
    });
  }
  renderTable(_allRows);
}

function renderTable(rows) {
  var html = '';
  rows.forEach(function(r) {
    var statePill = stateBadge(r.state);
    var priPill   = priorityBadge(r.priority);
    html += '<tr>' +
      '<td><a href="/incident.do?sysparm_query=number=' + r.number + '">' + r.number + '</a></td>' +
      '<td>' + escapeHtml(r.short_desc) + '</td>' +
      '<td>' + priPill + '</td>' +
      '<td>' + statePill + '</td>' +
      '<td>' + escapeHtml(r.assigned_to) + '</td>' +
      '<td>' + r.updated + '</td>' +
      '</tr>';
  });
  setTableContent(html);
}

function stateBadge(state) {
  var s = (state || '').toLowerCase();
  if (s === '1' || s === 'new' || s === 'open')        return '<span class="pill pill-open">Open</span>';
  if (s === '2' || s === 'in progress')                return '<span class="pill pill-progress">In Progress</span>';
  if (s === '6' || s === 'resolved' || s === 'closed') return '<span class="pill pill-resolved">Resolved</span>';
  return '<span class="pill" style="background:#e8eaed;color:#3d475c;">' + escapeHtml(state) + '</span>';
}

function priorityBadge(p) {
  if (p === '1') return '<span class="pill pill-high">1 - Critical</span>';
  if (p === '2') return '<span class="pill pill-high">2 - High</span>';
  if (p === '3') return '<span class="pill pill-medium">3 - Moderate</span>';
  if (p === '4') return '<span class="pill pill-low">4 - Low</span>';
  if (p === '5') return '<span class="pill pill-low">5 - Planning</span>';
  return '<span class="pill" style="background:#e8eaed;color:#3d475c;">' + escapeHtml(p) + '</span>';
}

function filterTable() {
  var q = document.getElementById('search-box').value.toLowerCase();
  if (!q) { renderTable(_allRows); return; }
  var filtered = _allRows.filter(function(r) {
    return (r.number + r.short_desc + r.assigned_to).toLowerCase().indexOf(q) > -1;
  });
  if (filtered.length === 0) {
    setTableContent('<tr><td colspan="6" class="empty">No results for "' + escapeHtml(q) + '".</td></tr>');
  } else {
    renderTable(filtered);
  }
}

function setTableContent(html) {
  var tbody = document.getElementById('incidents-body');
  if (tbody) tbody.innerHTML = html;
}

function createNewIncident() {
  window.location.href = '/incident.do?sys_id=-1';
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
`,

    processingScript: `
var action = RP.getParameterValue('action');
if (action === 'getCounts') {
  var counts = {};
  var gaOpen = new GlideAggregate('incident');
  gaOpen.addQuery('state', 'IN', '1,2');
  gaOpen.addAggregate('COUNT');
  gaOpen.query();
  counts.open = gaOpen.next() ? parseInt(gaOpen.getAggregate('COUNT')) : 0;

  var gaProgress = new GlideAggregate('incident');
  gaProgress.addQuery('state', '2');
  gaProgress.addAggregate('COUNT');
  gaProgress.query();
  counts.progress = gaProgress.next() ? parseInt(gaProgress.getAggregate('COUNT')) : 0;

  var today = new GlideDateTime();
  today.setDisplayValue(gs.beginningOfToday());
  var gaResolved = new GlideAggregate('incident');
  gaResolved.addQuery('state', '6');
  gaResolved.addQuery('resolved_at', '>=', today.getValue());
  gaResolved.addAggregate('COUNT');
  gaResolved.query();
  counts.resolved = gaResolved.next() ? parseInt(gaResolved.getAggregate('COUNT')) : 0;

  var gaTotal = new GlideAggregate('incident');
  gaTotal.addAggregate('COUNT');
  gaTotal.query();
  counts.total = gaTotal.next() ? parseInt(gaTotal.getAggregate('COUNT')) : 0;

  gs.print(JSON.stringify(counts));
  RP.setRedirectURL('');
}
`
});
