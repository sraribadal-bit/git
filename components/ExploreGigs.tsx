'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { GigProject } from '@/types';
import { 
  Search, 
  Sparkles, 
  MapPin, 
  Building, 
  IndianRupee, 
  Clock, 
  Lock, 
  Send, 
  ArrowRight, 
  Filter,
  CheckCircle2,
  Briefcase
} from 'lucide-react';

export const ExploreGigs: React.FC = () => {
  const { gigs, openQuickBid, setActiveGig, setActiveTab, setIsEscrowModalOpen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Web & AI', 'IoT & Automation', 'Cloud & Data'];

  const filteredGigs = gigs.filter((gig) => {
    const matchesCategory = selectedCategory === 'ALL' || gig.category === selectedCategory;
    const matchesSearch = 
      gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.clientCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.skillsRequired.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Page Title & Mission Tag */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-700 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-200">
              Punjab MSME Marketplace
            </span>
            <span className="text-zinc-400 text-xs">•</span>
            <span className="text-xs text-zinc-500 font-mono">PSDM Industry Connect</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mt-1">
            Explore Open Contracts & Gigs
          </h1>
        </div>

        <div className="glass-pill px-3 py-1.5 rounded-2xl flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="text-zinc-500">All contracts secured with</span>
          <span className="font-bold text-indigo-700">Native UPI Escrow</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-[24px] border border-zinc-200/80 shadow-sm mb-6 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords, skills (e.g., Next.js, IoT, Gemini, FastAPI) or Punjab cluster..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-zinc-900 text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Industrial Cluster Chips */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-zinc-500 pt-1">
          <span className="font-semibold text-[11px] text-zinc-400">Featured Regional Hubs:</span>
          <button 
            onClick={() => setSearchQuery('Amritsar')} 
            className="px-2 py-0.5 rounded-lg bg-zinc-50 hover:bg-indigo-50 hover:text-indigo-600 border border-zinc-200/60 text-[11px]"
          >
            Amritsar Agro-Industrial
          </button>
          <button 
            onClick={() => setSearchQuery('Mohali')} 
            className="px-2 py-0.5 rounded-lg bg-zinc-50 hover:bg-indigo-50 hover:text-indigo-600 border border-zinc-200/60 text-[11px]"
          >
            Mohali IT & Silicon Belt
          </button>
          <button 
            onClick={() => setSearchQuery('Ludhiana')} 
            className="px-2 py-0.5 rounded-lg bg-zinc-50 hover:bg-indigo-50 hover:text-indigo-600 border border-zinc-200/60 text-[11px]"
          >
            Ludhiana Auto & Engineering
          </button>
          <button 
            onClick={() => setSearchQuery('Jalandhar')} 
            className="px-2 py-0.5 rounded-lg bg-zinc-50 hover:bg-indigo-50 hover:text-indigo-600 border border-zinc-200/60 text-[11px]"
          >
            Jalandhar Sports & Leather
          </button>
        </div>
      </div>

      {/* Gigs List */}
      <div className="space-y-4">
        {filteredGigs.map((gig) => (
          <div
            key={gig.id}
            className="bento-card p-6 flex flex-col justify-between group"
          >
            <div>
              {/* Header metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-zinc-400" />
                    {gig.clientCompany}
                  </span>
                  <span className="text-zinc-300">•</span>
                  <span className="text-xs text-zinc-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-zinc-400" />
                    {gig.clientLocation}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {gig.matchScore && (
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-pink-50 text-pink-700 border border-pink-200 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-pink-500" />
                      {gig.matchScore}% Semantic Match
                    </span>
                  )}

                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    ₹{gig.budget.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors">
                {gig.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
                {gig.description}
              </p>

              {/* Skill Tags */}
              <div className="flex items-center gap-1.5 flex-wrap mt-3">
                {gig.skillsRequired.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-zinc-100 text-zinc-700 border border-zinc-200/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Milestones & CTA strip */}
            <div className="mt-5 pt-4 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-4 text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  Timeline: <strong className="text-zinc-800 ml-1">{gig.deadline}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-indigo-600" />
                  Escrow Locked: <strong className="text-indigo-700 font-mono ml-1">₹{gig.escrowLockedAmount.toLocaleString('en-IN')}</strong>
                </span>
                <span className="hidden md:inline font-mono">
                  {gig.milestones.length} Milestones
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveGig(gig);
                    setActiveTab('workspace');
                  }}
                  className="px-3.5 py-1.5 rounded-xl border border-zinc-300 hover:bg-zinc-50 text-zinc-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                  <span>Workspace</span>
                </button>

                <button
                  onClick={() => openQuickBid(gig)}
                  className="px-4 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm group/btn hover:scale-[1.02]"
                >
                  <Send className="w-3.5 h-3.5 text-pink-400" />
                  <span>Quick Bid</span>
                  <ArrowRight className="w-3 h-3 text-zinc-400 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
