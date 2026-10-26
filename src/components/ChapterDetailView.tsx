import React, { useState } from 'react';
import { ChapterInfo, UserTrainingRecord } from '../types/index.ts';
import { ArrowLeft, CheckCircle2, AlertCircle, Award, Headphones } from 'lucide-react';
import { saveVideoPosition } from '../services/storageService.ts';
import { VideoPlayer } from './VideoPlayer.tsx';

interface ChapterDetailViewProps {
  chapter: ChapterInfo;
  user: UserTrainingRecord;
  onBack: () => void;
  onStartAssessment: (chapterId: number) => void;
}

export const ChapterDetailView: React.FC<ChapterDetailViewProps> = ({
  chapter,
  user,
  onBack,
  onStartAssessment
}) => {
  const chProgress = user.chapters[String(chapter.id)];
  const isRoleplay = chapter.type === 'roleplay';
  const assessment = chProgress?.assessment;
  const hasAttempted = assessment && assessment.attempts.length > 0;
  const isPassed = assessment?.passed;
  const bestScore = assessment?.bestScore;

  // Local video position tracker
  const [playbackSeconds, setPlaybackSeconds] = useState<number>(
    chProgress?.videoPosition || 0
  );

  const formatPlaybackTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top back navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <span className="text-xs font-mono font-semibold text-slate-400">
          Module {chapter.number} of 09
        </span>
      </div>

      {/* Chapter Title Header */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Chapter {chapter.number}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
          {chapter.title}
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          {chapter.subtitle}
        </p>
      </div>

      {/* Embedded Video Player Component */}
      <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-md border border-slate-800">
        <VideoPlayer
          videoUrl={chapter.videoUrl}
          title={chapter.title}
          playbackSeconds={playbackSeconds}
          formatPlaybackTime={formatPlaybackTime}
          onSimulateWatch={(seconds) => {
            const newPos = playbackSeconds + seconds;
            setPlaybackSeconds(newPos);
            saveVideoPosition(chapter.id, newPos);
          }}
        />

        {playbackSeconds > 0 && (
          <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
            <span className="text-slate-300">
              Last playback position: {formatPlaybackTime(playbackSeconds)}
            </span>
          </div>
        )}
      </div>

      {/* Description & Key Learning Points */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-sm font-bold tracking-tight text-slate-900 uppercase">
            Module Overview
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            {chapter.description}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Core Competencies & Key Takeaways
          </h3>
          <ul className="mt-3 space-y-2">
            {chapter.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Action Area: Roleplay Demonstration vs Theory Assessment Card */}
      {isRoleplay ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-amber-700" />
              <h3 className="text-base font-bold text-slate-900">
                {chapter.title}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {chapter.subtitle}
            </p>

            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-lg font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Audio Observation · No Assessment Required</span>
              </span>
            </div>
          </div>

          <div className="shrink-0">
            <span className="inline-block py-2.5 px-4 bg-amber-50 text-amber-800 rounded-xl text-xs font-semibold border border-amber-200/60">
              Roleplay Session
            </span>
          </div>
        </div>
      ) : (
        /* Theory Assessment Action Card */
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-slate-700" />
              <h3 className="text-base font-bold text-slate-900">
                Module {chapter.number} Assessment
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {chapter.assessmentQuestionCount} Multiple Choice Questions · Passing Score: 70% · Unlimited retakes
            </p>

            {/* Assessment status display */}
            <div className="mt-3">
              {!hasAttempted ? (
                <span className="text-xs text-slate-500">
                  Assessment Status: <strong className="font-medium text-slate-700">Not Attempted</strong>
                </span>
              ) : isPassed ? (
                <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Score: {bestScore}/{chapter.assessmentQuestionCount} — Passed (Attempts: {assessment?.attempts.length})</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 text-xs text-amber-700 font-semibold">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Score: {bestScore}/{chapter.assessmentQuestionCount} — Retake Recommended (Attempts: {assessment?.attempts.length})</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => onStartAssessment(chapter.id)}
            className="py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-medium transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>{hasAttempted ? 'Retake Assessment' : 'Take Assessment'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
