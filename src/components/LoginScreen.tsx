import React, { useState, useEffect } from 'react';
import { ArrowRight, UserCheck } from 'lucide-react';
import { findUsersByName } from '../services/storageService.ts';
import { UserTrainingRecord } from '../types/index.ts';

interface LoginScreenProps {
  onStart: (name: string) => void;
  onContinueExisting: (userId: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onStart,
  onContinueExisting
}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [matchedUsers, setMatchedUsers] = useState<UserTrainingRecord[]>([]);

  // Check for existing records as the user types
  useEffect(() => {
    const trimmed = name.trim();
    if (trimmed.length >= 2) {
      const found = findUsersByName(trimmed);
      setMatchedUsers(found);
    } else {
      setMatchedUsers([]);
    }
  }, [name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter your full name to begin training.');
      return;
    }
    setError('');

    // If an existing record was found, let the user pick continue or start fresh
    if (matchedUsers.length > 0) {
      // Default to continuing the latest matching record
      onContinueExisting(matchedUsers[0].userId);
    } else {
      onStart(trimmed);
    }
  };

  const handleStartFresh = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter your full name to begin training.');
      return;
    }
    setError('');
    onStart(trimmed);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Apple-style minimalist card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-8 sm:p-10 text-center">
          {/* Alt India Logo Badge */}
          <div className="flex justify-center mb-6">
            <img
              src="/assets/aistudio/Alt_India_Logo_Badge_55f5ec60.png"
              alt="Alt India"
              className="h-16 sm:h-20 w-auto max-w-[280px] object-contain drop-shadow-sm"
            />
          </div>

          {/* Heading */}
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Alt India Sales Counselling Training
          </h1>
          <p className="mt-2 text-xs sm:text-sm font-medium text-slate-500 tracking-wide uppercase">
            Counsellor Training & Assessment
          </p>

          <p className="mt-6 text-sm text-slate-600">
            Enter your name to begin.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
            <div>
              <label htmlFor="fullName" className="sr-only">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Full Name"
                className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-xs text-rose-600 font-medium">
                  {error}
                </p>
              )}
            </div>

            {/* Existing user recovery prompt if matching name found */}
            {matchedUsers.length > 0 && (
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                <div className="flex items-center gap-1.5 font-medium text-slate-800">
                  <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Continue {matchedUsers[0].name}&apos;s saved training?</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Previous progress and assessment records found on this device.
                </p>
                <div className="pt-1 flex gap-2">
                  <button
                    type="button"
                    onClick={() => onContinueExisting(matchedUsers[0].userId)}
                    className="flex-1 py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={handleStartFresh}
                    className="py-1.5 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium rounded-lg text-xs transition-colors"
                  >
                    Start New
                  </button>
                </div>
              </div>
            )}

            {matchedUsers.length === 0 && (
              <button
                type="submit"
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl text-sm transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start Training</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
