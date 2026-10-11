export const LEGAL_UPDATED = "October 2026";

export type LegalSection = {
  id: string;
  title: string;
  body?: string[];
  list?: string[];
  after?: string[];
};

export const PRIVACY_INTRO =
  "This Privacy Policy explains what personal information SwiftShip collects, how we use it, and the choices you have. By using our website and services you agree to the practices described here.";

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: [
      "We collect only what we need to book, deliver and support your parcels.",
    ],
    list: [
      "Account details: name, email address, phone number and password (stored securely).",
      "Booking details: pickup and delivery addresses, receiver name and phone, parcel description and weight.",
      "Payment details: processed by our payment partners. We do not store full card numbers.",
      "Usage data: pages visited, device type and approximate location, collected through cookies and similar tools.",
      "Messages you send us through the contact form or support channels.",
    ],
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    list: [
      "To create your account and process, assign and deliver bookings.",
      "To send tracking updates, confirmations and important service messages.",
      "To provide customer support and respond to your enquiries.",
      "To prevent fraud, keep our platform secure and meet legal obligations.",
      "To improve our website, services and pricing.",
    ],
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: [
      "We do not sell your personal information. We share it only when needed to run the service:",
    ],
    list: [
      "Couriers, who see the pickup and delivery details required to complete a booking.",
      "Payment and technology providers that process payments, email and hosting on our behalf.",
      "Authorities, when required by law or to protect the safety of our users and couriers.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    body: [
      "We use cookies to keep you signed in, remember your preferences and understand how the site is used. You can control or delete cookies in your browser settings, but some features may stop working if you block them.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep data",
    body: [
      "We keep your account and booking records for as long as your account is active and for a reasonable period afterwards to meet legal, tax and dispute-resolution needs. You can ask us to delete your account at any time.",
    ],
  },
  {
    id: "security",
    title: "How we protect your data",
    body: [
      "We use encryption in transit, role-based access and regular reviews to protect your information. No system is completely secure, so we also encourage you to use a strong, unique password.",
    ],
  },
  {
    id: "your-rights",
    title: "Your choices and rights",
    body: ["Depending on where you live, you may have the right to:"],
    list: [
      "Access the personal information we hold about you.",
      "Correct information that is inaccurate or out of date.",
      "Request deletion of your account and personal data.",
      "Opt out of marketing emails using the unsubscribe link.",
    ],
    after: [
      "To use any of these rights, contact us using the details at the end of this policy.",
    ],
  },
  {
    id: "children",
    title: "Children",
    body: [
      "Our services are not directed at children under 16, and we do not knowingly collect their personal information.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: [
      "We may update this policy from time to time. When we make important changes we will update the date at the top of this page and, where appropriate, notify you by email.",
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    body: [
      "Questions about this policy? Email [support@swiftship.com] or write to [your company address].",
    ],
  },
];

export const TERMS_INTRO =
  "These Terms and Conditions govern your use of the SwiftShip website and delivery services. Please read them carefully. By creating an account or booking a delivery, you agree to be bound by them.";

export const TERMS_SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    body: [
      "By accessing our website or using our services you confirm that you are at least 18 years old (or have a parent or guardian's permission) and that you accept these terms.",
    ],
  },
  {
    id: "accounts",
    title: "Your account",
    list: [
      "You must provide accurate information when you register and keep it up to date.",
      "You are responsible for keeping your password confidential and for all activity on your account.",
      "Tell us immediately if you suspect unauthorised use of your account.",
    ],
  },
  {
    id: "bookings",
    title: "Bookings and services",
    body: [
      "A booking is confirmed once it is approved by SwiftShip. Accurate pickup and delivery addresses, contact numbers and parcel details are your responsibility. We may refuse or cancel a booking where information is incomplete or unsafe.",
    ],
  },
  {
    id: "prohibited-items",
    title: "Prohibited items",
    body: [
      "You must not send any item that is illegal or dangerous, including:",
    ],
    list: [
      "Weapons, explosives, flammable or hazardous materials.",
      "Illegal drugs and controlled substances.",
      "Counterfeit goods or items that infringe someone else's rights.",
      "Live animals, perishable goods not suitably packed, or items restricted by customs rules.",
    ],
    after: [
      "We may inspect, hold or report any parcel we reasonably suspect breaches this section.",
    ],
  },
  {
    id: "pricing-payment",
    title: "Pricing and payment",
    body: [
      "Prices shown on our website are estimates until your booking is confirmed. The final price depends on service type, weight, destination and any additional options. Payment must be made using the methods offered at checkout, or in cash on delivery where available.",
    ],
  },
  {
    id: "delivery-times",
    title: "Delivery times",
    body: [
      "Delivery times are estimates, not guarantees, and may be affected by weather, traffic, customs, incorrect addresses or events outside our control. Where we offer a delivery-time guarantee on a specific service, its terms are shown with that service.",
    ],
  },
  {
    id: "liability",
    title: "Loss, damage and liability",
    body: [
      "We take great care with every parcel. If a parcel is lost or damaged while in our care, you must report it to us within [7] days of the expected delivery date. Our liability is limited to the declared value of the parcel or [the maximum amount shown for your service], whichever is lower, and does not cover indirect losses such as lost profits.",
    ],
  },
  {
    id: "cancellations",
    title: "Cancellations and refunds",
    body: [
      "You may cancel a booking before a courier has picked up your parcel. Once a parcel is in transit, cancellation may not be possible or may incur a fee. Approved refunds are returned to the original payment method within [number] working days.",
    ],
  },
  {
    id: "termination",
    title: "Suspension and termination",
    body: [
      "We may suspend or close your account if you break these terms, misuse the platform or put couriers or other users at risk. You may close your account at any time by contacting us.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: [
      "We may update these terms from time to time. The updated version applies from the date shown at the top of this page. Continuing to use our services after changes means you accept them.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing law",
    body: [
      "These terms are governed by the laws of [your country]. Any dispute will be handled by the courts of [your city or jurisdiction].",
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    body: [
      "Questions about these terms? Email [support@swiftship.com] or write to [your company address].",
    ],
  },
];
