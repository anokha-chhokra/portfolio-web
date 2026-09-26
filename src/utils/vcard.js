function buildVCard({ name, title, email, phone, location, url }) {
  const nameParts = name.trim().split(/\s+/);
  const family = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
  const given = nameParts.slice(0, -1).join(' ') || name;

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${family};${given};;;`,
    `FN:${name}`,
    title && `TITLE:${title}`,
    email && `EMAIL;TYPE=INTERNET:${email}`,
    phone && `TEL;TYPE=CELL:${phone}`,
    location && `ADR;TYPE=WORK:;;${location};;;;`,
    url && `URL:${url}`,
    'END:VCARD',
  ].filter(Boolean);

  return lines.join('\r\n');
}

/**
 * Builds a .vcf contact card in the browser and triggers a download.
 * No network request involved — everything happens client-side.
 */
export function downloadVCard(data, filename = 'contact.vcf') {
  const vcard = buildVCard(data);
  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
