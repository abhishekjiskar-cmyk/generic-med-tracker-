import { motion } from 'framer-motion';
import { Search, Beaker, Scale, Pill, Package, Tag, Calculator, CheckCircle2 } from 'lucide-react';
import hiwAnalysis from '../assets/hiw-1.jpg';
import hiwCompare from '../assets/hiw-2.jpg';

const phase1Steps = [
  { icon: Search, title: "Find Medicine", desc: "Search the branded medicine name you currently use." },
  { icon: Beaker, title: "Identify Active Salt", desc: "Extract the exact chemical formulation (e.g., Paracetamol)." },
  { icon: Scale, title: "Compare Strength", desc: "Ensure the dosage amount matches exactly (e.g., 500mg)." },
  { icon: Pill, title: "Compare Form", desc: "Match the administration type (Tablet vs Tablet)." },
];

const phase2Steps = [
  { icon: Package, title: "Normalize Pack", desc: "Adjust calculations mathematically if pack sizes differ." },
  { icon: Tag, title: "Compare Listed Price", desc: "Analyze the MRP of both the Branded and Jan Aushadhi options." },
  { icon: Calculator, title: "Calculate Difference", desc: "Determine exact savings and percentage difference instantly." }
];

export default function HowItWorks() {
  return (
    <div className="relative z-10 pb-32">
      {/* Header */}
      <div className="container mx-auto px-6 py-24 text-center max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 mb-8"
        >
          <CheckCircle2 className="w-4 h-4 text-cyan-600" />
          <span className="text-xs uppercase tracking-widest font-bold text-cyan-700">Precision Matching Engine</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-slate-900"
        >
          How It Works.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Our platform doesn't just look at names. We use a rigorous 7-step process to ensure you're comparing the exact same active ingredients, strengths, and forms.
        </motion.p>
      </div>

      <div className="container mx-auto px-6">
        
        {/* Phase 1: Analysis */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-32">
          
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Phase 1: Identification</h2>
            <p className="text-slate-500 mb-12 text-lg">We break down your branded medicine into its core chemical components to find a perfect match.</p>
            
            <div className="space-y-10">
              {phase1Steps.map((step, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                  key={index} 
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center shadow-sm">
                    <step.icon className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 order-1 lg:order-2"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(6,182,212,0.2)] border border-slate-100 bg-white">
              <img src={hiwAnalysis} alt="Medical Analysis Interface" className="w-full h-auto object-cover mix-blend-multiply" />
            </div>
          </motion.div>

        </div>

        {/* Phase 2: Comparison */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(16,185,129,0.2)] border border-slate-100 bg-white">
              <img src={hiwCompare} alt="Price Comparison Scale" className="w-full h-auto object-cover mix-blend-multiply" />
            </div>
          </motion.div>

          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Phase 2: Value Calculation</h2>
            <p className="text-slate-500 mb-12 text-lg">Once a perfect clinical match is found, we evaluate pack sizes and pricing to show your exact savings.</p>
            
            <div className="space-y-10">
              {phase2Steps.map((step, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                  key={index} 
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-sm">
                    <step.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
