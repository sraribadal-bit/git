'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Lock, 
  CheckCircle2, 
  Upload, 
  Send, 
  ShieldCheck, 
  AlertTriangle, 
  RefreshCw, 
  QrCode, 
  ArrowRight, 
  FileText, 
  Sparkles, 
  X,
  CreditCard,
  Building,
  Check,
  Download,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const EscrowSimulator: React.FC = () => {
  const {
    isEscrowModalOpen,
    setIsEscrowModalOpen,
    escrowStatus,
    escrowAmount,
    lockEscrowFunds,
    submitDeliverable,
    approveAndDisburse,
    requestRevision,
    resetEscrowDemo,
    role,
    activeGig,
  } = useApp();

  const [depositAmount, setDepositAmount] = useState<number>(15000);
  const [submissionNote, setSubmissionNote] = useState<string>(
    'Implemented the Gemini AI real-time predictive stock model, FastAPI telemetry streaming endpoint, and dynamic warehouse alerting widget. Ready for milestone audit.'
  );
  const [selectedFile, setSelectedFile] = useState<string>('inventory-v1.2-deliverables.zip');
  const [revisionFeedback, setRevisionFeedback] = useState<string>(
    'Please add telemetry retry backoff for remote warehouse sensors before final sign-off.'
  );
  const [showUpiQr, setShowUpiQr] = useState<boolean>(false);
  const [isProcessingDisbursement, setIsProcessingDisbursement] = useState<boolean>(false);

  if (!isEscrowModalOpen) return null;

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#6366F1', '#EC4899', '#10B981', '#F59E0B']
      });
    } catch (e) {
      // ignore
    }
  };

  const handleApprove = () => {
    setIsProcessingDisbursement(true);
    setTimeout(() => {
      approveAndDisburse();
      setIsProcessingDisbursement(false);
      triggerCelebration();
    }, 1200);
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
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-zinc-900">Native UPI Milestone Escrow Simulator</h2>
                <span className="text-[10px] font-mono uppercase font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                  TechPunjab Escrow Protocol
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                Simulated 4-step secure contract lifecycle between Punjab MSME and Certified Trainee
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetEscrowDemo}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
              title="Reset Simulator"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsEscrowModalOpen(false)}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 4-Step Lifecycle Progress Tracker */}
        <div className="px-6 py-4 bg-zinc-50/80 border-b border-zinc-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            
            {/* Step 1 */}
            <div className={`p-3 rounded-2xl border transition-all ${
              escrowStatus === 'ESCROW_LOCKED' 
                ? 'bg-indigo-50/80 border-indigo-300 ring-2 ring-indigo-500/20' 
                : escrowStatus === 'WORK_SUBMITTED' || escrowStatus === 'DISBURSED_TO_FREELANCER'
                ? 'bg-white border-zinc-200 opacity-80'
                : 'bg-white border-zinc-200'
            }`}>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-indigo-700">1. Client Locks</span>
                {escrowStatus !== 'INITIATED' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-zinc-300"></span>
                )}
              </div>
              <div className="text-[11px] text-zinc-600 font-medium">₹15,000 via UPI</div>
              <div className="text-[10px] text-zinc-400 font-mono mt-0.5">ESCROW_LOCKED</div>
            </div>

            {/* Step 2 */}
            <div className={`p-3 rounded-2xl border transition-all ${
              escrowStatus === 'WORK_SUBMITTED' 
                ? 'bg-indigo-50/80 border-indigo-300 ring-2 ring-indigo-500/20' 
                : escrowStatus === 'DISBURSED_TO_FREELANCER'
                ? 'bg-white border-zinc-200 opacity-80'
                : 'bg-white border-zinc-200'
            }`}>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-zinc-800">2. Trainee Submits</span>
                {escrowStatus === 'WORK_SUBMITTED' || escrowStatus === 'DISBURSED_TO_FREELANCER' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-zinc-300"></span>
                )}
              </div>
              <div className="text-[11px] text-zinc-600 font-medium">Deliverable Files</div>
              <div className="text-[10px] text-zinc-400 font-mono mt-0.5">WORK_SUBMITTED</div>
            </div>

            {/* Step 3 */}
            <div className={`p-3 rounded-2xl border transition-all ${
              escrowStatus === 'DISBURSED_TO_FREELANCER' 
                ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20' 
                : 'bg-white border-zinc-200'
            }`}>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-zinc-800">3. Release Funds</span>
                {escrowStatus === 'DISBURSED_TO_FREELANCER' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-zinc-300"></span>
                )}
              </div>
              <div className="text-[11px] text-zinc-600 font-medium">Instant UPI Transfer</div>
              <div className="text-[10px] text-emerald-700 font-mono mt-0.5">DISBURSED</div>
            </div>

            {/* Step 4 */}
            <div className={`p-3 rounded-2xl border transition-all ${
              escrowStatus === 'REVISION_REQUESTED' 
                ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-500/20' 
                : 'bg-white border-zinc-200'
            }`}>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-zinc-800">4. Safe Fallback</span>
                {escrowStatus === 'REVISION_REQUESTED' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-zinc-300"></span>
                )}
              </div>
              <div className="text-[11px] text-zinc-600 font-medium">Revision / Dispute</div>
              <div className="text-[10px] text-amber-700 font-mono mt-0.5">VAULT_PROTECTED</div>
            </div>

          </div>
        </div>

        {/* Modal Body: Active Lifecycle Actions */}
        <div className="p-6 space-y-6">

          {/* Current Status Alert Banner */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
            escrowStatus === 'DISBURSED_TO_FREELANCER'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : escrowStatus === 'WORK_SUBMITTED'
              ? 'bg-indigo-50 border-indigo-200 text-indigo-900'
              : escrowStatus === 'REVISION_REQUESTED'
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-zinc-100 border-zinc-200 text-zinc-900'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/80 flex items-center justify-center font-bold text-sm shadow-sm">
                {escrowStatus === 'DISBURSED_TO_FREELANCER' ? '💸' : escrowStatus === 'WORK_SUBMITTED' ? '📦' : '🔒'}
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider font-bold">
                  Status: {escrowStatus}
                </div>
                <div className="text-sm font-semibold mt-0.5">
                  {escrowStatus === 'ESCROW_LOCKED' && 'Funds are securely locked in Smart Escrow. Waiting for trainee deliverable submission.'}
                  {escrowStatus === 'WORK_SUBMITTED' && 'Deliverable submitted! Ready for client review and UPI release.'}
                  {escrowStatus === 'DISBURSED_TO_FREELANCER' && 'Payment successfully disbursed to Freelancer UPI ID: gurpreet@okhdfcbank!'}
                  {escrowStatus === 'REVISION_REQUESTED' && 'Revision requested. Funds remain securely held in smart escrow contract.'}
                </div>
              </div>
            </div>

            <div className="text-right hidden sm:block">
              <div className="text-xs font-medium text-zinc-500">Escrow Value</div>
              <div className="text-lg font-mono font-bold">₹{depositAmount.toLocaleString('en-IN')}</div>
            </div>
          </div>

          {/* Interactive Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* ACTION 1: CLIENT LOCKS FUNDS */}
            <div className="bento-card p-5 border border-zinc-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5" />
                    Step 1: Client Fund Lock
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">Client View</span>
                </div>
                <h3 className="text-sm font-bold text-zinc-900 mb-1">
                  Deposit Milestone Funds into Vault
                </h3>
                <p className="text-xs text-zinc-500 mb-4">
                  Simulate client pre-funding milestone via simulated UPI / NetBanking.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-zinc-700 block mb-1">
                      Milestone Escrow Amount (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-zinc-500 font-mono text-sm">₹</span>
                      <input 
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-2 text-sm font-mono font-bold rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowUpiQr(!showUpiQr)}
                      className="px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-700 hover:bg-zinc-50 flex items-center gap-1.5"
                    >
                      <QrCode className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{showUpiQr ? 'Hide UPI QR' : 'Show UPI QR'}</span>
                    </button>
                    <span className="text-[11px] text-zinc-400 font-mono">VPA: psdm.escrow@icici</span>
                  </div>

                  {showUpiQr && (
                    <div className="p-3 bg-zinc-50 rounded-xl border border-dashed border-zinc-300 flex items-center justify-center gap-4 text-center">
                      <div className="w-24 h-24 bg-white p-2 rounded-lg border flex items-center justify-center shadow-sm">
                        <QrCode className="w-20 h-20 text-zinc-800" />
                      </div>
                      <div className="text-left text-xs">
                        <div className="font-bold text-zinc-800">Scan via Any UPI App</div>
                        <div className="text-zinc-500 text-[11px]">GPay, PhonePe, Paytm, BHIM</div>
                        <div className="text-indigo-600 font-mono font-semibold mt-1">₹{depositAmount.toLocaleString('en-IN')}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-100">
                <button
                  onClick={() => lockEscrowFunds(depositAmount)}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Lock ₹{depositAmount.toLocaleString('en-IN')} in Escrow</span>
                </button>
              </div>
            </div>

            {/* ACTION 2: FREELANCER SUBMITS WORK */}
            <div className="bento-card p-5 border border-zinc-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-pink-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    Step 2: Trainee Work Submission
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">Freelancer View</span>
                </div>
                <h3 className="text-sm font-bold text-zinc-900 mb-1">
                  Submit Deliverable for Review
                </h3>
                <p className="text-xs text-zinc-500 mb-4">
                  Freelancer submits source files, Docker images, or PR links to trigger client sign-off.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-zinc-700 block mb-1">
                      Deliverable File / Pull Request
                    </label>
                    <div className="p-2.5 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-indigo-500" />
                        <span className="text-xs font-mono text-zinc-700 truncate max-w-[180px]">
                          {selectedFile}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono">14.8 MB</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-zinc-700 block mb-1">
                      Submission Notes
                    </label>
                    <textarea
                      rows={2}
                      value={submissionNote}
                      onChange={(e) => setSubmissionNote(e.target.value)}
                      className="w-full p-2 text-xs rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-100">
                <button
                  onClick={() => submitDeliverable(submissionNote, selectedFile)}
                  className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5 text-pink-400" />
                  <span>Submit Deliverable to Client</span>
                </button>
              </div>
            </div>

            {/* ACTION 3: CLIENT REVIEW & UPI RELEASE */}
            <div className="bento-card p-5 border border-zinc-200 flex flex-col justify-between md:col-span-2 bg-gradient-to-r from-white via-emerald-50/20 to-white">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    Step 3 & 4: Review, UPI Disbursement & Revision Control
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">Client Approval Gate</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                  <div className="p-3 rounded-2xl bg-white border border-zinc-200">
                    <div className="text-xs font-bold text-zinc-800 mb-1">Active Deliverable on Table:</div>
                    <div className="text-xs text-zinc-600 bg-zinc-50 p-2 rounded-xl font-mono">
                      📦 {activeGig.milestones[1]?.title || 'Milestone 2: Real-Time Telemetry'}
                    </div>
                    <div className="mt-2 text-[11px] text-zinc-500">
                      Destination UPI: <span className="font-mono font-semibold text-zinc-800">gurpreet@okhdfcbank</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-zinc-200">
                    <div className="text-xs font-bold text-zinc-800 mb-1">Dispute & Revision Checkpoint:</div>
                    <input
                      type="text"
                      value={revisionFeedback}
                      onChange={(e) => setRevisionFeedback(e.target.value)}
                      placeholder="Feedback if revision is needed..."
                      className="w-full p-2 text-xs rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <p className="text-[10px] text-zinc-400 mt-1">
                      Requesting revision prevents unauthorized release and safeguards MSME capital.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => requestRevision(revisionFeedback)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-amber-300 text-amber-800 hover:bg-amber-50 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Request Revision (Fallback)</span>
                </button>

                <button
                  disabled={isProcessingDisbursement}
                  onClick={handleApprove}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isProcessingDisbursement ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Simulating UPI Disbursement...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve & Disburse ₹{depositAmount.toLocaleString('en-IN')} via UPI</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
