'use client';

import React, { createContext, useContext, useState } from 'react';
import { 
  UserRole, 
  FreelancerProfile, 
  GigProject, 
  Milestone, 
  KanbanTask, 
  EscrowStatus,
  ProposalBid,
  PSDMCertification
} from '@/types';
import { 
  INITIAL_FREELANCER, 
  INITIAL_GIGS, 
  INITIAL_KANBAN_TASKS, 
  PSDM_VERIFIED_LEDGER 
} from '@/data/mockData';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: 'dashboard' | 'explore' | 'workspace' | 'escrow' | 'ledger' | 'about';
  setActiveTab: (tab: 'dashboard' | 'explore' | 'workspace' | 'escrow' | 'ledger' | 'about') => void;
  
  freelancer: FreelancerProfile;
  gigs: GigProject[];
  activeGig: GigProject;
  setActiveGig: (gig: GigProject) => void;
  kanbanTasks: KanbanTask[];
  ledger: PSDMCertification[];

  // Escrow state & simulator
  escrowStatus: EscrowStatus;
  escrowAmount: number;
  activeMilestoneIndex: number;
  lockEscrowFunds: (amount?: number) => void;
  submitDeliverable: (note: string, fileName?: string) => void;
  approveAndDisburse: () => void;
  requestRevision: (feedback: string) => void;
  resetEscrowDemo: () => void;

  // Modals
  isEscrowModalOpen: boolean;
  setIsEscrowModalOpen: (open: boolean) => void;
  isScoperModalOpen: boolean;
  setIsScoperModalOpen: (open: boolean) => void;
  isQuickBidOpen: boolean;
  setIsQuickBidOpen: (open: boolean) => void;
  isLedgerModalOpen: boolean;
  setIsLedgerModalOpen: (open: boolean) => void;
  selectedGigForBid: GigProject | null;
  openQuickBid: (gig: GigProject) => void;

  // Kanban
  updateTaskColumn: (taskId: string, newColumn: KanbanTask['column']) => void;

  // Project Scoper
  addNewProject: (newGig: GigProject) => void;

  // Auth & Welcome & Profile
  isWelcomeModalOpen: boolean;
  setIsWelcomeModalOpen: (open: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  currentUser: {
    name: string;
    role: UserRole;
    avatar: string;
    email: string;
    psdmId?: string;
    gstin?: string;
    tradeOrIndustry?: string;
  } | null;
  loginUser: (role: UserRole, customName?: string, email?: string) => void;
  signUpUser: (role: UserRole, name: string, email: string, tradeOrIndustry?: string) => void;
  updateProfile: (data: {
    name: string;
    avatar?: string;
    email?: string;
    title?: string;
    location?: string;
    hourlyRate?: number;
    bio?: string;
    skills?: string[];
    tradeOrIndustry?: string;
    gstin?: string;
  }) => void;
  logoutUser: () => void;

  // Notification / Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const setCookie = (name: string, value: string, days = 7) => {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
};

