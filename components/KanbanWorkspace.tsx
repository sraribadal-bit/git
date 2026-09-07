'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  KanbanTask 
} from '@/types';
import { 
  Briefcase, 
  Github, 
  Figma, 
  Plus, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  IndianRupee, 
  Lock, 
  ExternalLink,
  ChevronRight,
  Filter,
  Sparkles
} from 'lucide-react';

const COLUMNS: { key: KanbanTask['column']; label: string; color: string; badgeBg: string }[] = [
  { key: 'TODO', label: 'To Do', color: 'border-zinc-300', badgeBg: 'bg-zinc-100 text-zinc-700' },
  { key: 'IN_PROGRESS', label: 'In Progress', color: 'border-indigo-400', badgeBg: 'bg-indigo-100 text-indigo-700' },
  { key: 'IN_REVIEW', label: 'In Review', color: 'border-pink-400', badgeBg: 'bg-pink-100 text-pink-700' },
  { key: 'COMPLETED', label: 'Completed', color: 'border-emerald-400', badgeBg: 'bg-emerald-100 text-emerald-700' },
];

export const KanbanWorkspace: React.FC = () => {
  const { 
    kanbanTasks, 
    updateTaskColumn, 
    activeGig, 
    setIsEscrowModalOpen, 
    showToast,
    role 
  } = useApp();

  const [filterMilestone, setFilterMilestone] = useState<string>('ALL');

  const filteredTasks = filterMilestone === 'ALL' 
    ? kanbanTasks 
    : kanbanTasks.filter(t => t.milestoneTitle.includes(filterMilestone));

  const totalBoardPayout = kanbanTasks.reduce((acc, curr) => acc + curr.payoutAmount, 0);
  const completedBoardPayout = kanbanTasks
    .filter(t => t.column === 'COMPLETED')
    .reduce((acc, curr) => acc + curr.payoutAmount, 0);

  const handleAdvanceTask = (task: KanbanTask) => {
    const sequence: KanbanTask['column'][] = ['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'COMPLETED'];
    const currentIndex = sequence.indexOf(task.column);
    if (currentIndex < sequence.length - 1) {
      const nextColumn = sequence[currentIndex + 1];
      updateTaskColumn(task.id, nextColumn);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Contract Workspace
            </span>
            <span className="text-zinc-400 text-xs">•</span>
            <span className="text-xs font-mono text-zinc-500">{activeGig.clientCompany}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mt-1">
            {activeGig.title}
          </h1>
        </div>

        {/* Financial Progress Pill */}
        <div className="flex items-center gap-3">
          <div className="glass-pill px-4 py-2 rounded-2xl flex items-center gap-3">
            <div>
              <div className="text-[10px] text-zinc-400 font-semibold uppercase">Escrow Disbursed</div>
              <div className="text-sm font-mono font-bold text-emerald-600">
                ₹{completedBoardPayout.toLocaleString('en-IN')} <span className="text-xs font-normal text-zinc-400">/ ₹{totalBoardPayout.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <button
              onClick={() => setIsEscrowModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Escrow Vault</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and stats row */}
      <div className="flex items-center justify-between gap-3 mb-6 bg-white p-3 rounded-2xl border border-zinc-200/80 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-zinc-500 flex items-center gap-1 pl-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          <button
            onClick={() => setFilterMilestone('ALL')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              filterMilestone === 'ALL'
                ? 'bg-zinc-900 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            All Milestones
          </button>
          <button
            onClick={() => setFilterMilestone('Milestone 1')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              filterMilestone === 'Milestone 1'
                ? 'bg-zinc-900 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            Milestone 1 (DB & APIs)
          </button>
          <button
            onClick={() => setFilterMilestone('Milestone 2')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              filterMilestone === 'Milestone 2'
                ? 'bg-zinc-900 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            Milestone 2 (AI Forecasting)
          </button>
          <button
            onClick={() => setFilterMilestone('Milestone 3')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              filterMilestone === 'Milestone 3'
                ? 'bg-zinc-900 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            Milestone 3 (Handover)
          </button>
        </div>

        <div className="hidden sm:block text-xs font-mono text-zinc-400">
          Showing {filteredTasks.length} active sprint cards
        </div>
      </div>

      {/* 4-Column Minimalist Sprint Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {COLUMNS.map((col) => {
          const tasksInCol = filteredTasks.filter((t) => t.column === col.key);
          const colTotal = tasksInCol.reduce((acc, t) => acc + t.payoutAmount, 0);

          return (
            <div 
              key={col.key}
              className="bg-zinc-100/70 p-4 rounded-[24px] border border-zinc-200/70 flex flex-col min-h-[500px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-200">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${col.badgeBg}`}>
                    {col.label}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">({tasksInCol.length})</span>
                </div>
                <span className="text-xs font-mono font-bold text-zinc-600">
                  ₹{colTotal.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Task Cards */}
              <div className="space-y-3 flex-1">
                {tasksInCol.map((task) => (
                  <div
                    key={task.id}
                    className="bento-card p-4 flex flex-col justify-between group cursor-default"
                  >
                    <div>
                      {/* Milestone tag */}
                      <div className="text-[10px] font-mono text-zinc-500 font-semibold truncate mb-1">
                        {task.milestoneTitle}
                      </div>

                      {/* Title */}
                      <h4 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors">
                        {task.title}
                      </h4>
                    </div>

                    {/* Deliverable payout badge & preview links */}
                    <div className="mt-3 pt-3 border-t border-zinc-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          ₹{task.payoutAmount.toLocaleString('en-IN')} on completion
                        </span>

                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          task.priority === 'HIGH' ? 'text-pink-600 bg-pink-50' : 'text-zinc-500 bg-zinc-100'
                        }`}>
                          {task.priority}
                        </span>
                      </div>

                      {/* Attached GitHub / Figma Links */}
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <div className="flex items-center gap-1.5">
                          {task.githubUrl && (
                            <button
                              onClick={() => showToast(`🔗 Opening GitHub PR: ${task.githubUrl}`)}
                              className="p-1 rounded-md text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 transition-colors"
                              title="GitHub PR"
                            >
                              <Github className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {task.figmaUrl && (
                            <button
                              onClick={() => showToast(`🎨 Opening Figma Canvas: ${task.figmaUrl}`)}
                              className="p-1 rounded-md text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 transition-colors"
                              title="Figma Specs"
                            >
                              <Figma className="w-3.5 h-3.5 text-pink-500" />
                            </button>
                          )}
                        </div>

                        {col.key !== 'COMPLETED' && (
                          <button
                            onClick={() => handleAdvanceTask(task)}
                            className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 hover:underline"
                            title="Advance to next sprint stage"
                          >
                            <span>Move Next</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}

                        {col.key === 'COMPLETED' && (
                          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {tasksInCol.length === 0 && (
                  <div className="h-28 rounded-2xl border border-dashed border-zinc-300 flex items-center justify-center text-xs text-zinc-400 font-medium">
                    No deliverables in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
