import { useState, useMemo } from 'react';
import medicinesData from '../data/medicines.json';
import { Activity, ChevronRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import explorerBg from '../assets/explorer-bg.jpg';

export default function IngredientExplorer() {
  const ingredients = useMemo(() => {
    const salts = [...new Set(medicinesData.map(m => m.activeIngredient))];
    return salts.sort();
  }, []);

  const [selectedIngredient, setSelectedIngredient] = useState(ingredients[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIngredients = ingredients.filter(i => i.toLowerCase().includes(searchTerm.toLowerCase()));

  const relatedMedicines = useMemo(() => {
    return medicinesData.filter(m => m.activeIngredient === selectedIngredient);
  }, [selectedIngredient]);

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center pt-10 pb-32">
      
      {/* Absolute Background Image with Low Transparency */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-slate-50">
        <img 
          src={explorerBg} 
          alt="Molecular Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-multiply scale-105" 
        />
        {/* Soft gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/80 to-white/95" />
      </div>

      <div className="container mx-auto px-10 relative z-10 w-full max-w-6xl mt-12">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-slate-900"
          >
            Ingredient Explorer
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-lg"
          >
            Discover formulations and alternatives by searching for active chemical salts.
          </motion.p>
        </div>

        {/* Premium Dashboard Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/60 backdrop-blur-xl border border-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(6,182,212,0.1)] overflow-hidden flex flex-col md:flex-row"
        >
          
          {/* Sidebar */}
          <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50/50">
            <div className="p-6 border-b border-slate-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text"
                  placeholder="Search salts..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            </div>
            
            <div className="flex flex-col h-[400px] md:h-[600px] overflow-y-auto p-4 custom-scrollbar">
              {filteredIngredients.map(ingredient => (
                <button
                  key={ingredient}
                  onClick={() => setSelectedIngredient(ingredient)}
                  className={`text-left px-5 py-4 rounded-xl transition-all text-sm font-bold border mb-2 ${
                    selectedIngredient === ingredient 
                      ? 'bg-cyan-600 text-white border-cyan-500 shadow-md' 
                      : 'bg-white text-slate-600 border-transparent hover:border-slate-200 hover:shadow-sm'
                  }`}
                >
                  {ingredient}
                </button>
              ))}
              {filteredIngredients.length === 0 && (
                <p className="text-center text-slate-400 text-sm mt-10">No ingredients found.</p>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full md:w-2/3 p-8 md:p-12 bg-white/40">
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedIngredient}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                    <Activity className="text-cyan-600 w-5 h-5" />
                  </div>
                  <span className="text-cyan-700 uppercase tracking-[0.2em] text-xs font-bold">Salt Profile</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-10 tracking-tight leading-tight">
                  {selectedIngredient}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Therapeutic Category</p>
                    <p className="text-lg font-bold text-cyan-800">{relatedMedicines[0]?.therapeuticGroup}</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Available Strengths</p>
                    <p className="text-lg font-bold text-cyan-800">
                      {[...new Set(relatedMedicines.map(m => m.strength))].join(', ')}
                    </p>
                  </div>
                </div>

                <div className="mt-auto">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-6 pl-2 border-l-2 border-cyan-400">Available Formulations</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {relatedMedicines.map((med, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={med.id}
                      >
                        <Link 
                          to={`/report/${med.id}`}
                          data-cursor="VIEW"
                          className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-cyan-400 hover:shadow-md transition-all shadow-sm flex items-center justify-between"
                        >
                          <div>
                            <h4 className="font-bold text-slate-900 mb-1 group-hover:text-cyan-700 transition-colors">{med.brandedName}</h4>
                            <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">{med.dosageForm} • {med.strength}</p>
                          </div>
                          
                          <div className="flex items-center gap-6">
                            <div className="text-right hidden sm:block">
                              <p className="text-[10px] text-emerald-600 uppercase tracking-widest font-bold mb-1">Jan Aushadhi</p>
                              <p className="font-mono text-emerald-600 font-bold">₹{med.janAushadhiPrice.toFixed(2)}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-cyan-50 group-hover:border-cyan-200 transition-colors">
                              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-600" />
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
