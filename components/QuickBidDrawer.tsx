'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  Sparkles, 
  Send, 
  ShieldCheck, 
  Clock, 
  IndianRupee, 
  CheckCircle2, 
  Layers, 
  Building,
  Check
} from 'lucide-react';

export const QuickBidDrawer: React.FC = () => {
  const { 
    isQuickBidOpen, 
    setIsQuickBidOpen, 
    selectedGigForBid, 
    freelancer, 
    showToast 
  } = useApp();

  const gig = selectedGigForBid;

  const [bidAmount, setBidAmount] = useState<number>(gig?.budget || 20000);
  const [timeline, setTimeline] = useState<string>(gig?.deadline || '14 Days');
  const [pitch, setPitch] = useState<string>(
    `Hello! I am a Punjab Skill Development Mission (PSDM NSQF-5) accredited developer from MSDC Mohali with direct expertise delivering full-stack telemetry and AI inventory dashboards for industrial clients.\n\nI can execute this project smoothly across your 3 milestones, backed by verified code deliverables and Smart Escrow milestone guarantees.`
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isQuickBidOpen || !gig) return null;

  const handleSubmitBid = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsQuickBidOpen(false);
      showToast(`🎯 Bid of ₹${bidAmount.toLocaleString('en-IN')} submitted to ${gig.clientCompany}!`);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-zinc-950/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg h-full bg-white shadow-2xl border-l border-zinc-200 flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pink-500 text-white flex items-center justify-center shadow-md shadow-pink-200">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900">AI Quick Bid & Proposal</h3>
              <p className="text-[11px] text-zinc-500">Semantic match: {gig.matchScore || 98}% with your PSDM profile</p>
            </div>
          </div>

          <button
            onClick={() => setIsQuickBidOpen(false)}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          
          {/* Target Project Card */}
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-500 flex items-center gap-1 font-medium">
                <Building className="w-3.5 h-3.5 text-zinc-400" />
                {gig.clientCompany}
              </span>
              <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Budget: ₹{gig.budget.toLocaleString('en-IN')}
              </span>
            </div>
            <h4 className="text-sm font-bold text-zinc-900">{gig.title}</h4>
            <p className="text-xs text-zinc-600 line-clamp-2">{gig.description}</p>
          </div>

          {/* Bid configuration */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-zinc-700 block mb-1">Your Bid Offer (₹)</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-zinc-400 font-mono text-xs">₹</span>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 text-xs font-mono font-bold rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-700 block mb-1">Proposed Timeline</label>
              <input
                type="text"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          {/* AI Tailored Pitch */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-zinc-700">Tailored Pitch Draft</label>
              <span className="text-[10px] text-pink-600 font-mono flex items-center gap-0.5 font-bold">
                <Sparkles className="w-3 h-3" /> Auto-Generated
              </span>
            </div>
            <textarea
              rows={6}
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              className="w-full p-3 text-xs font-mono rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-zinc-50/50 leading-relaxed"
            />
          </div>

          {/* Attached Credentials */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-2">
            <div className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Accredited Credentials Attached</span>
            </div>
            <div className="text-xs text-indigo-700 flex items-center justify-between">
              <span>Punjab Skill Development Mission (NSQF L5)</span>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                Verified
              </span>
            </div>
            <div className="text-[11px] font-mono text-indigo-900/70 truncate">
              Merkle Hash: {freelancer.certifications[0]?.sha256Proof}
            </div>
          </div>

          {/* Milestone preview */}
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Included Escrow Milestones ({gig.milestones.length})
            </div>
            {gig.milestones.map((m, idx) => (
              <div key={m.id} className="p-2.5 rounded-xl border border-zinc-200 bg-white flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-zinc-100 font-mono text-[10px] flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span className="font-medium text-zinc-800 line-clamp-1">{m.title}</span>
                </div>
                <span className="font-mono font-bold text-zinc-700 shrink-0">₹{m.amount.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between gap-3">
          <button
            onClick={() => setIsQuickBidOpen(false)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-600 hover:bg-zinc-200 transition-colors"
          >
            Cancel
          </button>

          <button
            disabled={isSubmitting}
            onClick={handleSubmitBid}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Sending Proposal...' : 'Submit Proposal & Lock Escrow'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
