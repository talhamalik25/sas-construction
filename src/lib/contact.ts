/** Publish only client-verified values. Keep unavailable details null. */
export const contactDetails: {
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  socialLinks: { label: string; url: string }[];
} = {
  phone: null,
  whatsapp: "923312718673",
  email: null,
  address: null,
  socialLinks: [],
};

const whatsappNumberPattern = /^[1-9]\d{7,14}$/;

function getWhatsAppBaseUrl(): string | null {
  const number = contactDetails.whatsapp;
  return number && whatsappNumberPattern.test(number) ? `https://wa.me/${number}` : null;
}

export const contactUnavailableMessage =
  "Enquiries are unavailable until verified contact details are provided.";

export const inquiryDelivery = {
  get configured() {
    return getWhatsAppBaseUrl() !== null;
  },
  message: "Submitting opens a prefilled WhatsApp draft for you to review and send. No message is sent automatically.",
} as const;

export function createWhatsAppLink(message: string): string | null {
  const baseUrl = getWhatsAppBaseUrl();
  return baseUrl ? `${baseUrl}?text=${encodeURIComponent(message)}` : null;
}

/** Phone must use international + format. */
export function getContactHref(): string | null {
  const whatsappUrl = getWhatsAppBaseUrl();
  if (whatsappUrl) return whatsappUrl;
  if (contactDetails.email && /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(contactDetails.email)) {
    return `mailto:${contactDetails.email}`;
  }
  if (contactDetails.phone && /^\+[1-9]\d{7,14}$/.test(contactDetails.phone)) {
    return `tel:${contactDetails.phone}`;
  }
  return null;
}
