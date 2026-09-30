import { useState, useMemo, useRef } from 'react';
import { Search, Filter, ArrowUpDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import medicinesData from '../data/medicines.json';

function SpotlightCard({ children, to }) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Link 
      to={to}
      ref={divRef}
      onMouseMove={handleMouseMove}
      data-cursor="VIEW"
      style={{ '--x': `${position.x}px`, '--y': `${position.y}px` }}
      className="spotlight-card block bg-white rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300 border border-slate-200 hover:border-cyan-300 shadow-sm hover:shadow-md"
    >
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </Link>
  );
}

export default function ComparisonPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('savings-desc');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', ...new Set(medicinesData.map(m => m.therapeuticGroup))];

  const filteredAndSorted = useMemo(() => {
    let result = medicinesData.filter(m => 
      (m.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) || 
       m.activeIngredient.toLowerCase().includes(searchTerm.toLowerCase()) ||
       m.brandedName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterCategory === 'All' || m.therapeuticGroup === filterCategory)
    );

    result.sort((a, b) => {
      const savingsA = a.brandedPrice - a.janAushadhiPrice;
      const savingsB = b.brandedPrice - b.janAushadhiPrice;
      const pctA = savingsA / a.brandedPrice;
      const pctB = savingsB / b.brandedPrice;

      if (sortBy === 'savings-desc') return pctB - pctA;
      if (sortBy === 'savings-asc') return pctA - pctB;
      if (sortBy === 'price-desc') return b.brandedPrice - a.brandedPrice;
      if (sortBy === 'price-asc') return a.brandedPrice - b.brandedPrice;
      return 0;
    });

    return result;
  }, [searchTerm, sortBy, filterCategory]);

  return (
    <div className="container mx-auto px-6 py-12 relative z-10">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900">Compare Medicines.</h1>
        
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search active salt or brand..."
              className="w-full bg-white border border-slate-200 shadow-sm rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium transition-all text-slate-900 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <select 
                className="appearance-none bg-white border border-slate-200 shadow-sm rounded-xl py-3.5 pl-5 pr-12 cursor-pointer text-sm font-medium text-slate-900 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
            </div>

            <div className="relative">
              <select 
                className="appearance-none bg-white border border-slate-200 shadow-sm rounded-xl py-3.5 pl-5 pr-12 cursor-pointer text-sm font-medium text-slate-900 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="savings-desc">Highest Savings (%)</option>
                <option value="savings-asc">Lowest Savings (%)</option>
                <option value="price-desc">Highest Price</option>
                <option value="price-asc">Lowest Price</option>
              </select>
              <ArrowUpDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredAndSorted.map((med, index) => {
            const savings = med.brandedPrice - med.janAushadhiPrice;
            const pct = Math.round((savings / med.brandedPrice) * 100);
            
            return (
              <motion.div 
                layout
                key={med.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <SpotlightCard to={`/report/${med.id}`}>
                  
                  {/* Top: Category & Ingredient */}
                  <div className="mb-6 flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 mb-2 block">
                        {med.therapeuticGroup}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight">{med.activeIngredient}</h3>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-50 transition-colors">
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600" />
                    </div>
                  </div>

                  {/* Middle: Data Visualization Style Comparison */}
                  <div className="flex-grow flex flex-col justify-center">
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Branded</p>
                        <p className="text-slate-800 text-sm font-medium">{med.brandedName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] uppercase tracking-wider text-emerald-600 font-semibold mb-1">Jan Aushadhi</p>
                        <p className="text-emerald-700 text-sm font-medium">{med.janAushadhiName}</p>
                      </div>
                    </div>
                    
                    {/* Visual Price Bar */}
                    <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden my-4 border border-slate-200">
                      {/* Branded total (background) */}
                      <div className="absolute top-0 left-0 h-full w-full bg-slate-300" />
                      {/* Generic portion (lime) */}
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(med.janAushadhiPrice / med.brandedPrice) * 100}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="absolute top-0 left-0 h-full bg-emerald-500"
                      />
                    </div>
                    
                    <div className="flex justify-between items-start font-mono text-lg font-semibold">
                      <span className="text-slate-700">₹{med.brandedPrice.toFixed(2)}</span>
                      <span className="text-emerald-600">₹{med.janAushadhiPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Bottom: Specs & Difference */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[11px] text-slate-500 font-mono">{med.strength} • {med.dosageForm}</p>
                      <p className="text-[11px] text-slate-500 font-mono">Pack: {med.genericPack}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Difference</p>
                      <p className="text-xl font-black text-slate-900">
                        {pct}%
                      </p>
                    </div>
                  </div>

                </SpotlightCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
      
      {filteredAndSorted.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center py-32 text-slate-500 text-lg font-medium"
        >
          No medicines found matching your criteria.
        </motion.div>
      )}
    </div>
  );
}
