import { jsPDF } from 'jspdf';
import { FinalReportData } from '../types/index.ts';
import { sanitizeReportFilename } from '../utils/scoring.ts';

/**
 * Generates and triggers download of a clean, professional, Apple-style PDF report.
 */
export function generateAssessmentReportPDF(report: FinalReportData): void {
  // Use standard portrait A4 format (210 x 297 mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  // Background subtle tint
  doc.setFillColor(250, 250, 252);
  doc.rect(0, 0, pageWidth, 297, 'F');

  // Top header bar (deep charcoal / navy)
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(margin, 16, contentWidth, 3, 'F');

  // Title
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text('ALT INDIA SALES COUNSELLING · INTERNAL ASSESSMENT', margin, 26);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('Assessment Report', margin, 35);

  // Subtitle / Date
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  const formattedDate = new Date(report.generatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  doc.text(`Generated: ${formattedDate} · Session ID: ${report.userId.slice(0, 8)}`, margin, 41);

  // Candidate card box
  let currentY = 48;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.roundedRect(margin, currentY, contentWidth, 34, 3, 3, 'FD');

  // Candidate Name
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('CANDIDATE NAME', margin + 6, currentY + 9);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text(report.candidateName, margin + 6, currentY + 18);

  // Overall Status
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('OVERALL STATUS', margin + 70, currentY + 9);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  if (report.status === 'PASSED') {
    doc.setTextColor(22, 101, 52); // green-800
    doc.text('PASSED (Certified)', margin + 70, currentY + 17);
  } else {
    doc.setTextColor(185, 28, 28); // red-700
    doc.text('NEEDS RETAKE', margin + 70, currentY + 17);
  }

  // Final Assessment Score
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('FINAL SCORE', margin + 125, currentY + 9);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.text(`${report.finalScore} / ${report.maximumScore}`, margin + 125, currentY + 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(`Passing: 75% (${Math.ceil(report.maximumScore * 0.75)}/${report.maximumScore}) · ${report.finalAttempts} attempt(s)`, margin + 125, currentY + 24);

  // Curriculum Scope Overview Box
  currentY = 88;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, currentY, contentWidth, 20, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Curriculum Architecture & Scope', margin + 5, currentY + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(
    '7 Theory Modules (Assessments 1–7) + 2 Kannada Roleplay Demonstrations (No Assessment). Final Assessment draws exclusively from Modules 1–7.',
    margin + 5,
    currentY + 13,
    { maxWidth: contentWidth - 10 }
  );

  // Module Assessments Summary Table
  currentY += 28;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Module Matrix (7 Theory Modules + 2 Demonstrations)', margin, currentY);

  currentY += 4;
  // Table header
  doc.setFillColor(241, 245, 249); // slate-100
  doc.rect(margin, currentY, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text('MOD', margin + 3, currentY + 4.8);
  doc.text('MODULE TITLE', margin + 16, currentY + 4.8);
  doc.text('SCORE', margin + 112, currentY + 4.8);
  doc.text('STATUS', margin + 134, currentY + 4.8);
  doc.text('ATTEMPTS', margin + 160, currentY + 4.8);

  currentY += 7;
  doc.setFont('helvetica', 'normal');

  report.chapterResults.forEach((ch, idx) => {
    const rowY = currentY + idx * 8.5;
    // Row background zebra
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, rowY, contentWidth, 8.5, 'F');
    }
    // Subtle border bottom
    doc.setDrawColor(241, 245, 249);
    doc.line(margin, rowY + 8.5, margin + contentWidth, rowY + 8.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(ch.chapterNumber, margin + 3, rowY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    // Truncate title if needed
    const truncatedTitle = ch.title.length > 50 ? ch.title.slice(0, 47) + '...' : ch.title;
    doc.text(truncatedTitle, margin + 16, rowY + 5.5);

    const isRoleplay = ch.type === 'roleplay' || ch.chapterId === 8 || ch.chapterId === 9;

    if (isRoleplay) {
      // Roleplay — No Assessment
      doc.setTextColor(148, 163, 184);
      doc.text('—', margin + 112, rowY + 5.5);
      doc.setFont('helvetica', 'italic');
      doc.text('Roleplay — No Assessment', margin + 134, rowY + 5.5);
      doc.setFont('helvetica', 'normal');
      doc.text('—', margin + 165, rowY + 5.5);
    } else {
      // Theory Module Assessment
      if (ch.bestScore !== null) {
        doc.text(`${ch.bestScore} / ${ch.totalQuestions}`, margin + 112, rowY + 5.5);
      } else {
        doc.setTextColor(148, 163, 184);
        doc.text('—', margin + 112, rowY + 5.5);
        doc.setTextColor(15, 23, 42);
      }

      // Status
      if (ch.passed) {
        doc.setTextColor(22, 101, 52);
        doc.text('Passed (≥ 70%)', margin + 134, rowY + 5.5);
      } else if (ch.bestScore !== null) {
        doc.setTextColor(185, 28, 28);
        doc.text('Needs Retake', margin + 134, rowY + 5.5);
      } else {
        doc.setTextColor(148, 163, 184);
        doc.text('Unattempted', margin + 134, rowY + 5.5);
      }

      // Attempts
      doc.setTextColor(100, 116, 139);
      doc.text(`${ch.attempts}`, margin + 165, rowY + 5.5);
    }
  });

  // Footer notes & verification
  const footerY = 268;
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, footerY, margin + contentWidth, footerY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    'This internal assessment verifies understanding of core education sales counselling standards, consultative discovery, objection resolution, and closure compliance.',
    margin,
    footerY + 5,
    { maxWidth: contentWidth }
  );
  doc.text(
    'Alt India Sales Counselling Training · Official Training Record · Persistent Local Storage Verified',
    margin,
    footerY + 12
  );

  // Trigger download
  const filename = sanitizeReportFilename(report.candidateName);
  doc.save(filename);
}
