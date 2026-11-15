/** Publish only client-verified values. Keep unavailable details null. */
export const contactDetails: {
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  socialLinks: { label: string; url: string }[];
} = {
  phone: null,
  whatsapp: null,
  email: null,
  address: null,
  socialLinks: [],
};

export const contactUnavailableMessage =
  "Enquiries are unavailable until verified contact details are provided.";

/** A verified delivery integration must be implemented before submission can be enabled.
 * Adding a phone or email above alone must never enable form submission. */
export const inquiryDelivery = {
  configured: false,
  message: "Online enquiries are not available yet. Submission is disabled until a verified delivery destination is connected. Details entered here are not sent or saved.",
} as const;

const whatsappNumberPattern = /^[1-9]\d{7,14}$/;

function getWhatsAppBaseUrl(): string | null {
  const number = contactDetails.whatsapp;
  return number && whatsappNumberPattern.test(number) ? `https://wa.me/${number}` : null;
}

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
