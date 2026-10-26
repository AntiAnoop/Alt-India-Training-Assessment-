import test from 'node:test';
import assert from 'node:assert/strict';
import { extractGoogleDriveFileId, normalizeGoogleDriveUrl } from './googleDrive.ts';

test('extractGoogleDriveFileId extracts ID from standard sharing URL with /view?usp=drive_link', () => {
  const url = 'https://drive.google.com/file/d/1RSjfEVPjYmtb7NPMKRHC7txL5VCG9vFu/view?usp=drive_link';
  const id = extractGoogleDriveFileId(url);
  assert.equal(id, '1RSjfEVPjYmtb7NPMKRHC7txL5VCG9vFu');
});

test('extractGoogleDriveFileId extracts ID from preview URL', () => {
  const url = 'https://drive.google.com/file/d/1HfxiEsc113pu2N6mu_Py2zEfbB2a5N2s/preview';
  const id = extractGoogleDriveFileId(url);
  assert.equal(id, '1HfxiEsc113pu2N6mu_Py2zEfbB2a5N2s');
});

test('extractGoogleDriveFileId extracts ID from open?id= URL', () => {
  const url = 'https://drive.google.com/open?id=1HfxiEsc113pu2N6mu_Py2zEfbB2a5N2s';
  const id = extractGoogleDriveFileId(url);
  assert.equal(id, '1HfxiEsc113pu2N6mu_Py2zEfbB2a5N2s');
});

test('extractGoogleDriveFileId returns null for placeholder URLs', () => {
  const url = 'https://drive.google.com/file/d/REPLACE_WITH_DRIVE_URL_CH01/preview';
  assert.equal(extractGoogleDriveFileId(url), null);
});

test('normalizeGoogleDriveUrl converts sharing link into /preview embed URL', () => {
  const sharingUrl = 'https://drive.google.com/file/d/1RSjfEVPjYmtb7NPMKRHC7txL5VCG9vFu/view?usp=drive_link';
  const result = normalizeGoogleDriveUrl(sharingUrl);

  assert.equal(result.status, 'valid');
  assert.equal(result.fileId, '1RSjfEVPjYmtb7NPMKRHC7txL5VCG9vFu');
  assert.equal(result.embedUrl, 'https://drive.google.com/file/d/1RSjfEVPjYmtb7NPMKRHC7txL5VCG9vFu/preview');
  assert.equal(result.originalUrl, sharingUrl);
});

test('normalizeGoogleDriveUrl preserves preview URL if already formatted', () => {
  const previewUrl = 'https://drive.google.com/file/d/1HfxiEsc113pu2N6mu_Py2zEfbB2a5N2s/preview';
  const result = normalizeGoogleDriveUrl(previewUrl);

  assert.equal(result.status, 'valid');
  assert.equal(result.fileId, '1HfxiEsc113pu2N6mu_Py2zEfbB2a5N2s');
  assert.equal(result.embedUrl, 'https://drive.google.com/file/d/1HfxiEsc113pu2N6mu_Py2zEfbB2a5N2s/preview');
});

test('normalizeGoogleDriveUrl handles missing and empty URLs gracefully', () => {
  const emptyResult = normalizeGoogleDriveUrl('');
  assert.equal(emptyResult.status, 'missing');
  assert.equal(emptyResult.embedUrl, null);

  const nullResult = normalizeGoogleDriveUrl(null as unknown as string);
  assert.equal(nullResult.status, 'missing');
});

test('normalizeGoogleDriveUrl identifies placeholders without crashing', () => {
  const placeholderUrl = 'https://drive.google.com/file/d/REPLACE_WITH_DRIVE_URL_CH03/preview';
  const result = normalizeGoogleDriveUrl(placeholderUrl);
  assert.equal(result.status, 'placeholder');
  assert.equal(result.embedUrl, null);
});

test('normalizeGoogleDriveUrl flags invalid URLs gracefully', () => {
  const invalidUrl = 'https://example.com/not-a-google-drive-link';
  const result = normalizeGoogleDriveUrl(invalidUrl);
  assert.equal(result.status, 'invalid');
  assert.equal(result.embedUrl, null);
  assert.ok(result.errorMessage);
});

test('normalizeGoogleDriveUrl handles plain /view without query params', () => {
  const url = 'https://drive.google.com/file/d/1vdZDRjYRHhT2dVnzCt_h2Y4XnqN-gaUR/view';
  const result = normalizeGoogleDriveUrl(url);
  assert.equal(result.status, 'valid');
  assert.equal(result.fileId, '1vdZDRjYRHhT2dVnzCt_h2Y4XnqN-gaUR');
  assert.equal(result.embedUrl, 'https://drive.google.com/file/d/1vdZDRjYRHhT2dVnzCt_h2Y4XnqN-gaUR/preview');
});

test('normalizeGoogleDriveUrl handles /view?usp=sharing', () => {
  const url = 'https://drive.google.com/file/d/1zZVt0FOkhXGET3D5DCThglFlTC7_W-DQ/view?usp=sharing';
  const result = normalizeGoogleDriveUrl(url);
  assert.equal(result.status, 'valid');
  assert.equal(result.fileId, '1zZVt0FOkhXGET3D5DCThglFlTC7_W-DQ');
  assert.equal(result.embedUrl, 'https://drive.google.com/file/d/1zZVt0FOkhXGET3D5DCThglFlTC7_W-DQ/preview');
});

test('normalizeGoogleDriveUrl handles raw Google Drive file ID', () => {
  const rawId = '1mZY1oSPEU8hu66YV_y6DFtih_jjU7v6U';
  const result = normalizeGoogleDriveUrl(rawId);
  assert.equal(result.status, 'valid');
  assert.equal(result.fileId, '1mZY1oSPEU8hu66YV_y6DFtih_jjU7v6U');
  assert.equal(result.embedUrl, 'https://drive.google.com/file/d/1mZY1oSPEU8hu66YV_y6DFtih_jjU7v6U/preview');
});

test('normalizeGoogleDriveUrl cleans up accidental double preview URLs and never outputs /preview/preview', () => {
  const malformed = 'https://drive.google.com/file/d/1NY9zY8Oqv-WExekgJCtDo_6v4YWFH0x5/preview/preview';
  const result = normalizeGoogleDriveUrl(malformed);
  assert.equal(result.status, 'valid');
  assert.equal(result.fileId, '1NY9zY8Oqv-WExekgJCtDo_6v4YWFH0x5');
  assert.equal(result.embedUrl, 'https://drive.google.com/file/d/1NY9zY8Oqv-WExekgJCtDo_6v4YWFH0x5/preview');
  assert.equal(result.embedUrl?.includes('/preview/preview'), false);
});

