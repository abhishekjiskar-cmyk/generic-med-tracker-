import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ComparisonPage from './pages/ComparisonPage';
import SavingsCalculator from './pages/SavingsCalculator';
import IngredientExplorer from './pages/IngredientExplorer';
import HowItWorks from './pages/HowItWorks';
import MedicineReport from './pages/MedicineReport';
import CustomCursor from './components/CustomCursor';
import { Activity } from 'lucide-react';
import heroImage from './assets/hero-medicine.jpg';

const LogoSymbol = () => (
  <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="6" width="12" height="20" rx="6" fill="#06b6d4" />
    <rect x="18" y="6" width="12" height="20" rx="6" fill="transparent" stroke="#10b981" strokeWidth="3" />
    <path d="M10 16H22" stroke="#0f172a" strokeWidth="2" strokeDasharray="2 2" strokeLinecap="round" />
  </svg>
);

function LoadingScreen({ onComplete }) {
  return (
    <motion.div 
      className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-4">
        <LogoSymbol />
        <div className="overflow-hidden h-12 flex items-baseline">
          <motion.div
            initial={{ y: 48 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-baseline"
          >
            <span style={{ fontFamily: 'var(--font-logo)' }} className="text-5xl text-slate-900 tracking-tight leading-none">
              GMT
            </span>
          </motion.div>
        </div>
      </div>
      <motion.div 
        className="mt-6 h-0.5 bg-cyan-500"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 200, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
        onAnimationComplete={() => setTimeout(onComplete, 400)}
      />
    </motion.div>
  );
}

function AnimatedRoutes() {
// ... existing AnimatedRoutes code ...
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/compare" element={<PageWrapper><ComparisonPage /></PageWrapper>} />
        <Route path="/calculator" element={<PageWrapper><SavingsCalculator /></PageWrapper>} />
        <Route path="/explorer" element={<PageWrapper><IngredientExplorer /></PageWrapper>} />
        <Route path="/how-it-works" element={<PageWrapper><HowItWorks /></PageWrapper>} />
        <Route path="/report/:id" element={<PageWrapper><MedicineReport /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <CustomCursor />
      <div className="noise-bg" />
      
      {/* Global Floating 3D Artifact */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-between opacity-15 mix-blend-multiply">
        <motion.img 
          src={heroImage} 
          className="absolute -left-20 top-1/4 w-[400px] h-[400px] object-cover rounded-full"
          animate={{ y: [-20, 20, -20], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img 
          src={heroImage} 
          className="absolute -right-20 bottom-1/4 w-[500px] h-[500px] object-cover rounded-full blur-[2px]"
          animate={{ y: [20, -20, 20], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="min-h-screen flex flex-col font-sans text-slate-900 selection:bg-cyan-100">
        <Navbar />
        <main className="flex-grow pt-24 relative z-10">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}
