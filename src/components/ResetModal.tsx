import React, { useState } from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import { clearAllTrainingData } from '../services/storageService.ts';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetComplete: () => void;
}

export const ResetModal: React.FC<ResetModalProps> = ({
  isOpen,
  onClose,
  onResetComplete
}) => {
  const [confirmText, setConfirmText] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (confirmText.toLowerCase() === 'reset') {
      clearAllTrainingData();
      onResetComplete();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-600 font-semibold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Reset Local Training Data</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          This developer/testing function will permanently delete all locally saved training records, chapter scores, and reports on this device.
        </p>

        <div className="space-y-1">
          <label className="text-[11px] font-medium text-slate-500">
            Type <strong className="text-slate-900">reset</strong> to confirm:
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="reset"
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-500"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={confirmText.toLowerCase() !== 'reset'}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Local Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
