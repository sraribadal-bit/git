'use client';

import React from 'react';
import { User, Building2 } from 'lucide-react';
import { UserRole } from '@/types';

interface RoleSelectorProps {
  selectedRole: UserRole;
  onChange: (role: UserRole) => void;
  showDescription?: boolean;
  className?: string;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  selectedRole,
  onChange,
  showDescription = true,
  className = '',
}) => {
  return (
    <div className={`w-full flex flex-col items-center gap-2.5 ${className}`}>
      {/* Segmented Pill Selector (Matches user design reference) */}
      <div 
        role="radiogroup" 
        aria-label="Select User Role"
        className="inline-flex items-center w-full max-w-sm bg-zinc-100/95 p-1 rounded-full border border-zinc-200/90 shadow-inner"
      >
        <button
          type="button"
          role="radio"
          aria-checked={selectedRole === 'freelancer'}
          onClick={() => onChange('freelancer')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-full text-xs font-bold transition-all duration-200 select-none ${
            selectedRole === 'freelancer'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/60'
          }`}
        >
          <User className="w-4 h-4 shrink-0" />
          <span className="tracking-tight">Freelancer</span>
        </button>

        <button
          type="button"
          role="radio"
          aria-checked={selectedRole === 'client'}
          onClick={() => onChange('client')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-full text-xs font-bold transition-all duration-200 select-none ${
            selectedRole === 'client'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/60'
          }`}
        >
          <Building2 className="w-4 h-4 shrink-0" />
          <span className="tracking-tight">MSME / Client</span>
        </button>
      </div>

      {/* Role explanation badge */}
      {showDescription && (
        <div className="w-full text-center px-2 animate-in fade-in duration-200">
          {selectedRole === 'freelancer' ? (
            <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-indigo-700 bg-indigo-50/80 px-3 py-1 rounded-full border border-indigo-100">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
              <span><strong>PSDM Trainee Mode:</strong> Apply to verified gigs, track milestones & receive escrow payouts</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-800 bg-emerald-50/80 px-3 py-1 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span><strong>MSME Employer Mode:</strong> Post projects, lock milestone escrow & hire verified talent</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default RoleSelector;
