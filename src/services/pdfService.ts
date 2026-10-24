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
  doc.text(`Passing: 75/100 · ${report.finalAttempts} attempt(s)`, margin + 125, currentY + 24);

  // Section Breakdown box
  currentY = 88;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Comprehensive Final Assessment Section Breakdown', margin, currentY);

  currentY += 4;
  const colWidth = (contentWidth - 6) / 3;

  // Section 1: Core Knowledge
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, currentY, colWidth, 22, 2, 2, 'FD');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Part A · Core Knowledge', margin + 4, currentY + 6);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text(`${report.sectionScores.coreKnowledge.score} / ${report.sectionScores.coreKnowledge.max}`, margin + 4, currentY + 14);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('20 Questions (2 marks each)', margin + 4, currentY + 19);

  // Section 2: Scenario-Based
  doc.roundedRect(margin + colWidth + 3, currentY, colWidth, 22, 2, 2, 'FD');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Part B · Scenario-Based', margin + colWidth + 7, currentY + 6);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text(`${report.sectionScores.scenarioBased.score} / ${report.sectionScores.scenarioBased.max}`, margin + colWidth + 7, currentY + 14);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('5 Scenarios (6 marks each)', margin + colWidth + 7, currentY + 19);

  // Section 3: Practical Tasks
  doc.roundedRect(margin + (colWidth + 3) * 2, currentY, colWidth, 22, 2, 2, 'FD');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Part C · Practical Tasks', margin + (colWidth + 3) * 2 + 4, currentY + 6);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text(`${report.sectionScores.practical.score} / ${report.sectionScores.practical.max}`, margin + (colWidth + 3) * 2 + 4, currentY + 14);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('5 Tasks (6 marks each)', margin + (colWidth + 3) * 2 + 4, currentY + 19);

  // Chapter Assessments Summary Table
  currentY += 30;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Individual Chapter Assessment Matrix (11 Chapters)', margin, currentY);

  currentY += 4;
  // Table header
  doc.setFillColor(241, 245, 249); // slate-100
  doc.rect(margin, currentY, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text('CH', margin + 3, currentY + 4.8);
  doc.text('CHAPTER TITLE', margin + 14, currentY + 4.8);
  doc.text('SCORE', margin + 115, currentY + 4.8);
  doc.text('STATUS', margin + 138, currentY + 4.8);
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
    const truncatedTitle = ch.title.length > 55 ? ch.title.slice(0, 52) + '...' : ch.title;
    doc.text(truncatedTitle, margin + 14, rowY + 5.5);

    // Score
    if (ch.bestScore !== null) {
      doc.text(`${ch.bestScore} / ${ch.totalQuestions}`, margin + 115, rowY + 5.5);
    } else {
      doc.setTextColor(148, 163, 184);
      doc.text('—', margin + 115, rowY + 5.5);
      doc.setTextColor(15, 23, 42);
    }

    // Status
    if (ch.passed) {
      doc.setTextColor(22, 101, 52);
      doc.text('Passed', margin + 138, rowY + 5.5);
    } else if (ch.bestScore !== null) {
      doc.setTextColor(185, 28, 28);
      doc.text('Retake', margin + 138, rowY + 5.5);
    } else {
      doc.setTextColor(148, 163, 184);
      doc.text('Unattempted', margin + 138, rowY + 5.5);
    }

    // Attempts
    doc.setTextColor(100, 116, 139);
    doc.text(`${ch.attempts}`, margin + 165, rowY + 5.5);
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
