export type UserRole = 'freelancer' | 'client';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  psdmId?: string;
  gstin?: string;
  tradeOrIndustry?: string;
  createdAt: string;
}

export interface StoredAccount extends AuthUser {
  passwordHash?: string;
}


export interface PSDMCertification {
  certificateId: string;
  candidateName: string;
  courseName: string;
  nsqfLevel: number;
  batchYear: string;
  trainingCenter: string; // e.g., "Multi Skill Development Centre (MSDC) Ludhiana"
  sha256Proof: string;
  verifiedAt: string;
  badgeTitle: string;
  status: 'VERIFIED' | 'REVOKED' | 'PENDING';
}

export interface FreelancerProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  title: string;
  bio: string;
  location: string; // e.g., "Mohali / Chandigarh Capital Region"
  hourlyRate: number;
  jobSuccessScore: number;
  completedJobs: number;
  totalEarnings: number;
  psdmAccredited: boolean;
  psdmLevel: number;
  skills: string[];
  featuredProject: {
    title: string;
    description: string;
    metrics: string;
    clientReview: number;
    tags: string[];
    liveUrl?: string;
    githubUrl?: string;
  };
  certifications: PSDMCertification[];
}

export type EscrowStatus = 
  | 'INITIATED' 
  | 'ESCROW_LOCKED' 
  | 'WORK_SUBMITTED' 
  | 'DISBURSED_TO_FREELANCER' 
  | 'REVISION_REQUESTED';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'PENDING' | 'LOCKED' | 'IN_REVIEW' | 'COMPLETED' | 'REVISION';
  deliverables?: string[];
  submissionNote?: string;
  submissionFile?: string;
  submissionDate?: string;
  feedbackNote?: string;
  transactionHash?: string;
  upiRefNumber?: string;
}

export type GigCategory = 
  | 'AI Services'
  | 'Development & IT'
  | 'Design & Creative'
  | 'Sales & Marketing'
  | 'Writing & Translation'
  | 'Admin & Support'
  | 'Finance & Accounting'
  | 'Legal'
  | 'HR & Training'
  | 'Engineering & Architecture'
  | 'Web & AI'
  | 'IoT & Automation'
  | 'Mobile Apps'
  | 'Industrial Design'
  | 'Cloud & Data'
  | (string & {});

export interface GigProject {
  id: string;
  title: string;
  clientName: string;
  clientCompany: string;
  clientLocation: string; // e.g., "Ludhiana MSME Auto Cluster"
  budget: number;
  escrowLockedAmount: number;
  deadline: string;
  category: GigCategory;
  skillsRequired: string[];
  description: string;
  matchScore?: number; // Semantic AI match percentage e.g. 98
  matchRationale?: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
  milestones: Milestone[];
}

export interface KanbanTask {
  id: string;
  gigId: string;
  title: string;
  milestoneTitle: string;
  payoutAmount: number;
  column: 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assignee: string;
  githubUrl?: string;
  figmaUrl?: string;
  dueDate: string;
}

export interface ProposalBid {
  id: string;
  gigId: string;
  freelancerName: string;
  proposedBudget: number;
  estimatedTimeline: string;
  coverLetter: string;
  milestonesPlan: { title: string; amount: number; days: number }[];
  psdmBadgeVerified: boolean;
  submittedAt: string;
}
