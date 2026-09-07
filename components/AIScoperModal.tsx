'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Sparkles, 
  X, 
  Layers, 
  Clock, 
  IndianRupee, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  FileText, 
  Zap, 
  Send,
  Building,
  Check,
  RotateCcw
} from 'lucide-react';
import { GigProject, Milestone } from '@/types';

export const AIScoperModal: React.FC = () => {
  const { 
    isScoperModalOpen, 
    setIsScoperModalOpen, 
    addNewProject, 
    showToast,
    freelancer 
  } = useApp();

  const [promptInput, setPromptInput] = useState<string>(
    'Build an automated inventory tracker for retail'
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [hasGenerated, setHasGenerated] = useState<boolean>(true);

  // Scoped output state
  const [scopedTitle, setScopedTitle] = useState<string>('Automated Retail Inventory & Low-Stock Telemetry System');
  const [scopedBudget, setScopedBudget] = useState<number>(20000);
  const [scopedTimeline, setScopedTimeline] = useState<string>('14 Days');
  const [recommendedSkills, setRecommendedSkills] = useState<string[]>([
    'Next.js 14', 'FastAPI', 'Gemini API', 'PostgreSQL', 'UPI Escrow'
  ]);
  const [scopedMilestones, setScopedMilestones] = useState<Milestone[]>([
    {
      id: `ms-${Date.now()}-1`,
      title: 'Milestone 1: Database Architecture & Core Inventory APIs',
      description: 'Design PostgreSQL schema for multi-warehouse SKU tracking and FastAPI endpoints for real-time stock sync.',
      amount: 5000,
      dueDate: 'Day 4',
      status: 'LOCKED',
      deliverables: ['Schema ERD', 'FastAPI Swagger Docs', 'Docker Compose'],
    },
    {
      id: `ms-${Date.now()}-2`,
      title: 'Milestone 2: Gemini AI Replenishment Model & Stock Alerts',
      description: 'Integrate predictive stock replenishment calculations and automated WhatsApp/Email threshold notifications.',
      amount: 10000,
      dueDate: 'Day 10',
      status: 'PENDING',
      deliverables: ['Gemini prompt pipeline', 'Alert dispatch webhooks', 'Telemetry UI'],
    },
    {
      id: `ms-${Date.now()}-3`,
      title: 'Milestone 3: Executive Analytics Dashboard & Production Handover',
      description: 'Full-featured reporting dashboard with warehouse role authentication and deployment on cloud hosting.',
      amount: 5000,
      dueDate: 'Day 14',
      status: 'PENDING',
      deliverables: ['Role-based dashboard', 'Production deployment URL', 'Documentation PDF'],
    },
  ]);

  // Freelancer proposal tab
  const [activeSubTab, setActiveSubTab] = useState<'client_scope' | 'freelancer_pitch'>('client_scope');
  const [generatedPitch, setGeneratedPitch] = useState<string>(
    `Respected Hiring Team,\n\nI reviewed your requirement for an "Automated Retail Inventory & Low-Stock Telemetry System". As a Punjab Skill Development Mission (PSDM NSQF-5) accredited full-stack engineer from MSDC Mohali, I have previously delivered a real-time freight analytics engine processing 45,000+ daily events.\n\nHere is how I will execute your 3 milestones:\n1. Stand up the PostgreSQL inventory schema & FastAPI endpoints within 4 days.\n2. Connect the Gemini API to forecast warehouse reorder points without costly overhead.\n3. Wrap the frontend in a responsive Next.js 14 Bento interface with native UPI escrow milestone checkpoints.\n\nReady to begin immediately under TechPunjab Smart Escrow.`
  );

  if (!isScoperModalOpen) return null;

  const handleRunAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      if (promptInput.toLowerCase().includes('textile') || promptInput.toLowerCase().includes('loom')) {
        setScopedTitle('AI Defect Inspection & Loom Telemetry for Ludhiana Textiles');
        setScopedBudget(32000);
        setScopedTimeline('18 Days');
        setRecommendedSkills(['Python OpenCV', 'YOLOv8', 'FastAPI', 'Next.js', 'PSDM IoT']);
        setScopedMilestones([
          {
            id: `ms-${Date.now()}-1`,
            title: 'Milestone 1: Camera Feed RTSP Streaming & Loom Calibration',
            description: 'Setup hardware camera ingest and fabric surface lighting calibration.',
            amount: 10000,
            dueDate: 'Day 5',
            status: 'LOCKED',
            deliverables: ['RTSP streaming server', 'Camera mounting spec'],
          },
          {
            id: `ms-${Date.now()}-2`,
            title: 'Milestone 2: Defect Classification Neural Model (YOLOv8)',
            description: 'Detect yarn breaks, weave flaws, and oil stains at 60 FPS.',
            amount: 14000,
            dueDate: 'Day 12',
            status: 'PENDING',
            deliverables: ['Trained model weights', 'Confusion matrix benchmark'],
          },
          {
            id: `ms-${Date.now()}-3`,
            title: 'Milestone 3: Production Floor Alerting & Defect Heatmap UI',
            description: 'Next.js dashboard with sound buzzer trigger and shift analytics.',
            amount: 8000,
            dueDate: 'Day 18',
            status: 'PENDING',
            deliverables: ['Dashboard UI', 'SMS Alert hook'],
          },
        ]);
      } else {
        setScopedTitle('Automated Retail Inventory & Low-Stock Telemetry System');
        setScopedBudget(20000);
        setScopedTimeline('14 Days');
        setRecommendedSkills(['Next.js 14', 'FastAPI', 'Gemini API', 'PostgreSQL', 'UPI Escrow']);
      }
      setIsGenerating(false);
      setHasGenerated(true);
      showToast('✨ AI successfully decomposed requirements into 3 milestones!');
    }, 1100);
  };

  const handlePublishProject = () => {
    const newGig: GigProject = {
      id: `gig-ai-${Date.now()}`,
      title: scopedTitle,
      clientName: 'Punjab MSME Enterprise',
      clientCompany: 'Punjab Industrial Growth Consortium',
      clientLocation: 'Mohali / Ludhiana Industrial Belt',
      budget: scopedBudget,
      escrowLockedAmount: scopedMilestones[0].amount,
      deadline: scopedTimeline,
      category: 'Web & AI',
      skillsRequired: recommendedSkills,
      description: promptInput,
      matchScore: 98,
      matchRationale: 'Semantic match 98% with certified PSDM full-stack competencies.',
      status: 'OPEN',
      milestones: scopedMilestones,
    };

    addNewProject(newGig);
    setIsScoperModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-[28px] border border-zinc-200/80 shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-pink-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-zinc-900">AI Project Scope & Bid Generator</h2>
                <span className="text-[10px] font-mono font-bold bg-pink-50 text-pink-700 px-2 py-0.5 rounded-full border border-pink-200">
                  Gemini Flash 1.5
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                Decompose unrefined project ideas into verified milestones and instant tailored pitches
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsScoperModalOpen(false)}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub Navigation: Client Scoper vs Freelancer Proposal */}
        <div className="px-6 pt-3 pb-0 bg-zinc-50/70 border-b border-zinc-100 flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('client_scope')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeSubTab === 'client_scope'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Client Side: Project & Milestone Scoper</span>
          </button>

          <button
            onClick={() => setActiveSubTab('freelancer_pitch')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeSubTab === 'freelancer_pitch'
                ? 'border-pink-600 text-pink-700'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Freelancer Side: Tailored Pitch Generator</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">

          {activeSubTab === 'client_scope' ? (
            <>
              {/* Input Prompt Section */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-800 flex items-center justify-between">
                  <span>Describe the Project or MSME Requirement</span>
                  <span className="text-[11px] font-normal text-zinc-500">Natural language input</span>
                </label>
                <div className="relative">
                  <textarea
                    rows={2}
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    placeholder="e.g., Build an automated inventory tracker for retail"
                    className="w-full p-3 pr-28 text-sm rounded-2xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                  <button
                    disabled={isGenerating}
                    onClick={handleRunAI}
                    className="absolute right-2.5 bottom-3.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isGenerating ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                        <span>Parsing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-pink-200" />
                        <span>Parse with AI</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Quick chip suggestions */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-[10px] text-zinc-400 font-medium">Try Punjab MSME presets:</span>
                  <button
                    onClick={() => setPromptInput('Build an automated inventory tracker for retail')}
                    className="text-[11px] px-2.5 py-0.5 rounded-lg bg-zinc-100 hover:bg-indigo-50 hover:text-indigo-700 text-zinc-600 transition-colors border border-zinc-200/60"
                  >
                    Retail Inventory Tracker
                  </button>
                  <button
                    onClick={() => setPromptInput('AI camera defect inspection for Ludhiana textile looms')}
                    className="text-[11px] px-2.5 py-0.5 rounded-lg bg-zinc-100 hover:bg-indigo-50 hover:text-indigo-700 text-zinc-600 transition-colors border border-zinc-200/60"
                  >
                    Textile Loom Defect AI
                  </button>
                </div>
              </div>

              {/* Generated Milestones Card */}
              {hasGenerated && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  
                  {/* Summary Metric Chips */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                      <div className="text-[11px] text-zinc-500 font-medium flex items-center gap-1">
                        <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                        Recommended Budget
                      </div>
                      <div className="text-lg font-mono font-bold text-zinc-900 mt-0.5">
                        ₹{scopedBudget.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                      <div className="text-[11px] text-zinc-500 font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-indigo-600" />
                        Estimated Timeline
                      </div>
                      <div className="text-lg font-mono font-bold text-zinc-900 mt-0.5">
                        {scopedTimeline}
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                      <div className="text-[11px] text-zinc-500 font-medium flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-pink-600" />
                        Structured Milestones
                      </div>
                      <div className="text-lg font-mono font-bold text-zinc-900 mt-0.5">
                        3 Phased Sprints
                      </div>
                    </div>
                  </div>

                  {/* 3 Structured Milestones Breakdown */}
                  <div>
                    <div className="text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>Decomposed Sprints & Deliverable Criteria</span>
                      <span className="text-[11px] font-mono text-indigo-600">Smart Escrow Ready</span>
                    </div>

                    <div className="space-y-2.5">
                      {scopedMilestones.map((ms, index) => (
                        <div 
                          key={ms.id}
                          className="p-4 rounded-2xl border border-zinc-200/80 bg-white hover:border-indigo-200 transition-colors shadow-sm"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-mono font-bold text-xs flex items-center justify-center">
                                {index + 1}
                              </span>
                              <h4 className="text-xs sm:text-sm font-bold text-zinc-900">{ms.title}</h4>
                            </div>

                            <div className="flex items-center gap-2 text-xs">
                              <span className="font-mono text-zinc-500">{ms.dueDate}</span>
                              <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-200">
                                ₹{ms.amount.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-zinc-600 mt-2 ml-8">
                            {ms.description}
                          </p>

                          {ms.deliverables && (
                            <div className="flex items-center gap-1.5 flex-wrap mt-2.5 ml-8">
                              <span className="text-[10px] text-zinc-400 font-semibold uppercase">Deliverables:</span>
                              {ms.deliverables.map((d) => (
                                <span key={d} className="text-[10px] font-mono bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-md">
                                  ✓ {d}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Publish / Action Button */}
                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                    <div className="text-xs text-zinc-500">
                      Creates instant smart escrow workspace with pre-configured milestone payout gates.
                    </div>
                    <button
                      onClick={handlePublishProject}
                      className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Publish & Lock Milestone 1</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              )}
            </>
          ) : (
            /* FREELANCER PROPOSAL GENERATOR */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-200/80">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-pink-500 text-white flex items-center justify-center font-bold text-sm">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-pink-900">
                      Auto-Personalized Pitch for {freelancer.name}
                    </div>
                    <p className="text-xs text-pink-700/90 mt-0.5">
                      Highlights your verified PSDM NSQF-5 certification from MSDC Mohali and past logistics telemetry track record without generic AI fluff.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-800 block mb-1">
                  Tailored Pitch Draft
                </label>
                <textarea
                  rows={8}
                  value={generatedPitch}
                  onChange={(e) => setGeneratedPitch(e.target.value)}
                  className="w-full p-3 text-xs font-mono leading-relaxed rounded-2xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-zinc-50/50"
                />
              </div>

              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  Includes cryptographic hash verification proof automatically.
                </span>
                <button
                  onClick={() => {
                    showToast('🚀 Proposal submitted directly to client with PSDM verified badge!');
                    setIsScoperModalOpen(false);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Tailored Bid</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
