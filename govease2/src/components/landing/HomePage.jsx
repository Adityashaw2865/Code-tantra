import React from 'react';
import { ArrowRight, Search, Flame, Factory, Zap, Landmark, FileCheck2, Building2, FileText, FolderLock, Clock, BadgePercent, ShieldCheck } from 'lucide-react';

export const HomePage = ({ onStartOnboarding, onOpenTrackModal, setActiveNavTab }) => {
    const departments = [
        { icon: Landmark, label: 'Municipal' },
        { icon: Flame, label: 'Fire Services' },
        { icon: Factory, label: 'MPCB Pollution' },
        { icon: Zap, label: 'Electricity' }
    ];

    const features = [
        { icon: Building2, tag: '1', title: 'Approvals & Clearances', desc: 'Find every approval your project requires across MIDC, MPCB, Fire, DISH, and state utility providers in one consolidated inventory.', link: 'Browse Catalog' },
        { icon: FileText, tag: '2', title: 'Guided Applications', desc: 'Know exactly what to fill, upload, and submit. One Common Application Form maps across every departmental portal.', link: 'Open Common Form' },
        { icon: FolderLock, tag: '3', title: 'Document Management', desc: 'Upload once, verify with OCR, and securely reuse documents across all clearance requests without repeated submissions.', link: 'Document Vault' },
        { icon: Clock, tag: '4', title: 'Application Tracking', desc: 'Track status, SLA countdowns, and desk reviews with full transparency, backed by the Right to Public Services Act.', link: 'Track Now' },
        { icon: BadgePercent, tag: '5', title: 'Incentives & Schemes', desc: 'Discover eligible financial incentives, electricity duty waivers, stamp duty exemptions, and capital subsidies.', link: 'View Schemes' },
        { icon: ShieldCheck, tag: '6', title: 'Compliance', desc: 'Stay ahead of mandatory renewals, annual returns, joint inspections, and statutory factory audits.', link: 'Compliance Center' },
    ];

    const lifecycle = [
        { n: '01', t: 'PLAN', d: 'Understand project requirements & KYA assessment' },
        { n: '02', t: 'LAND & ESTABLISH', d: 'Identify MIDC plots & zone building bylaws' },
        { n: '03', t: 'APPROVALS', d: 'Apply for statutory CTE, Fire NOC & licences' },
        { n: '04', t: 'OPERATE', d: 'Manage DISH safety licences & factory compliance' },
        { n: '05', t: 'INCENTIVES', d: 'Discover & claim eligible PSI 2019 financial support' },
        { n: '06', t: 'EXPAND', d: 'Scale capacity & file amendment applications' },
    ];

    return (<div className="bg-white text-slate-800">
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--gov-navy)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div className="text-white">
            <p className="text-sm font-semibold text-amber-400 mb-4">
              Government of Maharashtra, Single Window Portal
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]">
              Four departments.<br />One dossier. One certificate.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mt-6 max-w-lg">
              File your municipal, fire, pollution and power clearances once. We
              route the same documents to every department and track each one against
              its legal deadline until you're approved.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-9">
              <button onClick={onStartOnboarding} className="px-6 py-3.5 rounded-md bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm transition-colors flex items-center gap-2 cursor-pointer">
                Start your application
                <ArrowRight className="w-4 h-4"/>
              </button>
              <button onClick={onOpenTrackModal} className="px-5 py-3.5 rounded-md border border-white/25 text-white font-semibold text-sm hover:bg-white/5 transition-colors flex items-center gap-2 cursor-pointer">
                <Search className="w-4 h-4"/>
                Track an application
              </button>
            </div>
          </div>

          <div className="relative h-72 sm:h-80" aria-hidden="true">
            <svg viewBox="0 0 320 300" className="w-full h-full">
              {departments.map((_, i) => {
                const angle = -100 + i * 68;
                const rad = (angle * Math.PI) / 180;
                const x = 160 + 118 * Math.cos(rad);
                const y = 150 + 118 * Math.sin(rad);
                return (<line key={i} x1={x} y1={y} x2={160} y2={150} stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="3 5"/>);
              })}
            </svg>
            {departments.map((dept, i) => {
              const angle = -100 + i * 68;
              const rad = (angle * Math.PI) / 180;
              const x = 50 + 37 * Math.cos(rad);
              const y = 50 + 37 * Math.sin(rad);
              const Icon = dept.icon;
              return (<div key={dept.label} className="absolute flex flex-col items-center gap-1.5 -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
                  <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                    <Icon className="w-5 h-5 text-slate-200"/>
                  </div>
                  <span className="text-[10px] font-medium text-slate-300 whitespace-nowrap">{dept.label}</span>
                </div>);
            })}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-400/20">
                <FileCheck2 className="w-9 h-9 text-slate-900"/>
              </div>
              <span className="text-xs font-bold text-white">Your certificate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility strip */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[['12+','Departments connected'],['300+','Clearances covered'],['1','Document upload, reused everywhere'],['RTS Act','Statutory deadline on every application']].map(([n,l]) => (
            <div key={l}>
              <p className="text-2xl font-extrabold" style={{ color: 'var(--gov-navy)' }}>{n}</p>
              <p className="text-xs text-slate-500 mt-1">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature grid — what the platform actually does */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold text-amber-600 text-center tracking-wide uppercase mb-3">Single-Window Core Architecture</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 text-center mb-3">
            One platform for your entire industrial journey.
          </h2>
          <p className="text-sm text-slate-500 text-center mb-12 max-w-lg mx-auto">
            Integrated statutory workflows designed to eliminate bureaucratic silos and accelerate industrial commissioning.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#FEF3C7' }}>
                    <Icon className="w-5 h-5" style={{ color: 'var(--gov-navy)' }}/>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">{f.tag}. {f.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{f.desc}</p>
                  <button onClick={() => setActiveNavTab && setActiveNavTab('directory')} className="text-sm font-semibold flex items-center gap-1 cursor-pointer" style={{ color: 'var(--gov-navy)' }}>
                    {f.link} <ArrowRight className="w-3.5 h-3.5"/>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Regulatory lifecycle */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--gov-navy)' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold text-amber-400 text-center tracking-wide uppercase mb-3">Regulatory Lifecycle</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-3">
            From idea to expansion — we stay with you.
          </h2>
          <p className="text-sm text-slate-300 text-center mb-12 max-w-lg mx-auto">
            A continuous regulatory companion guiding your enterprise through every milestone.
          </p>

          <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {lifecycle.map((s) => (
              <div key={s.n} className="rounded-xl p-5 border" style={{ backgroundColor: 'var(--gov-navy-light)', borderColor: 'rgba(255,255,255,0.1)' }}>
                <p className="text-amber-400 font-extrabold text-lg mb-2">{s.n}</p>
                <p className="text-white font-bold text-xs tracking-wide mb-2">{s.t}</p>
                <p className="text-slate-300 text-xs leading-relaxed mb-3">{s.d}</p>
                <button className="text-amber-400 text-xs font-semibold flex items-center gap-1 cursor-pointer">
                  Explore <ArrowRight className="w-3 h-3"/>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 text-center mb-2">
            From application to certificate
          </h2>
          <p className="text-sm text-slate-500 text-center mb-14 max-w-md mx-auto">
            No office visit at any stage — every step happens on the portal.
          </p>
          <div className="relative grid sm:grid-cols-4 gap-10 sm:gap-6">
            <div className="hidden sm:block absolute top-4 left-[12.5%] right-[12.5%] h-px bg-slate-200"/>
            {[
              { t: 'Tell us your business', d: 'Sector, scale and location — we map the exact approvals you need.' },
              { t: 'Upload once', d: 'Documents go into one vault, reused across every department.' },
              { t: 'Departments review in parallel', d: 'Fire, pollution, power and municipal checks run together, not one by one.' },
              { t: 'Get your certificate', d: 'A QR-verified licence, with renewal reminders before it expires.' },
            ].map((step, i) => (<div key={step.t} className="relative">
                <div className="hidden sm:flex w-8 h-8 rounded-full items-center justify-center text-xs font-bold text-white mb-4 relative z-10" style={{ backgroundColor: 'var(--gov-navy)' }}>
                  {i + 1}
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">{step.t}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.d}</p>
              </div>))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center rounded-2xl py-14 px-6" style={{ backgroundColor: 'var(--gov-navy)' }}>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
            Ready to see what your business needs?
          </h2>
          <p className="text-sm text-slate-300 mb-7">Takes two minutes to find out which approvals apply to you.</p>
          <button onClick={onStartOnboarding} className="px-6 py-3 rounded-md bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm transition-colors inline-flex items-center gap-2 cursor-pointer">
            Start your application
            <ArrowRight className="w-4 h-4"/>
          </button>
        </div>
      </section>
    </div>);
};
