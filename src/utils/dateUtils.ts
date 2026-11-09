/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Simple approximate Hijri/Gregorian converter for student age computation
export function gregorianToHijri(gregorianDateStr: string): string {
  if (!gregorianDateStr) return '';
  const date = new Date(gregorianDateStr);
  if (isNaN(date.getTime())) return '';

  try {
    const formatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    return formatter.format(date);
  } catch {
    // Fallback approximation
    const gYear = date.getFullYear();
    const hYear = Math.round((gYear - 622) * (33 / 32));
    return `${date.getDate()}/${date.getMonth() + 1}/${hYear}`;
  }
}

export function calculateAge(birthDateStr: string): number {
  if (!birthDateStr) return 0;
  const today = new Date();
  const birthDate = new Date(birthDateStr);
  if (isNaN(birthDate.getTime())) return 0;

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function formatSaudiDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
