import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LogoSymbol = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:scale-110 transition-transform duration-500">
    {/* Left Pill (Branded) - Solid */}
    <rect x="2" y="6" width="12" height="20" rx="6" fill="#06b6d4" />
    {/* Right Pill (Generic) - Outline */}
    <rect x="18" y="6" width="12" height="20" rx="6" fill="transparent" stroke="#10b981" strokeWidth="3" />
    {/* Connection line indicating comparison/equality */}
    <path d="M10 16H22" stroke="#0f172a" strokeWidth="2" strokeDasharray="2 2" strokeLinecap="round" />
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Compare', path: '/compare' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'Explorer', path: '/explorer' },
    { name: 'How It Works', path: '/how-it-works' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 flex justify-center ${
        scrolled ? 'pt-4 px-4' : 'pt-8 px-6'
      }`}
    >
      <div className={`w-full max-w-6xl mx-auto flex justify-between items-center transition-all duration-500 rounded-2xl ${
        scrolled ? 'glass-panel px-6 py-3' : 'px-2 py-2 bg-transparent'
      }`}>
        
        {/* Brand */}
        <Link to="/" data-cursor="HOME" className="flex items-center gap-3 group relative z-10">
          <LogoSymbol />
          <div className="flex items-baseline hidden sm:flex">
            <span style={{ fontFamily: 'var(--font-logo)' }} className="text-3xl text-slate-900 tracking-tight leading-none">
              GMT
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center relative">
          <div className="flex gap-1 relative z-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  data-cursor={link.name}
                  className={`relative px-5 py-2 text-[13px] uppercase tracking-widest font-semibold transition-colors duration-300 ${
                    isActive ? 'text-cyan-700' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-cyan-100 rounded-full border border-cyan-200"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link 
            to="/compare" 
            data-cursor="COMPARE"
            className="group relative px-6 py-2.5 rounded-full overflow-hidden flex items-center justify-center bg-cyan-600 border border-cyan-500 hover:bg-cyan-500 transition-all duration-300 shadow-[0_4px_14px_0_rgba(6,182,212,0.39)] hover:shadow-[0_6px_20px_rgba(6,182,212,0.23)]"
          >
            <span className="relative z-10 text-[13px] uppercase tracking-widest font-bold text-white transition-colors">
              Start
            </span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-600 hover:text-slate-900 relative z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-4 right-4 mt-2 glass-panel rounded-2xl overflow-hidden md:hidden"
          >
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold tracking-wide ${
                    location.pathname === link.path ? 'bg-cyan-50 text-cyan-700' : 'text-slate-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
