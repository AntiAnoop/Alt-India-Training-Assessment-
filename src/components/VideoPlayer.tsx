import React, { useState, useEffect } from 'react';
import { normalizeGoogleDriveUrl } from '../utils/googleDrive.ts';
import { Play, ExternalLink, AlertTriangle, VideoOff, Loader2 } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl?: string;
  title: string;
  duration?: string;
  onSimulateWatch?: (seconds: number) => void;
  playbackSeconds?: number;
  formatPlaybackTime?: (seconds: number) => string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  onSimulateWatch,
  playbackSeconds = 0,
  formatPlaybackTime
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  // Normalize the video URL through our Google Drive helper
  const normalized = normalizeGoogleDriveUrl(videoUrl);

  // Reset loading and error states whenever the URL changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [normalized.embedUrl]);

  const defaultFormatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const displayTime = formatPlaybackTime || defaultFormatTime;

  // Case 1: Missing URL
  if (normalized.status === 'missing') {
    return (
      <div className="relative aspect-video w-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-3">
          <VideoOff className="w-5 h-5 text-slate-400" />
        </div>
        <h4 className="text-sm font-semibold text-slate-200">Video Not Configured</h4>
        <p className="text-xs text-slate-400 max-w-sm mt-1">
          No video link has been provided for this chapter yet. You can paste a Google Drive sharing URL into <code>src/data/chaptersData.ts</code>.
        </p>
      </div>
    );
  }

  // Case 2: Placeholder URL (pending real Drive link)
  if (normalized.status === 'placeholder') {
    return (
      <div className="relative aspect-video w-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/15 transition-all flex items-center justify-center mb-3 shadow-lg cursor-pointer">
          <Play className="w-6 h-6 text-white ml-0.5" />
        </div>
        <h4 className="text-sm font-semibold text-white tracking-wide">
          Training Video · {title}
        </h4>
        <p className="text-xs text-slate-400 max-w-md mt-1">
          Video pending upload. Paste your Google Drive link into <code>src/data/chaptersData.ts</code> to activate this module.
        </p>
        {onSimulateWatch && (
          <div className="pt-3 flex items-center justify-center gap-3 text-[11px] text-slate-400">
            <span>Position: {displayTime(playbackSeconds)}</span>
            <span>·</span>
            <button
              type="button"
              onClick={() => onSimulateWatch(30)}
              className="text-blue-400 hover:text-blue-300 underline cursor-pointer"
            >
              Simulate +30s Watch
            </button>
          </div>
        )}
      </div>
    );
  }

  // Case 3: Invalid URL (not a valid Google Drive URL or ID extraction failed)
  if (normalized.status === 'invalid' || !normalized.embedUrl) {
    return (
      <div className="relative aspect-video w-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3">
          <AlertTriangle className="w-6 h-6 text-amber-400" />
        </div>
        <h4 className="text-sm font-semibold text-slate-200">Unable to Embed Video</h4>
        <p className="text-xs text-slate-400 max-w-sm mt-1">
          {normalized.errorMessage || 'The provided URL could not be recognized as a valid Google Drive file.'}
        </p>
        {normalized.originalUrl && (
          <a
            href={normalized.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Original Link</span>
          </a>
        )}
      </div>
    );
  }

  // Case 4: Valid Google Drive preview URL with responsive 16:9 iframe, loading state, error fallback & fullscreen
  return (
    <div className="relative aspect-video w-full bg-slate-950 overflow-hidden group">
      {/* Loading Skeleton / Spinner */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center text-slate-400 z-10 transition-opacity">
          <Loader2 className="w-7 h-7 animate-spin text-slate-400 mb-2" />
          <span className="text-xs font-medium text-slate-400 tracking-wide">
            Loading video stream...
          </span>
        </div>
      )}

      {/* Embedding Failure Fallback */}
      {hasError ? (
        <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white z-20">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-3">
            <AlertTriangle className="w-6 h-6 text-rose-400" />
          </div>
          <h4 className="text-sm font-semibold text-slate-200">Video Playback Blocked by Browser</h4>
          <p className="text-xs text-slate-400 max-w-sm mt-1">
            Google Drive access may require third-party cookies or permissions in this browser.
          </p>
          <a
            href={normalized.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-white text-slate-900 hover:bg-slate-100 transition-colors shadow-sm cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Video in Google Drive</span>
          </a>
        </div>
      ) : (
        /* The Responsive 16:9 Iframe */
        <iframe
          src={normalized.embedUrl}
          className="w-full h-full border-0 absolute inset-0"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          title={title}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}

      {/* Persistent "Open in Google Drive" external link in top right corner on hover */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 pointer-events-auto">
        <a
          href={normalized.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium bg-black/75 hover:bg-black/90 text-white backdrop-blur-md border border-white/10 shadow-sm transition-all cursor-pointer"
          title="Open in Google Drive"
        >
          <ExternalLink className="w-3 h-3 text-slate-300" />
          <span>Open in Drive</span>
        </a>
      </div>
    </div>
  );
};