const deleteCookie = (name: string) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('freelancer');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'explore' | 'workspace' | 'escrow' | 'ledger' | 'about'>('dashboard');

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    setCookie('user_role', newRole);
    if (typeof window !== 'undefined') {
      localStorage.setItem('techpunjab_role', newRole);
    }
    if (newRole === 'freelancer' && activeTab === 'ledger') {
      setActiveTab('dashboard');
    }
  };
  
  const [freelancer, setFreelancer] = useState<FreelancerProfile>(INITIAL_FREELANCER);
  const [gigs, setGigs] = useState<GigProject[]>(INITIAL_GIGS);
  const [activeGig, setActiveGig] = useState<GigProject>(INITIAL_GIGS[0]);
  const [kanbanTasks, setKanbanTasks] = useState<KanbanTask[]>(INITIAL_KANBAN_TASKS);
  const [ledger, setLedger] = useState<PSDMCertification[]>(PSDM_VERIFIED_LEDGER);

  // Escrow Simulator State
  const [escrowStatus, setEscrowStatus] = useState<EscrowStatus>('ESCROW_LOCKED');
  const [escrowAmount, setEscrowAmount] = useState<number>(10000);
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState<number>(1); // Milestone 2

  // Modals state
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEscrowModalOpen, setIsEscrowModalOpen] = useState(false);
  const [isScoperModalOpen, setIsScoperModalOpen] = useState(false);
  const [isQuickBidOpen, setIsQuickBidOpen] = useState(false);
  const [isLedgerModalOpen, setIsLedgerModalOpen] = useState(false);
  const [selectedGigForBid, setSelectedGigForBid] = useState<GigProject | null>(INITIAL_GIGS[0]);

  // Current User Auth State
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    role: UserRole;
    avatar: string;
    email: string;
    psdmId?: string;
    gstin?: string;
    tradeOrIndustry?: string;
  } | null>(null);

  // Initialize session from localStorage or cookies on mount
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const savedUserStr = localStorage.getItem('techpunjab_user');
      const savedRole = localStorage.getItem('techpunjab_role') as UserRole | null;
      if (savedUserStr) {
        const parsedUser = JSON.parse(savedUserStr);
        setCurrentUser(parsedUser);
        const resolvedRole = parsedUser.role || savedRole || 'freelancer';
        setRoleState(resolvedRole);
        setCookie('user_role', resolvedRole);
        setCookie('auth_token', 'tp_session_active');

        if (parsedUser.name && (resolvedRole === 'freelancer' || parsedUser.role === 'freelancer')) {
          setFreelancer((prev) => ({
            ...prev,
            name: parsedUser.name,
            avatar: parsedUser.avatar || prev.avatar,
            certifications: prev.certifications.map((c) => ({
              ...c,
              candidateName: parsedUser.name,
            })),
          }));
          setLedger((prev) =>
            prev.map((c, i) => (i < 2 ? { ...c, candidateName: parsedUser.name } : c))
          );
          setKanbanTasks((prev) =>
            prev.map((t) => ({ ...t, assignee: parsedUser.name }))
          );
        }

        // Also check if custom freelancer profile details were saved
        const savedFreelancerStr = localStorage.getItem('techpunjab_freelancer_profile');
        if (savedFreelancerStr) {
          try {
            const parsedFreelancer = JSON.parse(savedFreelancerStr);
            setFreelancer(parsedFreelancer);
          } catch (e) {
            console.error('Failed to parse saved freelancer profile', e);
          }
        }
      } else {
        // Fallback: check cookie
        const match = document.cookie.match(new RegExp('(^| )user_role=([^;]+)'));
        if (match && match[2]) {
          const cookieRole = decodeURIComponent(match[2]) as UserRole;
          setRoleState(cookieRole);
        }
      }
    } catch (e) {
      console.error('Failed to load saved session', e);
    }
  }, []);

  const loginUser = (newRole: UserRole, customName?: string, email?: string) => {
    setRole(newRole);
    let userData;
    if (newRole === 'freelancer') {
      const finalName = customName || INITIAL_FREELANCER.name;
      userData = {
        name: finalName,
        role: 'freelancer' as UserRole,
        avatar: INITIAL_FREELANCER.avatar,
        email: email || 'gurpreet.dev@psdm.in',
        psdmId: 'PB-PSDM-2024-AI-89421',
        tradeOrIndustry: 'Full Stack & Generative AI',
      };
      setFreelancer((prev) => ({
        ...prev,
        name: finalName,
        certifications: prev.certifications.map((c) => ({
          ...c,
          candidateName: finalName,
        })),
      }));
      setLedger((prev) =>
        prev.map((c, i) => (i < 2 ? { ...c, candidateName: finalName } : c))
      );
      setKanbanTasks((prev) =>
        prev.map((t) => ({ ...t, assignee: finalName }))
      );
    } else {
      userData = {
        name: customName || 'Harjit Chawla',
        role: 'client' as UserRole,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        email: email || 'harjit@amritsarafro.com',
        psdmId: 'PB-MSME-2024-9182',
        gstin: '03AABCA1234F1Z8',
        tradeOrIndustry: 'Agri-Tech & Machinery Cluster',
      };
    }

    setCurrentUser(userData);
    setCookie('user_role', newRole);
    setCookie('auth_token', `tp_token_${Date.now()}`);
    if (typeof window !== 'undefined') {
      localStorage.setItem('techpunjab_user', JSON.stringify(userData));
      localStorage.setItem('techpunjab_role', newRole);
    }

    setIsLoginModalOpen(false);
    showToast(`🎉 Logged in as ${userData.name} (${newRole === 'freelancer' ? 'Freelancer' : 'MSME / Client'})!`);
  };

  const signUpUser = (newRole: UserRole, name: string, email: string, tradeOrIndustry?: string) => {
    setRole(newRole);
    const newUserData = {
      name,
      role: newRole,
      avatar: newRole === 'freelancer' 
        ? INITIAL_FREELANCER.avatar 
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      email,
      psdmId: newRole === 'freelancer' ? `PB-PSDM-${Date.now().toString().slice(-5)}` : undefined,
      gstin: newRole === 'client' ? `03PB${Date.now().toString().slice(-7)}` : undefined,
      tradeOrIndustry: tradeOrIndustry || (newRole === 'freelancer' ? 'Software & AI' : 'Industrial Services'),
    };

    setCurrentUser(newUserData);
    if (newRole === 'freelancer') {
      setFreelancer((prev) => ({
        ...prev,
        name: name,
        certifications: prev.certifications.map((c) => ({
          ...c,
          candidateName: name,
        })),
      }));
      setLedger((prev) =>
        prev.map((c, i) => (i < 2 ? { ...c, candidateName: name } : c))
      );
      setKanbanTasks((prev) =>
        prev.map((t) => ({ ...t, assignee: name }))
      );
    }
    setCookie('user_role', newRole);
    setCookie('auth_token', `tp_token_${Date.now()}`);
    if (typeof window !== 'undefined') {
      localStorage.setItem('techpunjab_user', JSON.stringify(newUserData));
      localStorage.setItem('techpunjab_role', newRole);

      // Also append to registered accounts mock list
      try {
        const prevAccounts = JSON.parse(localStorage.getItem('techpunjab_accounts') || '[]');
        localStorage.setItem('techpunjab_accounts', JSON.stringify([...prevAccounts, newUserData]));
      } catch (err) {
        console.error(err);
      }
    }

    setIsLoginModalOpen(false);
    showToast(`🎉 Welcome to TechPunjab, ${name}! Account created as ${newRole === 'freelancer' ? 'Freelancer' : 'MSME / Client'}.`);
  };

  const updateProfile = (data: {
    name: string;
    avatar?: string;
    email?: string;
    title?: string;
    location?: string;
    hourlyRate?: number;
    bio?: string;
    skills?: string[];
    tradeOrIndustry?: string;
    gstin?: string;
  }) => {
    const trimmedName = data.name.trim();

    setCurrentUser((prev) => {
      if (!prev) return null;
      const updatedUser = {
        ...prev,
        name: trimmedName || prev.name,
        avatar: data.avatar || prev.avatar,
        email: data.email?.trim() || prev.email,
        tradeOrIndustry: data.tradeOrIndustry || prev.tradeOrIndustry,
        gstin: data.gstin || prev.gstin,
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('techpunjab_user', JSON.stringify(updatedUser));
      }
      return updatedUser;
    });

    if (role === 'freelancer' || currentUser?.role === 'freelancer') {
      setFreelancer((prev) => {
        const updatedFreelancer: FreelancerProfile = {
          ...prev,
          name: trimmedName || prev.name,
          avatar: data.avatar || prev.avatar,
          title: data.title?.trim() || prev.title,
          location: data.location?.trim() || prev.location,
          hourlyRate: data.hourlyRate !== undefined ? data.hourlyRate : prev.hourlyRate,
          bio: data.bio !== undefined ? data.bio : prev.bio,
          skills: data.skills && data.skills.length > 0 ? data.skills : prev.skills,
          certifications: prev.certifications.map((c) => ({
            ...c,
            candidateName: trimmedName || prev.name,
          })),
        };
        if (typeof window !== 'undefined') {
          localStorage.setItem('techpunjab_freelancer_profile', JSON.stringify(updatedFreelancer));
        }
        return updatedFreelancer;
      });

      if (trimmedName) {
        setLedger((prev) =>
          prev.map((c, i) => (i < 2 ? { ...c, candidateName: trimmedName } : c))
        );
        setKanbanTasks((prev) =>
          prev.map((t) => ({ ...t, assignee: trimmedName }))
        );
      }
    }

    setIsProfileModalOpen(false);
    showToast('✨ Profile updated successfully!');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setFreelancer(INITIAL_FREELANCER);
    setLedger(PSDM_VERIFIED_LEDGER);
    setKanbanTasks(INITIAL_KANBAN_TASKS);
    deleteCookie('user_role');
    deleteCookie('auth_token');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('techpunjab_user');
      localStorage.removeItem('techpunjab_role');
      localStorage.removeItem('techpunjab_freelancer_profile');
    }
    showToast('👋 You have been logged out.');
  };

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Step 1: Client locks funds in Escrow
  const lockEscrowFunds = (amount = 10000) => {
    setEscrowAmount(amount);
    setEscrowStatus('ESCROW_LOCKED');
    
    // update current gig milestone
    setGigs(prev => prev.map(g => {
      if (g.id === activeGig.id) {
        const updatedMs = [...g.milestones];
        if (updatedMs[activeMilestoneIndex]) {
          updatedMs[activeMilestoneIndex].status = 'LOCKED';
        }
        return { ...g, milestones: updatedMs, escrowLockedAmount: amount };
      }
      return g;
    }));

    showToast(`🔒 ₹${amount.toLocaleString('en-IN')} deposited & locked into Smart Escrow!`);
  };

  // Step 2: Freelancer submits deliverable
  const submitDeliverable = (note: string, fileName = 'build-v1.2-preview.zip') => {
    setEscrowStatus('WORK_SUBMITTED');
    setGigs(prev => prev.map(g => {
      if (g.id === activeGig.id) {
        const updatedMs = [...g.milestones];
        if (updatedMs[activeMilestoneIndex]) {
          updatedMs[activeMilestoneIndex].status = 'IN_REVIEW';
          updatedMs[activeMilestoneIndex].submissionNote = note;
          updatedMs[activeMilestoneIndex].submissionFile = fileName;
          updatedMs[activeMilestoneIndex].submissionDate = 'Just now';
        }
        return { ...g, milestones: updatedMs };
      }
      return g;
    }));

    // Update corresponding kanban task to IN_REVIEW
    setKanbanTasks(prev => prev.map(t => {
      if (t.milestoneTitle.includes('Milestone 2')) {
        return { ...t, column: 'IN_REVIEW' };
      }
      return t;
    }));

    showToast('🚀 Deliverable submitted! Client notified for milestone review.');
  };

  // Step 3: Client review & approve -> releases funds via UPI simulation
  const approveAndDisburse = () => {
    setEscrowStatus('DISBURSED_TO_FREELANCER');
    
    // Update freelancer earnings
    setFreelancer(prev => ({
      ...prev,
      totalEarnings: prev.totalEarnings + escrowAmount,
    }));

    // Update milestone in gig
    setGigs(prev => prev.map(g => {
      if (g.id === activeGig.id) {
        const updatedMs = [...g.milestones];
        if (updatedMs[activeMilestoneIndex]) {
          updatedMs[activeMilestoneIndex].status = 'COMPLETED';
          updatedMs[activeMilestoneIndex].upiRefNumber = `UPI/${Date.now().toString().slice(-10)}/SUCCESS`;
          updatedMs[activeMilestoneIndex].transactionHash = `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`;
        }
        return { 
          ...g, 
          milestones: updatedMs,
          escrowLockedAmount: Math.max(0, g.escrowLockedAmount - escrowAmount)
        };
      }
      return g;
    }));

    // Update kanban task
    setKanbanTasks(prev => prev.map(t => {
      if (t.milestoneTitle.includes('Milestone 2')) {
        return { ...t, column: 'COMPLETED' };
      }
      return t;
    }));

    showToast(`✅ Milestone Approved! ₹${escrowAmount.toLocaleString('en-IN')} disbursed to UPI VPA.`);
  };

  // Step 4: Dispute / Revision request
  const requestRevision = (feedback: string) => {
    setEscrowStatus('REVISION_REQUESTED');
    setGigs(prev => prev.map(g => {
      if (g.id === activeGig.id) {
        const updatedMs = [...g.milestones];
        if (updatedMs[activeMilestoneIndex]) {
          updatedMs[activeMilestoneIndex].status = 'REVISION';
          updatedMs[activeMilestoneIndex].feedbackNote = feedback;
        }
        return { ...g, milestones: updatedMs };
      }
      return g;
    }));

    // Update kanban task to IN_PROGRESS
    setKanbanTasks(prev => prev.map(t => {
      if (t.milestoneTitle.includes('Milestone 2')) {
        return { ...t, column: 'IN_PROGRESS' };
      }
      return t;
    }));

    showToast('⚠️ Revision requested. Escrow remains securely locked.');
  };

  const resetEscrowDemo = () => {
    setEscrowStatus('ESCROW_LOCKED');
    setEscrowAmount(10000);
    showToast('🔄 Escrow Simulator reset to default state.');
  };

  const openQuickBid = (gig: GigProject) => {
    setSelectedGigForBid(gig);
    setIsQuickBidOpen(true);
  };

  const updateTaskColumn = (taskId: string, newColumn: KanbanTask['column']) => {
    setKanbanTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, column: newColumn };
      }
      return t;
    }));
    showToast(`Sprint board updated to ${newColumn.replace('_', ' ')}`);
  };

  const addNewProject = (newGig: GigProject) => {
    setGigs(prev => [newGig, ...prev]);
    setActiveGig(newGig);
    showToast(`✨ Project "${newGig.title}" created with AI milestones!`);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeTab,
        setActiveTab,
        freelancer,
        gigs,
        activeGig,
        setActiveGig,
        kanbanTasks,
        ledger,
        escrowStatus,
        escrowAmount,
        activeMilestoneIndex,
        lockEscrowFunds,
        submitDeliverable,
        approveAndDisburse,
        requestRevision,
        resetEscrowDemo,
        isEscrowModalOpen,
        setIsEscrowModalOpen,
        isScoperModalOpen,
        setIsScoperModalOpen,
        isQuickBidOpen,
        setIsQuickBidOpen,
        isLedgerModalOpen,
        setIsLedgerModalOpen,
        selectedGigForBid,
        openQuickBid,
        updateTaskColumn,
        addNewProject,
        isWelcomeModalOpen,
        setIsWelcomeModalOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        currentUser,
        loginUser,
        signUpUser,
        updateProfile,
        logoutUser,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
