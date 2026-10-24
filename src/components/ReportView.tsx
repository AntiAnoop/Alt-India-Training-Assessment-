import React, { useState } from 'react';
import { UserTrainingRecord, FinalReportData } from '../types/index.ts';
import { CHAPTERS_DATA } from '../data/chaptersData.ts';
import { generateAssessmentReportPDF } from '../services/pdfService.ts';
import { saveFinalReport } from '../services/storageService.ts';
import { ArrowLeft, Download, CheckCircle2, AlertCircle, Printer, Award, FileText } from 'lucide-react';

interface ReportViewProps {
  user: UserTrainingRecord;
  onBackToDashboard: () => void;
  onUserUpdated: (user: UserTrainingRecord) => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  user,
  onBackToDashboard,
  onUserUpdated
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // If report has not been generated yet, but final assessment is completed, assemble report data
  let reportData: FinalReportData | null = user.report.data;

  if (!reportData && user.finalAssessment.latestScore !== null) {
    const latestAttempt = user.finalAssessment.attempts[user.finalAssessment.attempts.length - 1];
    const chapterResults = CHAPTERS_DATA.map((ch) => {
      const chProg = user.chapters[String(ch.id)];
      return {
        chapterId: ch.id,
        chapterNumber: ch.number,
        title: ch.title,
        bestScore: chProg?.assessment.bestScore ?? null,
        totalQuestions: ch.assessmentQuestionCount,
        passed: chProg?.assessment.passed ?? false,
        attempts: chProg?.assessment.attempts.length ?? 0
      };
    });

    reportData = {
      candidateName: user.name,
      userId: user.userId,
      generatedAt: new Date().toISOString(),
      finalScore: user.finalAssessment.latestScore,
      maximumScore: 100,
      percentage: Math.round((user.finalAssessment.latestScore / 100) * 100),
      status: user.finalAssessment.passed ? 'PASSED' : 'NEEDS RETAKE',
      sectionScores: {
        coreKnowledge: { score: latestAttempt?.sectionScores.coreKnowledge ?? 0, max: 40 },
        scenarioBased: { score: latestAttempt?.sectionScores.scenarioBased ?? 0, max: 30 },
        practical: { score: latestAttempt?.sectionScores.practical ?? 0, max: 30 }
      },
      chapterResults,
      finalAttempts: user.finalAssessment.attempts.length
    };

    // Save report persistently
    const updatedUser = saveFinalReport(reportData);
    if (updatedUser) {
      onUserUpdated(updatedUser);
    }
  }

  const handleDownloadPDF = () => {
    if (!reportData) return;
    generateAssessmentReportPDF(reportData);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!reportData) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <FileText className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">No Assessment Report Found</h2>
        <p className="text-sm text-slate-500">
          Complete the Final Assessment to generate and download your official performance report.
        </p>
        <button
          onClick={onBackToDashboard}
          className="py-2.5 px-5 bg-slate-900 text-white rounded-xl text-xs font-medium cursor-pointer"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const isPassed = reportData.status === 'PASSED';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top action bar (hidden in print) */}
      <div className="no-print flex items-center justify-between">
        <button
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="py-2 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            title="Print or Save as System PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF Report</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="no-print p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>PDF downloaded successfully. You can download this report again anytime.</span>
        </div>
      )}

      {/* Official Printable Report Container */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 shadow-sm space-y-8">
        {/* Header Block */}
        <div className="border-b border-slate-100 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <img
                src="/assets/aistudio/Alt_India_Logo_Badge_55f5ec60.png"
                alt="Alt India"
                className="h-9 w-auto object-contain mb-2.5"
              />
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Official Assessment Report
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
                ALT INDIA SALES COUNSELLING
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Counsellor Training & Verification Matrix
              </p>
            </div>

            <div className="sm:text-right">
              <div className="text-xs font-medium text-slate-900">
                {new Date(reportData.generatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                Session ID: {reportData.userId.slice(0, 8)}
              </div>
            </div>
          </div>
        </div>

        {/* Candidate & Result Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Candidate Name
            </div>
            <div className="text-base font-bold text-slate-900 mt-1">
              {reportData.candidateName}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Education Sales Counsellor
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Final Assessment Score
            </div>
            <div className="text-xl font-bold text-slate-900 mt-1">
              {reportData.finalScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Attempts: {reportData.finalAttempts} · Passing: 75/100
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Overall Status
            </div>
            <div className="text-base font-bold mt-1 flex items-center gap-1.5">
              {isPassed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">PASSED</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-700">NEEDS RETAKE</span>
                </>
              )}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {isPassed ? 'Certified Competency' : 'Retake Allowed'}
            </div>
          </div>
        </div>

        {/* Section Scores Breakdown */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Sectional Performance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-xl border border-slate-200/80 bg-white">
              <div className="text-slate-500 font-medium">Part A · Core Knowledge</div>
              <div className="text-lg font-bold text-slate-900 mt-1">
                {reportData.sectionScores.coreKnowledge.score} / {reportData.sectionScores.coreKnowledge.max}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">20 Questions · 2 Marks each</div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/80 bg-white">
              <div className="text-slate-500 font-medium">Part B · Scenario-Based</div>
              <div className="text-lg font-bold text-slate-900 mt-1">
                {reportData.sectionScores.scenarioBased.score} / {reportData.sectionScores.scenarioBased.max}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">5 Scenarios · 6 Marks each</div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/80 bg-white">
              <div className="text-slate-500 font-medium">Part C · Practical Tasks</div>
              <div className="text-lg font-bold text-slate-900 mt-1">
                {reportData.sectionScores.practical.score} / {reportData.sectionScores.practical.max}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">5 Tasks · 6 Marks each</div>
            </div>
          </div>
        </div>

        {/* 11 Chapters Summary Matrix */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Chapter Assessment Summary (11 Chapters)
          </h2>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                <tr>
                  <th className="py-2.5 px-4 font-semibold w-14">#</th>
                  <th className="py-2.5 px-4 font-semibold">Chapter Title</th>
                  <th className="py-2.5 px-4 font-semibold text-center w-24">Score</th>
                  <th className="py-2.5 px-4 font-semibold text-center w-28">Status</th>
                  <th className="py-2.5 px-4 font-semibold text-right w-24">Attempts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reportData.chapterResults.map((ch) => (
                  <tr key={ch.chapterId} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4 font-mono font-medium text-slate-400">
                      {ch.chapterNumber}
                    </td>
                    <td className="py-2.5 px-4 font-medium text-slate-800">
                      {ch.title}
                    </td>
                    <td className="py-2.5 px-4 text-center font-semibold text-slate-700">
                      {ch.bestScore !== null ? `${ch.bestScore}/${ch.totalQuestions}` : '—'}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      {ch.passed ? (
                        <span className="text-emerald-700 font-semibold">Passed</span>
                      ) : ch.bestScore !== null ? (
                        <span className="text-amber-700 font-medium">Retake</span>
                      ) : (
                        <span className="text-slate-400">Unattempted</span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-right text-slate-500">
                      {ch.attempts}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Verification note */}
        <div className="pt-6 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Official Alt India Sales Counselling Training Record</span>
          <span>Verified Local Persistent Storage</span>
        </div>
      </div>
    </div>
  );
};
