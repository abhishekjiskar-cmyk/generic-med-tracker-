import { Link } from 'react-router-dom';

const LogoSymbol = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:scale-110 transition-transform duration-500">
    <rect x="2" y="6" width="12" height="20" rx="6" fill="#06b6d4" />
    <rect x="18" y="6" width="12" height="20" rx="6" fill="transparent" stroke="#10b981" strokeWidth="3" />
    <path d="M10 16H22" stroke="#0f172a" strokeWidth="2" strokeDasharray="2 2" strokeLinecap="round" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-200 bg-white pt-20 pb-10 mt-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <LogoSymbol />
              <div className="flex items-baseline">
                <span style={{ fontFamily: 'var(--font-logo)' }} className="text-3xl text-slate-900 tracking-tight leading-none">
                  GMT
                </span>
              </div>
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Generic Med Tracker is an educational platform providing transparent price comparisons 
              between branded medicines and PMBJP Jan Aushadhi alternatives.
            </p>
            <div className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 leading-relaxed uppercase tracking-wider font-medium">
              Price comparison is for informational purposes only. Consult a qualified doctor or pharmacist before changing medication.
            </div>
          </div>
          
          <div className="flex gap-16">
            <div>
              <h4 className="text-slate-900 font-bold mb-4 text-sm">Platform</h4>
              <ul className="space-y-3">
                <li><Link to="/compare" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors">Compare</Link></li>
                <li><Link to="/calculator" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors">Calculator</Link></li>
                <li><Link to="/explorer" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors">Explorer</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-bold mb-4 text-sm">Information</h4>
              <ul className="space-y-3">
                <li><Link to="/how-it-works" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors">How it works</Link></li>
                <li><a href="https://janaushadhi.gov.in/" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors">PMBJP Official</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-400 uppercase tracking-widest font-bold">
          <p>© {new Date().getFullYear()} Generic Med Tracker. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
