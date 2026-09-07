'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export const StartingSplash: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Automatically transition smoothly after 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 0.98,
            filter: 'blur(8px)',
            transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F6F7FA] text-zinc-900 overflow-hidden select-none"
        >
          {/* Soft, Light Pastel Ambient Glowing Meshes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.45, 0.7, 0.45],
                x: [0, 25, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-24 -left-24 w-[480px] h-[480px] bg-gradient-to-br from-emerald-100 via-teal-50 to-transparent rounded-full blur-3xl opacity-60"
            />
            
            <motion.div
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.35, 0.6, 0.35],
                x: [0, -30, 0],
                y: [0, 25, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-gradient-to-tl from-indigo-100/80 via-emerald-50/60 to-transparent rounded-full blur-3xl opacity-50"
            />

            {/* Light subtle radial center tint */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95)_0%,rgba(244,245,248,0.7)_80%)]" />
          </div>

          {/* Center Content Container */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">
            
            {/* Soft Floating Emblem with Gentle Ripple */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-6"
            >
              {/* Soft ethereal breathing pulse ring */}
              <motion.div
                animate={{ 
                  scale: [1, 1.12, 1], 
                  opacity: [0.25, 0.5, 0.25] 
                }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-3 rounded-full bg-gradient-to-tr from-emerald-200 via-teal-100 to-indigo-100 blur-xl pointer-events-none"
              />

              {/* Gentle Floating Emblem Container */}
              <motion.div
                animate={{
                  y: [0, -7, 0],
                }}
                transition={{
                  duration: 3.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-2.5 bg-white shadow-[0_15px_35px_-5px_rgba(16,185,129,0.18),0_5px_15px_-3px_rgba(0,0,0,0.05)] flex items-center justify-center border border-zinc-200/90"
              >
                <img
                  src="/techpunjab-logo.png"
                  alt="TechPunjab Official Government Logo"
                  className="w-full h-full object-contain drop-shadow-sm"
                />

                {/* Soft verified badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                  className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-1.5 shadow-md border-2 border-white"
                >
                  <ShieldCheck className="w-4 h-4" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Soft Typography Animations */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-mono font-bold tracking-wider uppercase mb-2 shadow-xs">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>Government of Punjab Official Portal</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 mt-1">
                TECH <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-800 bg-clip-text text-transparent">PUNJAB</span>
              </h1>

              <p className="text-xs sm:text-sm text-zinc-600 mt-1.5 font-medium">
                Skilled Tech Workers • Better Punjab • Stronger Future
              </p>
            </motion.div>

            {/* Light Soft Silk Progress Bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '100%' }}
              transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
              className="w-48 sm:w-60 mt-7"
            >
              <div className="h-1.5 w-full bg-zinc-200/80 rounded-full overflow-hidden p-0.5 shadow-inner">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.3, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mt-2">
                <span>Loading Platform...</span>
                <span className="text-emerald-700 font-bold">Ready</span>
              </div>
            </motion.div>

            {/* Clean, Subtle Skip Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              onClick={() => setShowSplash(false)}
              className="mt-6 text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-1.5 transition-all px-3 py-1.5 rounded-full border border-zinc-200 hover:border-zinc-300 bg-white shadow-xs hover:shadow-sm"
            >
              <span>Skip intro</span>
              <ArrowRight className="w-3 h-3 text-zinc-400" />
            </motion.button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
