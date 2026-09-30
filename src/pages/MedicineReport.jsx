import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, AlertTriangle, FileText, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import medicinesData from '../data/medicines.json';

export default function MedicineReport() {
  const { id } = useParams();
  const med = medicinesData.find(m => m.id === parseInt(id));

  if (!med) {
    return <div className="text-center py-32 font-medium text-slate-500">Medicine not found.</div>;
  }

  const savings = med.brandedPrice - med.janAushadhiPrice;
  const pctSavings = Math.round((savings / med.brandedPrice) * 100);
  const isPackComparable = med.brandedPack === med.genericPack;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl relative z-10">
      
      <Link to="/compare" data-cursor="BACK" className="inline-flex items-center text-[11px] uppercase tracking-widest font-bold text-slate-500 hover:text-slate-900 mb-12 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to comparisons
      </Link>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="bg-white border border-slate-200 shadow-sm rounded-[2rem] p-8 md:p-16 relative overflow-hidden"
      >
        {/* Decorative Grid */}
        <div className="absolute inset-0 medical-grid opacity-5 pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 relative z-10">
          <div>
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-cyan-600" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-cyan-600">Match Report</span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              SaltMatch Analysis
            </motion.h1>
          </div>
          <motion.div variants={itemVariants} className="mt-6 md:mt-0 px-6 py-3 rounded-full border border-emerald-200 bg-emerald-50">
            <span className="text-emerald-600 font-bold text-lg">{pctSavings}% SAVINGS</span>
          </motion.div>
        </div>

        {/* The Comparison Data Viz */}
        <div className="relative z-10 flex flex-col md:flex-row items-stretch justify-between gap-8 mb-16">
          
          {/* Branded Side */}
          <motion.div variants={itemVariants} className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-bold mb-2">Branded Option</p>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{med.brandedName}</h3>
            <p className="text-2xl font-mono text-slate-600 font-semibold mb-6">₹{med.brandedPrice.toFixed(2)}</p>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent md:to-slate-300 mb-6" />
            <p className="text-xs text-slate-500 uppercase tracking-widest">{med.brandedPack}</p>
          </motion.div>

          {/* Center Connection (Desktop) */}
          <div className="hidden md:flex flex-col items-center justify-center relative w-16">
            <div className="absolute top-8 bottom-8 w-px bg-slate-200" />
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-8 bottom-8 w-px bg-cyan-400" 
            />
            <div className="w-8 h-8 rounded-full bg-white border border-cyan-400 flex items-center justify-center z-10 text-[10px] font-bold text-cyan-600">
              VS
            </div>
          </div>

          {/* Jan Aushadhi Side */}
          <motion.div variants={itemVariants} className="flex-1 flex flex-col items-center md:items-end text-center md:text-right">
            <p className="text-[10px] uppercase tracking-[0.15em] text-emerald-600 font-bold mb-2">Jan Aushadhi Alternative</p>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{med.janAushadhiName}</h3>
            <p className="text-2xl font-mono text-emerald-600 font-bold mb-6">₹{med.janAushadhiPrice.toFixed(2)}</p>
            <div className="w-full h-px bg-gradient-to-l from-transparent via-slate-300 to-transparent md:to-slate-300 mb-6" />
            <p className="text-xs text-slate-500 uppercase tracking-widest">{med.genericPack}</p>
          </motion.div>

        </div>

        {/* Detailed Match Nodes */}
        <motion.div variants={itemVariants} className="relative z-10 bg-slate-50 rounded-2xl border border-slate-200 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { label: 'Active Ingredient', value: med.activeIngredient, match: 'Exact Match' },
              { label: 'Strength', value: med.strength, match: 'Exact Match' },
              { label: 'Dosage Form', value: med.dosageForm, match: 'Comparable Form' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <p className="text-[10px] uppercase tracking-[0.15em] text-cyan-600 font-bold mb-2">{item.label}</p>
                <p className="text-sm font-semibold text-slate-900 mb-3 leading-tight">{item.value}</p>
                <div className="mt-auto flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 self-start px-2 py-1 rounded border border-emerald-200">
                  <Check className="w-3 h-3 stroke-[3]" /> {item.match}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {isPackComparable ? (
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200 text-emerald-600">
                  <Check className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center border border-amber-200 text-amber-600">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              )}
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-bold">Pack Status</p>
                <p className={`text-sm font-semibold ${isPackComparable ? 'text-emerald-700' : 'text-amber-600'}`}>
                  {isPackComparable ? 'Packs are directly comparable.' : 'Different pack sizes. Unit price adjustment recommended.'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-600 font-bold border border-slate-200 bg-white shadow-sm px-3 py-1.5 rounded-full">
              <FileText className="w-3 h-3" /> Data: {med.source}
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
