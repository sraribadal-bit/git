'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { GigProject } from '@/types';
import { 
  Atom,
  Code2,
  Palette,
  Handshake,
  PenTool,
  Landmark,
  Scale,
  Users,
  Wrench,
  Search, 
  Sparkles, 
  MapPin, 
  Building, 
  Clock, 
  Lock, 
  Send, 
  ArrowRight, 
  Briefcase,
  X,
  CheckCircle2,
  Filter
} from 'lucide-react';

// Custom SVG icon for Admin & Support matching user mockup (person at reception/desk)
const AdminSupportIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.75" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="7" r="3" />
    <path d="M6 21v-4a3 3 0 0 1 3-3h6a3 3 0 0 1 3 4v3" />
    <rect x="3" y="16" width="18" height="5" rx="1" />
  </svg>
);

// 10 Work Categories matching the user screenshot
export const WORK_CATEGORIES = [
  { id: 'ai-services', title: 'AI Services', icon: Atom },
  { id: 'dev-it', title: 'Development & IT', icon: Code2 },
  { id: 'design-creative', title: 'Design & Creative', icon: Palette },
  { id: 'sales-marketing', title: 'Sales & Marketing', icon: Handshake },
  { id: 'writing-translation', title: 'Writing & Translation', icon: PenTool },
  { id: 'admin-support', title: 'Admin & Support', icon: AdminSupportIcon },
  { id: 'finance-accounting', title: 'Finance & Accounting', icon: Landmark },
  { id: 'legal', title: 'Legal', icon: Scale },
  { id: 'hr-training', title: 'HR & Training', icon: Users },
  { id: 'engineering-arch', title: 'Engineering & Architecture', icon: Wrench },
];

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'AI Services': ['AI', 'Gemini', 'Machine Learning', 'Vision', 'Python', 'FastAPI', 'PyTorch', 'Prompt', 'LLM', 'Web & AI'],
  'Development & IT': ['Development', 'Next.js', 'React', 'Full-Stack', 'API', 'PostgreSQL', 'Docker', 'Web', 'Web & AI', 'Cloud & Data'],
  'Design & Creative': ['Design', 'Figma', 'Packaging', 'UI/UX', 'Brand', 'Creative', 'Illustrator', 'Graphic'],
  'Sales & Marketing': ['Marketing', 'SEO', 'Sales', 'B2B', 'Outreach', 'Email', 'Lead', 'Campaign'],
  'Writing & Translation': ['Writing', 'Translation', 'Localization', 'Punjabi', 'Manuals', 'Documentation', 'Content', 'Gurmukhi'],
  'Admin & Support': ['Admin', 'Support', 'Virtual Assistant', 'CRM', 'Operations', 'Order', 'Excel'],
  'Finance & Accounting': ['Finance', 'Accounting', 'GST', 'Tally', 'Invoicing', 'Tax', 'Audit', 'E-Way', 'EDI'],
  'Legal': ['Legal', 'Contract', 'Samadhaan', 'NDA', 'Compliance', 'Dispute', 'Law', 'IP'],
  'HR & Training': ['HR', 'Training', 'Recruitment', 'PSDM', 'Staffing', 'Hiring', 'LMS'],
  'Engineering & Architecture': ['Engineering', 'Architecture', 'CAD', 'SolidWorks', 'CNC', 'IoT', 'Mechanical', 'IoT & Automation']
};

