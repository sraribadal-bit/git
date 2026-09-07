'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  X, 
  Search, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  Award, 
  QrCode, 
  Check, 
  FileCheck,
  Building,
  Hash
} from 'lucide-react';
import { PSDMCertification } from '@/types';

export const SkillLedgerModal: React.FC = () => {
  const { isLedgerModalOpen, setIsLedgerModalOpen, ledger, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState<PSDMCertification>(ledger[0]);
  const [copied, setCopied] = useState(false);

  if (!isLedgerModalOpen) return null;

  const filteredCerts = ledger.filter(
    (c) =>
      c.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.certificateId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.sha256Proof.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    showToast('📋 Certificate proof hash copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-[28px] border border-zinc-200/80 shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-200">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-zinc-900">Punjab Skill Development Mission (PSDM)</h2>
                <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                  Govt. of Punjab • On-Chain Ledger
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                Cryptographically validated NSQF-certified vocational competencies and candidate registry
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLedgerModalOpen(false)}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Search & Candidate List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidate, course or ID..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {filteredCerts.map((cert) => (
                <div
                  key={cert.certificateId}
                  onClick={() => setSelectedCert(cert)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    selectedCert.certificateId === cert.certificateId
                      ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-500/20 shadow-sm'
                      : 'bg-white border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">{cert.candidateName}</h4>
                      <p className="text-[11px] text-zinc-600 line-clamp-1">{cert.courseName}</p>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full shrink-0">
                      NSQF L{cert.nsqfLevel}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono mt-2 pt-2 border-t border-zinc-100">
                    <span>{cert.certificateId}</span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> VERIFIED
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Certificate Certificate Inspector & Proof */}
          <div className="lg:col-span-7">
            <div className="bento-card p-6 border-emerald-200 bg-gradient-to-b from-white to-emerald-50/20 relative">
              
              {/* Certificate Header Banner */}
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                    🏛️
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                      Govt. of Punjab • Technical Education & Industrial Training
                    </div>
                    <div className="text-base font-extrabold text-zinc-900">
                      State Skill Qualification Credential
                    </div>
                  </div>
                </div>

                <div className="w-12 h-12 bg-white p-1 rounded-xl border border-zinc-200 flex items-center justify-center shadow-sm">
                  <QrCode className="w-10 h-10 text-zinc-800" />
                </div>
              </div>

              {/* Certificate Core Details */}
              <div className="py-4 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-zinc-50 p-2.5 rounded-xl border border-zinc-100">
                    <div className="text-[10px] text-zinc-400 uppercase font-semibold">Trainee Candidate</div>
                    <div className="font-bold text-zinc-900 text-sm mt-0.5">{selectedCert.candidateName}</div>
                  </div>

                  <div className="bg-zinc-50 p-2.5 rounded-xl border border-zinc-100">
                    <div className="text-[10px] text-zinc-400 uppercase font-semibold">Certificate ID</div>
                    <div className="font-mono font-bold text-zinc-900 mt-0.5">{selectedCert.certificateId}</div>
                  </div>
                </div>

                <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                  <div className="text-[10px] text-zinc-400 uppercase font-semibold">Accredited Qualification</div>
                  <div className="font-bold text-zinc-900 text-sm mt-0.5">{selectedCert.courseName}</div>
                  <div className="text-xs text-zinc-600 mt-1 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{selectedCert.trainingCenter}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-zinc-50 p-2.5 rounded-xl border border-zinc-100">
                    <div className="text-[10px] text-zinc-400 uppercase font-semibold">NSQF Competency Level</div>
                    <div className="font-bold text-emerald-700 text-sm mt-0.5">Level {selectedCert.nsqfLevel} Certified</div>
                  </div>

                  <div className="bg-zinc-50 p-2.5 rounded-xl border border-zinc-100">
                    <div className="text-[10px] text-zinc-400 uppercase font-semibold">Timestamp Verified</div>
                    <div className="font-mono text-zinc-700 mt-0.5">{selectedCert.verifiedAt}</div>
                  </div>
                </div>
              </div>

              {/* Cryptographic SHA-256 Proof */}
              <div className="pt-4 border-t border-zinc-100">
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5 text-emerald-600" />
                    Cryptographic SHA-256 Merkle Ledger Hash
                  </span>
                  <span className="text-emerald-600 text-[11px] font-mono">Status: Immutable Record</span>
                </div>

                <div className="p-3 bg-zinc-900 text-zinc-200 rounded-xl font-mono text-[11px] flex items-center justify-between break-all">
                  <span>{selectedCert.sha256Proof}</span>
                  <button
                    onClick={() => handleCopy(selectedCert.sha256Proof)}
                    className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg ml-2 shrink-0 transition-colors"
                    title="Copy hash"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Verification Seal Footer */}
              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Punjab Skill Development Mission Verified</span>
                </div>
                <button
                  onClick={() => showToast(`📜 Downloading official certificate PDF for ${selectedCert.candidateName}...`)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Export Official PDF</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
