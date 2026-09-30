import { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';
import medicinesData from '../data/medicines.json';

function AnimatedNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        setDisplayValue(v);
      }
    });
    return () => controls.stop();
  }, [value]);

  return <>{displayValue.toFixed(2)}</>;
}

export default function SavingsCalculator() {
  const [selectedMedId, setSelectedMedId] = useState(medicinesData[0].id);
  const [packsPerMonth, setPacksPerMonth] = useState(1);

  const med = medicinesData.find(m => m.id === selectedMedId);

  const monthlyBranded = med.brandedPrice * packsPerMonth;
  const monthlyGeneric = med.janAushadhiPrice * packsPerMonth;
  const monthlySavings = monthlyBranded - monthlyGeneric;
  const yearlySavings = monthlySavings * 12;

  const maxVal = Math.max(monthlyBranded, 1);
  const genericPct = (monthlyGeneric / maxVal) * 100;

  return (
    <div className="container mx-auto px-6 py-20 max-w-5xl relative z-10">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-cyan-600 mb-4">Interactive Estimation</p>
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-slate-900">Savings Calculator.</h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Controls */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-200 shadow-sm"
        >
          <div className="mb-10">
            <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-500 mb-4">Select Formulation</label>
            <div className="relative">
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-5 appearance-none cursor-pointer text-slate-900 font-medium focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all outline-none shadow-sm"
                value={selectedMedId}
                onChange={(e) => setSelectedMedId(parseInt(e.target.value))}
              >
                {medicinesData.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.activeIngredient} (vs {m.brandedName})
                  </option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-6">
              <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-500">Monthly Usage</label>
              <span className="text-3xl font-black text-cyan-600">{packsPerMonth} <span className="text-sm font-medium text-slate-400">packs</span></span>
            </div>
            
            <input 
              type="range" 
              min="1" max="12" 
              value={packsPerMonth}
              onChange={(e) => setPacksPerMonth(parseInt(e.target.value))}
              className="w-full h-1 bg-slate-200 rounded-full appearance-none cursor-pointer accent-cyan-500 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-cyan-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-3">
              <span>1</span>
              <span>6</span>
              <span>12</span>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-10"
        >
          {/* Big Number */}
          <div>
            <p className="text-[11px] uppercase tracking-widest font-bold text-emerald-600 mb-2">Total Yearly Savings</p>
            <div className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter flex items-baseline">
              <span className="text-4xl text-slate-400 mr-2 font-mono">₹</span>
              <AnimatedNumber value={yearlySavings} />
            </div>
          </div>

          {/* Visual Bars */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                <span className="text-slate-500">Branded Monthly</span>
                <span className="text-slate-900 font-mono">₹<AnimatedNumber value={monthlyBranded} /></span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-slate-300 rounded-full"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                <span className="text-emerald-600">Jan Aushadhi Monthly</span>
                <span className="text-emerald-700 font-mono">₹<AnimatedNumber value={monthlyGeneric} /></span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${genericPct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </div>
  );
}