export const ExploreGigs: React.FC = () => {
  const { role, gigs, openQuickBid, setActiveGig, setActiveTab, setIsEscrowModalOpen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredGigs = gigs.filter((gig) => {
    let matchesCategory = selectedCategory === 'ALL';
    if (!matchesCategory) {
      if (gig.category === selectedCategory) {
        matchesCategory = true;
      } else {
        const keywords = CATEGORY_KEYWORDS[selectedCategory] || [];
        matchesCategory = keywords.some((kw) => 
          gig.category.toLowerCase().includes(kw.toLowerCase()) ||
          gig.title.toLowerCase().includes(kw.toLowerCase()) ||
          gig.description.toLowerCase().includes(kw.toLowerCase()) ||
          gig.skillsRequired.some(s => s.toLowerCase().includes(kw.toLowerCase()))
        );
      }
    }

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      q === '' ||
      gig.title.toLowerCase().includes(q) ||
      gig.description.toLowerCase().includes(q) ||
      gig.clientCompany.toLowerCase().includes(q) ||
      gig.clientLocation.toLowerCase().includes(q) ||
      gig.skillsRequired.some(s => s.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Page Title & Mission Tag */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Punjab Talent & MSME Marketplace
            </span>
            <span className="text-zinc-400 text-xs">•</span>
            <span className="text-xs text-zinc-500 font-mono">PSDM Industry Connect</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 mt-1">
            Explore Open Contracts & Verified Talent
          </h1>
        </div>

        <div className="glass-pill px-3 py-1.5 rounded-2xl flex items-center gap-2 text-xs bg-white border border-zinc-200 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-zinc-500">All contracts secured with</span>
          <span className="font-bold text-indigo-700">Native UPI Escrow</span>
        </div>
      </div>

      {/* 10 Work Categories Grid (Find freelancers for every type of work) */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
            Find freelancers for every type of work
          </h2>
          {selectedCategory !== 'ALL' && (
            <button
              type="button"
              onClick={() => setSelectedCategory('ALL')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              Show all categories
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {WORK_CATEGORIES.map((cat) => {
            const IconComponent = cat.icon;
            const isSelected = selectedCategory === cat.title;

            return (
              <button
                key={cat.title}
                type="button"
                onClick={() => {
                  if (isSelected) {
                    setSelectedCategory('ALL');
                  } else {
                    setSelectedCategory(cat.title);
                  }
                }}
                className={`group text-left p-4 sm:p-5 rounded-2xl bg-white border transition-all duration-200 flex flex-col justify-between h-[115px] sm:h-[130px] relative cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/30 ring-2 ring-emerald-500/20 shadow-sm'
                    : 'border-zinc-200/80 hover:border-emerald-500 hover:shadow-md hover:-translate-y-0.5'
                }`}
                title={`Filter by ${cat.title}`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-1.5 rounded-xl transition-all ${
                    isSelected 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'text-emerald-600 group-hover:scale-110'
                  }`}>
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
                  </div>
                  {isSelected && (
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                      Active
                    </span>
                  )}
                </div>

                <div className={`text-xs sm:text-[14px] font-semibold leading-snug transition-colors ${
                  isSelected ? 'text-emerald-950 font-bold' : 'text-zinc-900 group-hover:text-emerald-700'
                }`}>
                  {cat.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-[24px] border border-zinc-200/80 shadow-xs mb-6 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords, skills (e.g., Next.js, Gemini, Tally, CAD, Figma) or regional cluster..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>

          {/* Quick Clear or Active Status */}
          {selectedCategory !== 'ALL' && (
            <div className="flex items-center gap-2 shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <span>Filter: {selectedCategory}</span>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('ALL')}
                  className="hover:bg-emerald-200/60 rounded-full p-0.5 text-emerald-900 transition-colors"
                  title="Clear Category"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            </div>
          )}
        </div>

        {/* Industrial Cluster Chips */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-zinc-500 pt-1">
          <span className="font-semibold text-[11px] text-zinc-400">Featured Regional Hubs:</span>
          <button 
            type="button"
            onClick={() => setSearchQuery('Amritsar')} 
            className="px-2.5 py-1 rounded-lg bg-zinc-50 hover:bg-emerald-50 hover:text-emerald-700 border border-zinc-200/80 text-[11px] font-medium transition-colors"
          >
            Amritsar Agro & Textiles
          </button>
          <button 
            type="button"
            onClick={() => setSearchQuery('Mohali')} 
            className="px-2.5 py-1 rounded-lg bg-zinc-50 hover:bg-emerald-50 hover:text-emerald-700 border border-zinc-200/80 text-[11px] font-medium transition-colors"
          >
            Mohali IT & Silicon Belt
          </button>
          <button 
            type="button"
            onClick={() => setSearchQuery('Ludhiana')} 
            className="px-2.5 py-1 rounded-lg bg-zinc-50 hover:bg-emerald-50 hover:text-emerald-700 border border-zinc-200/80 text-[11px] font-medium transition-colors"
          >
            Ludhiana Auto & Engineering
          </button>
          <button 
            type="button"
            onClick={() => setSearchQuery('Jalandhar')} 
            className="px-2.5 py-1 rounded-lg bg-zinc-50 hover:bg-emerald-50 hover:text-emerald-700 border border-zinc-200/80 text-[11px] font-medium transition-colors"
          >
            Jalandhar Sports & Leather
          </button>
          <button 
            type="button"
            onClick={() => setSearchQuery('Bathinda')} 
            className="px-2.5 py-1 rounded-lg bg-zinc-50 hover:bg-emerald-50 hover:text-emerald-700 border border-zinc-200/80 text-[11px] font-medium transition-colors"
          >
            Bathinda Cotton & Thermal Hub
          </button>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-[11px] text-rose-600 hover:underline font-semibold ml-auto"
            >
              Clear Search
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-zinc-500 mb-3 px-1">
        <span>
          Showing <strong className="text-zinc-900 font-bold">{filteredGigs.length}</strong> contract opportunities
          {selectedCategory !== 'ALL' && <span> in <strong className="text-emerald-700">{selectedCategory}</strong></span>}
        </span>
      </div>

      {/* Gigs List */}
      {filteredGigs.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-zinc-200 text-center space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-zinc-800">No gigs found</h3>
          <p className="text-xs text-zinc-500 max-w-md mx-auto">
            No active contracts matched your selected category and search query. Try clearing your search query or selecting a different work category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('ALL');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredGigs.map((gig) => (
            <div
              key={gig.id}
              className="bento-card p-6 flex flex-col justify-between group bg-white border border-zinc-200/80 hover:border-emerald-300 hover:shadow-md transition-all rounded-3xl"
            >
              <div>
                {/* Header metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-zinc-400" />
                      {gig.clientCompany}
                    </span>
                    <span className="text-zinc-300">•</span>
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-zinc-400" />
                      {gig.clientLocation}
                    </span>
                    <span className="text-zinc-300 hidden sm:inline">•</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200/70">
                      {gig.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {gig.matchScore && (
                      <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-500" />
                        {gig.matchScore}% Match
                      </span>
                    )}

                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      ₹{gig.budget.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors">
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
                <div className="flex items-center gap-4 text-xs text-zinc-500 flex-wrap">
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
                    type="button"
                    onClick={() => {
                      setActiveGig(gig);
                      setActiveTab('workspace');
                    }}
                    className="px-3.5 py-1.5 rounded-xl border border-zinc-300 hover:bg-zinc-50 text-zinc-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                    <span>Workspace</span>
                  </button>

                  {role === 'client' ? (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveGig(gig);
                        setIsEscrowModalOpen(true);
                      }}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm group/btn hover:scale-[1.02] cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5 text-emerald-200" />
                      <span>Hire via Escrow</span>
                      <ArrowRight className="w-3 h-3 text-white/80 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openQuickBid(gig)}
                      className="px-4 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm group/btn hover:scale-[1.02] cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Quick Bid</span>
                      <ArrowRight className="w-3 h-3 text-zinc-400 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
