import React, { useEffect, useState } from 'react';
import { getSession } from '../../services/authService';
import { fetchAnalytics } from '../../services/dataService';
import { downloadCsv } from '../../utils/csv';
const pretty = (s) => s.replace(/_/g, ' ');
const Kpi = ({ label, value, hint, tone = 'text-slate-900' }) => (<div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
    <span className="text-xs font-semibold text-slate-500">{label}</span>
    <p className={`text-2xl font-bold font-mono mt-1 ${tone}`}>{value}</p>
    {hint && <span className="text-[11px] text-slate-500">{hint}</span>}
  </div>);
const Bars = ({ rows, color = 'bg-purple-500' }) => {
    const max = Math.max(1, ...rows.map(r => r.value));
    return (<div className="space-y-1.5">
      {rows.map(r => (<div key={r.label} className="flex items-center gap-2 text-[11px]">
          <span className="w-36 truncate text-slate-600 capitalize" title={r.label}>{r.label}</span>
          <div className="flex-1 bg-slate-100 rounded h-3"><div className={`${color} h-3 rounded`} style={{ width: `${(r.value / max) * 100}%` }}/></div>
          <span className="w-8 text-right font-mono font-bold text-slate-800">{r.value}</span>
        </div>))}
    </div>);
};
const Card = ({ title, children }) => (<div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100">{title}</h3>
    {children}
  </div>);
// Live analytics computed by the backend from real applications, licences and grievances.
export const AnalyticsPanel = () => {
    const [d, setD] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const session = getSession();
    const load = () => {
        if (!session)
            return;
        setLoading(true);
        setError('');
        fetchAnalytics(session.token).then(setD).catch(e => setError(e.message)).finally(() => setLoading(false));
    };
    useEffect(load, []);
    if (!session)
        return <p className="text-xs text-slate-500 bg-white p-4 rounded-xl border border-slate-200">Log in with a real admin account to see live analytics. (Demo persona mode has no database, so no statistics are shown.)</p>;
    if (error)
        return <p className="text-xs text-red-600 bg-white p-4 rounded-xl border border-red-200">{error}</p>;
    if (!d)
        return <p className="text-xs text-slate-500">Loading analytics…</p>;
    const slowest = (d.stageDwell || []).slice(0, 2);
    return (<div className="space-y-5">
      <div className="flex items-center justify-between text-[11px] text-slate-500">
        <span>Live data · generated {new Date(d.generatedAt).toLocaleString()}</span>
        <button onClick={load} disabled={loading} className="px-2.5 py-1 rounded-md border border-slate-300 bg-white hover:bg-slate-50 cursor-pointer">{loading ? 'Refreshing…' : 'Refresh'}</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi label="Total applications" value={d.totalApplications} hint={`${d.openApplications} still open`}/>
        <Kpi label="Approved / Rejected" value={`${d.approved} / ${d.rejected}`} tone="text-emerald-700"/>
        <Kpi label="Avg processing time" value={d.avgProcessingDays === null ? '—' : `${d.avgProcessingDays} d`} hint="submission → approval" tone="text-blue-900"/>
        <Kpi label="SLA compliance" value={d.slaCompliancePercent === null ? '—' : `${d.slaCompliancePercent}%`} hint={`${d.openSlaBreaches} open application(s) past SLA`} tone={d.openSlaBreaches ? 'text-amber-700' : 'text-emerald-700'}/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Applications by status">
          <Bars rows={Object.entries(d.byStatus).map(([k, v]) => ({ label: pretty(k), value: v }))}/>
        </Card>
        <Card title="Submissions per month (last 6 months)">
          {d.monthly.length ? <Bars color="bg-blue-500" rows={d.monthly.map((m) => ({ label: m.month, value: m.count }))}/> : <p className="text-xs text-slate-500">No submissions yet.</p>}
        </Card>
      </div>

      <Card title="Bottleneck diagnosis (average time spent per stage)">
        {slowest.length === 0 ? <p className="text-xs text-slate-500">Not enough application history yet.</p> : (<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {slowest.map((s, i) => (<div key={s.status} className={`p-3.5 rounded-lg border space-y-1 ${i === 0 ? 'bg-amber-50/70 border-amber-200' : 'bg-blue-50/70 border-blue-200'}`}>
                <span className="font-bold text-slate-900 capitalize">#{i + 1} slowest: {pretty(s.status)}</span>
                <p className="text-slate-700 text-[11px]">Applications wait on average <strong>{s.avgDays} days</strong> in this stage ({s.samples} transitions measured).</p>
              </div>))}
          </div>)}
        <Bars color="bg-amber-500" rows={(d.stageDwell || []).map((s) => ({ label: pretty(s.status), value: s.avgDays }))}/>
      </Card>

      <Card title="Department performance">
        <div className="flex justify-end -mt-2">
          <button onClick={() => downloadCsv('department-performance.csv', [{ key: 'department', label: 'Department' }, { key: 'total', label: 'Total' }, { key: 'approved', label: 'Approved' }, { key: 'rejected', label: 'Rejected' }, { key: 'open', label: 'Open' }], d.byDepartment)} className="text-[11px] px-2.5 py-1 rounded-md border border-slate-300 hover:bg-slate-50 cursor-pointer">Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="text-left text-slate-500 border-b border-slate-200"><th className="py-1.5">Department</th><th>Total</th><th>Approved</th><th>Rejected</th><th>Open</th></tr></thead>
            <tbody>{d.byDepartment.map((r) => (<tr key={r.department} className="border-b border-slate-100"><td className="py-1.5 font-semibold text-slate-800">{r.department}</td><td>{r.total}</td><td className="text-emerald-700">{r.approved}</td><td className="text-red-700">{r.rejected}</td><td>{r.open}</td></tr>))}</tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card title="Top rejection reasons">
          {d.topRejectionReasons.length ? <Bars color="bg-red-400" rows={d.topRejectionReasons.map((r) => ({ label: r.reason, value: r.count }))}/> : <p className="text-xs text-slate-500">No rejections recorded.</p>}
        </Card>
        <Card title="Licences">
          {Object.keys(d.licences).length ? <Bars color="bg-emerald-500" rows={Object.entries(d.licences).map(([k, v]) => ({ label: k, value: v }))}/> : <p className="text-xs text-slate-500">No licences issued yet.</p>}
        </Card>
        <Card title="Grievances">
          {Object.keys(d.grievances).length ? <Bars color="bg-amber-500" rows={Object.entries(d.grievances).map(([k, v]) => ({ label: k, value: v }))}/> : <p className="text-xs text-slate-500">No grievances filed.</p>}
        </Card>
      </div>
    </div>);
};
