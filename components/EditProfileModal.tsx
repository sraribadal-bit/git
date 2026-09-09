'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  User, 
  Upload, 
  Sparkles, 
  Check, 
  MapPin, 
  Briefcase, 
  IndianRupee, 
  Building2, 
  Mail, 
  FileText, 
  Plus, 
  Trash2,
  ShieldCheck,
  Camera
} from 'lucide-react';

const PRESET_AVATARS = [
  { label: 'Current / Female 1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
  { label: 'Professional Male 1', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { label: 'Tech Male 2', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
  { label: 'Professional Female 2', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
  { label: 'Tech Female 3', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
  { label: 'Minimal Developer', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80' },
];

export const EditProfileModal: React.FC = () => {
  const { 
    isProfileModalOpen, 
    setIsProfileModalOpen, 
    currentUser, 
    freelancer, 
    role, 
    updateProfile 
  } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  
  // Freelancer specific
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [hourlyRate, setHourlyRate] = useState<number>(1500);
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');

  // Client specific
  const [tradeOrIndustry, setTradeOrIndustry] = useState('');
  const [gstin, setGstin] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state whenever modal opens or user/freelancer changes
  useEffect(() => {
    if (isProfileModalOpen) {
      const initialName = (currentUser?.name && currentUser.name !== 'Gurpreet Singh')
        ? currentUser.name
        : (freelancer.name && freelancer.name !== 'Gurpreet Singh' ? freelancer.name : 'Badal Srari');
      const initialAvatar = currentUser?.avatar || freelancer.avatar || PRESET_AVATARS[0].url;
      const initialEmail = currentUser?.email || (role === 'freelancer' ? 'badalsrari@gmail.com' : 'client@techpunjab.in');
      
      setName(initialName);
      setAvatar(initialAvatar);
      setEmail(initialEmail);

      setTitle(freelancer.title || 'Full-Stack & Generative AI Builder');
      setLocation(freelancer.location || 'Mohali / Chandigarh Capital Region, PB');
      setHourlyRate(freelancer.hourlyRate || 1500);
      setBio(freelancer.bio || '');
      setSkills(freelancer.skills || ['Next.js', 'Python', 'Gemini API', 'FastAPI', 'PostgreSQL', 'TailwindCSS']);

      setTradeOrIndustry(currentUser?.tradeOrIndustry || 'Agri-Tech & Machinery Cluster');
      setGstin(currentUser?.gstin || '03AABCA1234F1Z8');
    }
  }, [isProfileModalOpen, currentUser, freelancer, role]);

  if (!isProfileModalOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name.trim() || currentUser?.name || 'badal',
      avatar: avatar || currentUser?.avatar,
      email: email.trim(),
      title: title.trim(),
      location: location.trim(),
      hourlyRate: Number(hourlyRate) || 1500,
      bio: bio.trim(),
      skills,
      tradeOrIndustry: tradeOrIndustry.trim(),
      gstin: gstin.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl sm:rounded-[32px] border border-zinc-200 shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-5 border-b border-zinc-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-20">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs shrink-0">
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h2 className="text-base sm:text-lg font-bold text-zinc-900">Edit Custom Profile</h2>
                <span className="text-[9px] sm:text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 px-1.5 sm:px-2 py-0.5 rounded-full border border-indigo-200">
                  {role === 'freelancer' ? 'PSDM Freelancer' : 'MSME Client'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5 line-clamp-1 sm:line-clamp-none">
                Customize your public display name, avatar, bio & credentials
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsProfileModalOpen(false)}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          
          {/* Section 1: Avatar Customization */}
          <div>
            <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider block mb-3">
              Profile Photo / Avatar
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              {/* Current Preview */}
              <div className="relative group">
                <div className="w-20 h-20 rounded-2xl p-0.5 bg-gradient-to-tr from-indigo-500 via-pink-500 to-emerald-400 shadow-md">
                  <img
                    src={avatar}
                    alt="Avatar preview"
                    className="w-full h-full object-cover rounded-[14px]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition-colors"
                  title="Upload image from device"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Preset selection & custom URL */}
              <div className="flex-1 w-full space-y-2">
                <span className="text-[11px] font-semibold text-zinc-500 block">
                  Choose from presets or upload from device:
                </span>
                
                <div className="flex flex-wrap items-center gap-2">
                  {PRESET_AVATARS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAvatar(preset.url)}
                      className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-all p-0.5 ${
                        avatar === preset.url
                          ? 'border-indigo-600 ring-2 ring-indigo-300 scale-105'
                          : 'border-zinc-200 hover:border-zinc-400 opacity-80 hover:opacity-100'
                      }`}
                      title={preset.label}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2.5 py-1.5 rounded-xl border border-dashed border-zinc-300 hover:border-indigo-400 hover:bg-indigo-50/50 text-zinc-600 hover:text-indigo-600 text-[11px] font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Upload</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: General Profile Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-1.5">
                Display Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Badal"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. badal@example.com"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Role Specific Fields */}
          {role === 'freelancer' ? (
            <div className="space-y-4 pt-2 border-t border-zinc-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  Freelancer & Trainee Credentials
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1.5">
                    Professional Headline / Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Full-Stack & Generative AI Builder"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Mohali / Chandigarh Capital Region, PB"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1.5">
                  Hourly Rate (₹ INR / hr)
                </label>
                <div className="relative max-w-xs">
                  <span className="absolute left-3.5 top-2.5 text-zinc-400 font-mono text-xs">₹</span>
                  <input
                    type="number"
                    min={300}
                    step={100}
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full text-xs pl-8 pr-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1.5">
                  Bio / Professional Summary
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Describe your technical expertise, PSDM training center, and focus areas..."
                  className="w-full text-xs p-3 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 leading-relaxed"
                />
              </div>

              {/* Skills Tag Management */}
              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1.5">
                  Verified Vocational Competencies / Skills
                </label>
                
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-indigo-400 hover:text-indigo-700 p-0.5 rounded-full"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 max-w-md">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    placeholder="Type skill & press Enter (e.g. Next.js, Docker)"
                    className="flex-1 text-xs px-3 py-2 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSkill()}
                    className="px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 pt-2 border-t border-zinc-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  MSME & Enterprise Details
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1.5">
                    Industry / Trade Cluster
                  </label>
                  <input
                    type="text"
                    value={tradeOrIndustry}
                    onChange={(e) => setTradeOrIndustry(e.target.value)}
                    placeholder="e.g. Agri-Tech & Machinery Cluster"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1.5">
                    GSTIN / Registration ID
                  </label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    placeholder="e.g. 03AABCA1234F1Z8"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Modal Actions */}
          <div className="pt-4 border-t border-zinc-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(false)}
              className="px-4 py-2.5 rounded-2xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
