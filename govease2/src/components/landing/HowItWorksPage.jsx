import React from 'react';
const STEPS = [
    {
        title: 'Project Profiling & Discovery',
        desc: 'Enter basic project parameters (land, investment, workers, effluent category). The regulatory engine computes mandatory and potential clearances.'
    },
    {
        title: 'Document Pre-Validation',
        desc: 'Upload compliance files into your encrypted vault. Our automated pre-validator checks for missing documents and name discrepancies before submission.'
    },
    {
        title: 'Synchronized Parallel Review',
        desc: 'Fire NOC, Pollution CTE, and Power clearances run simultaneously. Department officers review dossiers, raise queries, and schedule field audits online.'
    },
    {
        title: 'Digital Licencing & Renewal',
        desc: 'Receive QR-verified digital certificates. Track ongoing statutory validity with automated renewal alerts and 1-click renewal submission.'
    }
];
export const HowItWorksPage = () => {
    return (<div className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl mx-auto mb-12 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-900 text-white p-8 sm:p-10 shadow-lg">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-2">Automated Statutory Flow</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            How VyaparSetu Simplifies Business Clearances
          </h1>
          <p className="text-sm text-slate-300 mt-3 leading-relaxed">
            A unified, transparent workflow that eliminates physical office visits.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          {STEPS.map((step, idx) => (<div key={step.title} className="flex gap-4">
              <span className="shrink-0 font-mono text-sm font-bold text-blue-800">{String(idx + 1).padStart(2, '0')}.</span>
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{step.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{step.desc}</p>
              </div>
            </div>))}
        </div>
      </div>
    </div>);
};
