/**
 * Google Drive Video URL Normalization Helper
 * 
 * Extracts Google Drive file IDs and constructs standard embed/preview URLs.
 * Never fetches or downloads any external files.
 */

export interface GoogleDriveVideoResult {
  fileId: string | null;
  embedUrl: string | null;
  originalUrl: string;
  status: 'valid' | 'placeholder' | 'missing' | 'invalid';
  errorMessage?: string;
}

/**
 * Extracts a Google Drive file ID from a wide variety of URL formats:
 * - https://drive.google.com/file/d/{id}/view?usp=drive_link
 * - https://drive.google.com/file/d/{id}/view
 * - https://drive.google.com/file/d/{id}/preview
 * - https://drive.google.com/file/d/{id}/edit
 * - https://drive.google.com/open?id={id}
 * - https://drive.google.com/uc?id={id}
 * - https://drive.google.com/uc?export=view&id={id}
 * - Bare Drive file IDs
 */
export function extractGoogleDriveFileId(rawUrl?: string | null): string | null {
  if (!rawUrl || typeof rawUrl !== 'string') return null;
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  // Placeholder check
  if (trimmed.includes('REPLACE_WITH_DRIVE_URL') || trimmed.startsWith('TEST_VIDEO_')) {
    return null;
  }

  try {
    // Pattern 1: /file/d/{fileId}
    const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/i);
    if (fileDMatch && fileDMatch[1]) {
      return fileDMatch[1];
    }

    // Pattern 2: id={fileId} parameter in query string
    const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/i);
    if (idParamMatch && idParamMatch[1]) {
      return idParamMatch[1];
    }

    // Pattern 3: Bare file ID (Drive file IDs are alphanumeric/dashes/underscores, typically 25-50 chars)
    if (/^[a-zA-Z0-9_-]{20,60}$/.test(trimmed) && !trimmed.includes('/')) {
      return trimmed;
    }
  } catch {
    return null;
  }

  return null;
}

/**
 * Normalizes any Google Drive file URL into an embeddable preview iframe URL:
 * https://drive.google.com/file/d/{fileId}/preview
 * 
 * If the URL is already a /preview link, the file ID is preserved.
 * Safe against crashes: returns structured error/placeholder status if URL is invalid or missing.
 */
export function normalizeGoogleDriveUrl(rawUrl?: string | null): GoogleDriveVideoResult {
  const originalUrl = typeof rawUrl === 'string' ? rawUrl.trim() : '';

  if (!originalUrl) {
    return {
      fileId: null,
      embedUrl: null,
      originalUrl: '',
      status: 'missing',
      errorMessage: 'No video URL has been provided for this chapter.'
    };
  }

  if (originalUrl.includes('REPLACE_WITH_DRIVE_URL') || originalUrl.startsWith('TEST_VIDEO_')) {
    return {
      fileId: null,
      embedUrl: null,
      originalUrl,
      status: 'placeholder',
      errorMessage: 'This training video is pending upload. Paste a Google Drive sharing link in chaptersData.ts to activate.'
    };
  }

  const fileId = extractGoogleDriveFileId(originalUrl);

  if (!fileId) {
    return {
      fileId: null,
      embedUrl: null,
      originalUrl,
      status: 'invalid',
      errorMessage: 'Could not extract a valid Google Drive file ID from the provided link.'
    };
  }

  const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;

  return {
    fileId,
    embedUrl,
    originalUrl,
    status: 'valid'
  };
}
