import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, TrendingDown, ChevronRight } from 'lucide-react';
import heroImage from '../assets/hero-medicine.jpg';

// Word animation helper
const title = "SAME SALT. SMARTER SAVINGS.";
const words = title.split(" ");

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-200 blur-[120px] mix-blend-multiply opacity-50" />
        <div className="absolute top-[40%] right-[-10%] w-[40%] h-[50%] rounded-full bg-teal-100 blur-[120px] mix-blend-multiply opacity-50" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-32 relative z-10 flex flex-col lg:flex-row items-center">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left mb-20 lg:mb-0 relative z-20">
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center gap-3 px-3 py-1.5 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm mb-8 shadow-sm"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600">
              Medicine Price Transparency Platform
            </span>
          </motion.div>
          
          <h1 className="text-[clamp(48px,8vw,96px)] font-black leading-[0.9] tracking-tighter mb-8 max-w-3xl text-slate-900">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.15 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                className={`inline-block mr-[2%] ${
                  word === "SAVINGS." ? "text-gradient bg-gradient-to-r from-teal-500 to-cyan-600" : "text-slate-900"
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="text-lg md:text-xl text-slate-600 max-w-lg mb-12 font-medium leading-relaxed"
          >
            Explore medicine ingredients, compare prices and understand the difference between branded and generic options.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <Link 
              to="/compare" 
              data-cursor="GO"
              className="px-8 py-4 rounded-full bg-cyan-600 text-white font-bold text-[13px] uppercase tracking-widest hover:bg-cyan-500 active:scale-95 transition-all shadow-[0_8px_30px_rgb(6,182,212,0.3)] hover:shadow-[0_8px_30px_rgb(6,182,212,0.5)] flex items-center justify-center gap-2"
            >
              Explore Medicines <ChevronRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/how-it-works" 
              data-cursor="READ"
              className="px-8 py-4 rounded-full bg-white text-slate-900 border border-slate-200 shadow-sm font-bold text-[13px] uppercase tracking-widest hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              How it Works
            </Link>
          </motion.div>
        </div>

        {/* Abstract 3D Visual */}
        <div className="w-full lg:w-1/2 relative h-[500px] flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* The generated image */}
            <div className="relative z-10 w-[80%] max-w-[400px] aspect-square rounded-[2rem] overflow-hidden shadow-2xl mix-blend-multiply bg-transparent">
               <motion.img 
                 animate={{ y: [-10, 10, -10] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 src={heroImage} 
                 alt="Premium 3D Capsule" 
                 className="w-full h-full object-cover scale-110 mix-blend-multiply bg-transparent"
               />
            </div>

            {/* Floating Info Cards */}
            <motion.div 
              animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[15%] right-[0%] bg-white p-4 rounded-2xl flex items-center gap-4 z-20 border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
            >
               <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center">
                 <TrendingDown className="text-teal-600 w-5 h-5" />
               </div>
               <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Average Savings</p>
                  <p className="text-xl font-bold text-slate-900 tracking-tight">Up to 80%</p>
               </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[15%] left-[0%] bg-white p-4 rounded-2xl flex items-center gap-4 z-20 border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
            >
               <div className="w-10 h-10 bg-cyan-50 rounded-full flex items-center justify-center">
                 <ShieldCheck className="text-cyan-600 w-5 h-5" />
               </div>
               <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Quality Assured</p>
                  <p className="text-xl font-bold text-slate-900 tracking-tight">WHO-GMP</p>
               </div>
            </motion.div>

          </motion.div>
        </div>

      </div>

      {/* Stats Section */}
      <div className="border-y border-slate-200 bg-white/50 backdrop-blur-md relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {[
              { label: 'Medicines Compared', value: '10', suffix: '+' },
              { label: 'Categories Covered', value: '5', suffix: '' },
              { label: 'Data Source', value: 'PMBJP', suffix: '' }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="py-12 md:py-16 text-center flex flex-col items-center justify-center"
              >
                <h3 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-2">
                  {stat.value}<span className="text-cyan-600">{stat.suffix}</span>
                </h3>
                <p className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
