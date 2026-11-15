"use client";

import { useState, type FocusEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { inquiryDelivery } from "@/lib/contact";

const workTypes = ["Road Construction & Development", "Earthwork & Backfilling", "Cutting, Excavation & Land Preparation", "Grading & Compaction", "Sewerage & Water Line Work", "Paver Installation & Surfacing", "Boundary Wall Construction", "Site Development", "Other / To be discussed"];
const fields = [
  { id: "full-name", label: "Full Name", type: "text", autoComplete: "name", required: true, maxLength: 120 },
  { id: "phone", label: "Phone Number", type: "tel", autoComplete: "tel", required: true, maxLength: 30 },
  { id: "email", label: "Email Address", type: "email", autoComplete: "email", required: false, maxLength: 254 },
  { id: "location", label: "Project Location", type: "text", autoComplete: "off", required: true, maxLength: 200 },
] as const;

type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function fieldError(field: FieldElement): string {
  const value = field.value.trim();
  if (field.required && !value) return "Please complete this field.";
  if (field.id === "inquiry-phone" && value && (!/^[+\d\s().-]+$/.test(value) || value.replace(/\D/g, "").length < 7 || value.replace(/\D/g, "").length > 15)) return "Enter a phone number with 7–15 digits, including your country code if needed.";
  if (field.validity.typeMismatch) return "Enter a valid email address, or leave this field empty.";
  return "";
}

export function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  function validate(event: FocusEvent<FieldElement>) {
    const field = event.currentTarget;
    setErrors(previous => ({ ...previous, [field.id]: fieldError(field) }));
  }
  const controlClass = "mt-2 block min-h-13 w-full rounded-[2px] border border-primary/25 bg-background px-4 py-3 text-base text-foreground transition-colors focus:border-primary aria-invalid:border-primary aria-invalid:ring-1 aria-invalid:ring-primary";
  function errorMessage(id: string) {
    return <p id={`${id}-error`} aria-live="polite" className="mt-2 text-xs font-medium leading-5 text-primary">{errors[id] || ""}</p>;
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-surface py-20 md:py-28 lg:py-32">
      <Container><ScrollReveal>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Get in touch" title="Let's Build Something Together." id="contact-heading" />
            <p className="mt-6 max-w-md text-sm leading-[1.85] text-muted md:text-base" data-scroll-reveal>Tell us about your construction requirements and the type of work you need.</p>
            <div id="inquiry-unavailable" className="mt-10 border-l-2 border-accent bg-background p-6" data-scroll-reveal>
              <h3 className="font-heading text-lg font-semibold text-primary">Enquiries are not open yet</h3>
              <p className="mt-3 text-sm leading-[1.85] text-muted">{inquiryDelivery.message}</p>
            </div>
          </div>
          <form aria-label="Project inquiry" aria-describedby="inquiry-unavailable" noValidate onSubmit={event => event.preventDefault()} className="lg:col-span-7">
            <p className="mb-7 border-b border-primary/20 pb-4 text-xs leading-6 text-muted">Project inquiry preview · All fields required unless marked optional.</p>
            <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {fields.map(field => {
                const id = `inquiry-${field.id}`;
                return <div key={id}>
                  <label htmlFor={id} className="text-sm font-medium text-primary">{field.label}{!field.required && <span className="font-normal text-muted"> (optional)</span>}</label>
                  <input id={id} type={field.type} autoComplete={field.autoComplete} required={field.required} maxLength={field.maxLength} className={controlClass} onBlur={validate} onChange={event => { if (errors[id]) setErrors(previous => ({ ...previous, [id]: fieldError(event.target) })); }} aria-invalid={Boolean(errors[id])} aria-describedby={`${id}-error`} />
                  {errorMessage(id)}
                </div>;
              })}
              <div className="sm:col-span-2">
                <label htmlFor="inquiry-work" className="text-sm font-medium text-primary">Type of Construction Work</label>
                <select id="inquiry-work" required defaultValue="" className={controlClass} onBlur={validate} onChange={event => setErrors(previous => ({ ...previous, "inquiry-work": fieldError(event.target) }))} aria-invalid={Boolean(errors["inquiry-work"])} aria-describedby="inquiry-work-error">
                  <option value="">Select the type of work</option>
                  {workTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
                {errorMessage("inquiry-work")}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="inquiry-details" className="text-sm font-medium text-primary">Project Details</label>
                <textarea id="inquiry-details" required rows={5} maxLength={5000} className={`${controlClass} resize-y`} onBlur={validate} onChange={event => { if (errors["inquiry-details"]) setErrors(previous => ({ ...previous, "inquiry-details": fieldError(event.target) })); }} aria-invalid={Boolean(errors["inquiry-details"])} aria-describedby="inquiry-details-hint inquiry-details-error" />
                <p id="inquiry-details-hint" className="mt-2 text-xs leading-5 text-muted">Describe the site, scope and any requirements you would like to discuss.</p>
                {errorMessage("inquiry-details")}
              </div>
            </div>
            <div className="mt-6 flex flex-col items-start gap-4 border-t border-primary/20 pt-6">
              <button type="submit" disabled={!inquiryDelivery.configured} aria-describedby="inquiry-unavailable" className="inline-flex min-h-13 items-center gap-6 rounded-[2px] border border-primary/25 bg-secondary px-6 py-3.5 text-sm font-medium text-primary disabled:cursor-not-allowed">Send Project Inquiry <ArrowUpRight size={18} aria-hidden="true" /></button>
              <p className="text-xs leading-5 text-muted">Submission unavailable. No enquiry will be delivered.</p>
            </div>
          </form>
        </div>
      </ScrollReveal></Container>
    </section>
  );
}
