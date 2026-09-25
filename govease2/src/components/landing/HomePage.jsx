import React from 'react';
import { ArrowRight, Search, Flame, Factory, Zap, Landmark, FileCheck2 } from 'lucide-react';
/**
 * Landing hero. The one idea this page has to land: four departments that
 * used to mean four separate office queues now converge on a single
 * certificate. Everything else — estimator, schemes, FAQ — lives on its
 * own page.
 */
export const HomePage = ({ onStartOnboarding, onOpenTrackModal, setActiveNavTab }) => {
    const departments = [
        { icon: Landmark, label: 'Municipal' },
        { icon: Flame, label: 'Fire Services' },
        { icon: Factory, label: 'MPCB Pollution' },
        { icon: Zap, label: 'Electricity' }
    ];
    return (<div className="bg-white text-slate-800">
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--gov-navy)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          {/* Copy */}
          <div className="text-white">
            <p className="text-sm font-semibold text-amber-400 mb-4">
              Government of Maharashtra, Single Window Portal
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]">
              Four departments.<br />One dossier. One certificate.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mt-6 max-w-lg">
              File your municipal, fire, pollution and power clearances once. VyaparSetu
              routes the same documents to every department and tracks each one against
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

          {/* Visual: departments converging into a single certificate */}
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
          <div>
            <p className="text-2xl font-extrabold" style={{ color: 'var(--gov-navy)' }}>12+</p>
            <p className="text-xs text-slate-500 mt-1">Departments connected</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold" style={{ color: 'var(--gov-navy)' }}>300+</p>
            <p className="text-xs text-slate-500 mt-1">Clearances covered</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold" style={{ color: 'var(--gov-navy)' }}>1</p>
            <p className="text-xs text-slate-500 mt-1">Document upload, reused everywhere</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold" style={{ color: 'var(--gov-navy)' }}>RTS Act</p>
            <p className="text-xs text-slate-500 mt-1">Statutory deadline on every application</p>
          </div>
        </div>
      </section>

      {/* Process — a real timeline, since this genuinely is a sequence */}
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
