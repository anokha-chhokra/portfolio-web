import { downloadVCard } from '../utils/vcard.js';
import { contact } from '../data/content.js';

export default function SaveContactButton({ className = 'btn' }) {
  function handleClick() {
    downloadVCard(
      {
        name: contact.name,
        title: contact.title,
        email: contact.email,
        phone: contact.phone,
        location: contact.location,
        url: contact.linkedin,
      },
      `${contact.name.toLowerCase().replace(/\s+/g, '-')}.vcf`
    );
  }

  return (
    <button type="button" className={className} onClick={handleClick}>
      Save contact ↓
    </button>
  );
}
