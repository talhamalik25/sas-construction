"use client";

import { useState, type FocusEvent, type FormEvent } from "react";
import { CTA } from "@/components/ui/CTA";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { createWhatsAppLink, inquiryDelivery } from "@/lib/contact";

const workTypes = [
  "Road Construction & Development",
  "Earthwork & Backfilling",
  "Cutting, Excavation & Land Preparation",
  "Grading & Compaction",
  "Sewerage & Water Line Work",
  "Paver Installation & Surfacing",
  "Boundary Wall Construction",
  "Site Development",
  "Other / To be discussed",
];

const contactFields = [
  { id: "full-name", label: "Full Name", type: "text", autoComplete: "name", required: true, maxLength: 120 },
  { id: "phone", label: "Phone Number", type: "tel", autoComplete: "tel", required: true, maxLength: 30 },
  { id: "email", label: "Email Address", type: "email", autoComplete: "email", required: false, maxLength: 254 },
] as const;

const projectLocationField = {
  id: "location",
  label: "Project Location",
  type: "text",
  autoComplete: "off",
  required: true,
  maxLength: 200,
} as const;

type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function fieldError(field: FieldElement): string {
  const value = field.value.trim();
  if (field.required && !value) return "Please complete this field.";
  if (
    field.id === "inquiry-phone" &&
    value &&
    (!/^[+\d\s().-]+$/.test(value) ||
      value.replace(/\D/g, "").length < 7 ||
      value.replace(/\D/g, "").length > 15)
  ) {
    return "Enter a phone number with 7–15 digits, including your country code if needed.";
  }
  if (field.validity.typeMismatch) return "Enter a valid email address, or leave this field empty.";
  return "";
}

export function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionFeedback, setSubmissionFeedback] = useState<{
    kind: "opened" | "error";
    message: string;
  } | null>(null);
  const contactWhatsAppHref = createWhatsAppLink(
    "Hello SAS Construction, I would like to discuss your services."
  );

  function validate(event: FocusEvent<FieldElement>) {
    const field = event.currentTarget;
    setErrors((previous) => ({ ...previous, [field.id]: fieldError(field) }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const controls = Array.from(form.elements).filter(
      (element): element is FieldElement =>
        element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement
    );
    const nextErrors: Record<string, string> = {};
    let firstInvalid: FieldElement | null = null;

    for (const field of controls) {
      const error = fieldError(field);
      if (!error) continue;
      nextErrors[field.id] = error;
      if (!firstInvalid) firstInvalid = field;
    }

    setErrors(nextErrors);
    setSubmissionFeedback(null);
    if (firstInvalid) {
      firstInvalid.focus();
      setSubmissionFeedback({
        kind: "error",
        message: "Please correct the highlighted fields before continuing.",
      });
      return;
    }

    const formData = new FormData(form);
    const value = (name: string) => String(formData.get(name) ?? "").trim();
    const email = value("inquiry-email");
    const message = [
      "Hello SAS Construction, I would like to discuss a construction project and request a quotation.",
      "",
      `Name: ${value("inquiry-full-name")}`,
      `Phone/WhatsApp: ${value("inquiry-phone")}`,
      ...(email ? [`Email: ${email}`] : []),
      `Project Location: ${value("inquiry-location")}`,
      `Type of Work: ${value("inquiry-work")}`,
      "",
      "Project Details:",
      value("inquiry-details"),
    ].join("\n");
    const whatsappHref = createWhatsAppLink(message);

    if (!whatsappHref) {
      setSubmissionFeedback({
        kind: "error",
        message: "WhatsApp is unavailable. Your details remain in this form.",
      });
      return;
    }

    const whatsappWindow = window.open(whatsappHref, "_blank");
    if (!whatsappWindow) {
      setSubmissionFeedback({
        kind: "error",
        message: "Your browser blocked the WhatsApp window. Your details remain in this form; allow pop-ups and try again.",
      });
      return;
    }

    whatsappWindow.opener = null;
    setSubmissionFeedback({
      kind: "opened",
      message: "WhatsApp opened with a draft. Review the details there and press Send in WhatsApp.",
    });
  }

  const controlClass =
    "mt-2 block min-h-14 w-full rounded-lg border border-primary/15 bg-white px-4 py-3 text-sm text-foreground shadow-sm transition-[border-color,box-shadow] duration-200 placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 aria-invalid:border-primary aria-invalid:ring-2 aria-invalid:ring-primary/15";

  function errorMessage(id: string) {
    return (
      <p id={`${id}-error`} aria-live="polite" className="mt-2 text-xs font-medium leading-5 text-primary">
        {errors[id] || ""}
      </p>
    );
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-surface py-20 md:py-28 lg:py-32 border-t border-primary/15">
      <Container>
        <ScrollReveal>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
            {/* Left Column — Heading and Offline Status Box */}
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Initiate Contact"
                title="Let's Build Something Together."
                id="contact-heading"
              />
              <p className="mt-6 max-w-md text-sm leading-[1.85] text-muted md:text-base" data-scroll-reveal>
                Share your site location, project requirements, and scope of work. SAS Construction will evaluate how our equipment and teams can support your timeline.
              </p>

            </div>

            {/* Right Column — Structured Form */}
            <form
              aria-label="Project inquiry"
              aria-describedby="inquiry-channel-info"
              noValidate
              onSubmit={handleSubmit}
              className="lg:col-span-7 rounded-xl border border-primary/15 bg-white p-6 shadow-lg shadow-primary/5 sm:p-8 md:p-10"
            >
              <div className="mb-8 flex flex-col gap-5 border-b border-primary/15 pb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="mb-3 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                    <span aria-hidden="true" className="h-px w-6 bg-accent" />
                    Project inquiry
                  </p>
                  <h3 className="font-heading text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
                    Tell us about the work.
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-muted">
                    A few details help describe the site and the scope you have in mind.
                  </p>
                </div>
                <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-accent/50 bg-secondary/50 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                  WhatsApp draft
                </span>
              </div>

              <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
                <div className="flex items-center gap-3 border-b border-primary/10 pb-3 sm:col-span-2">
                  <span className="grid size-8 shrink-0 place-items-center rounded-md bg-primary font-mono text-xs font-semibold text-white">
                    01
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-primary">Your details</h4>
                    <p className="mt-0.5 text-xs text-muted">How to reach you about the project</p>
                  </div>
                </div>

                {contactFields.map((field) => {
                  const id = `inquiry-${field.id}`;
                  return (
                    <div key={id}>
                      <label htmlFor={id} className="text-sm font-medium text-foreground">
                        {field.label}
                        {field.required ? (
                          <span className="ml-1 text-primary" aria-hidden="true">*</span>
                        ) : (
                          <span className="ml-1.5 text-xs font-normal text-muted">Optional</span>
                        )}
                      </label>
                      <input
                        id={id}
                        name={id}
                        type={field.type}
                        autoComplete={field.autoComplete}
                        required={field.required}
                        maxLength={field.maxLength}
                        className={controlClass}
                        onBlur={validate}
                        onChange={(event) => {
                          if (errors[id]) {
                            setErrors((previous) => ({ ...previous, [id]: fieldError(event.target) }));
                          }
                        }}
                        aria-invalid={Boolean(errors[id])}
                        aria-describedby={`${id}-error`}
                      />
                      {errorMessage(id)}
                    </div>
                  );
                })}

                <div className="flex items-center gap-3 border-b border-primary/10 pb-3 sm:col-span-2 sm:mt-2">
                  <span className="grid size-8 shrink-0 place-items-center rounded-md bg-primary font-mono text-xs font-semibold text-white">
                    02
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-primary">Project brief</h4>
                    <p className="mt-0.5 text-xs text-muted">Location, work type, and key requirements</p>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="inquiry-location" className="text-sm font-medium text-foreground">
                    {projectLocationField.label}
                    <span className="ml-1 text-primary" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="inquiry-location"
                    name="inquiry-location"
                    type={projectLocationField.type}
                    autoComplete={projectLocationField.autoComplete}
                    required={projectLocationField.required}
                    maxLength={projectLocationField.maxLength}
                    className={controlClass}
                    onBlur={validate}
                    onChange={(event) => {
                      if (errors["inquiry-location"]) {
                        setErrors((previous) => ({
                          ...previous,
                          "inquiry-location": fieldError(event.target),
                        }));
                      }
                    }}
                    aria-invalid={Boolean(errors["inquiry-location"])}
                    aria-describedby="inquiry-location-error"
                  />
                  {errorMessage("inquiry-location")}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="inquiry-work" className="text-sm font-medium text-foreground">
                    Type of Construction Work
                    <span className="ml-1 text-primary" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="inquiry-work"
                    name="inquiry-work"
                    required
                    defaultValue=""
                    className={controlClass}
                    onBlur={validate}
                    onChange={(event) =>
                      setErrors((previous) => ({ ...previous, "inquiry-work": fieldError(event.target) }))
                    }
                    aria-invalid={Boolean(errors["inquiry-work"])}
                    aria-describedby="inquiry-work-error"
                  >
                    <option value="">Select the type of work</option>
                    {workTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errorMessage("inquiry-work")}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="inquiry-details" className="text-sm font-medium text-foreground">
                    Project Details
                    <span className="ml-1 text-primary" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="inquiry-details"
                    name="inquiry-details"
                    required
                    rows={5}
                    maxLength={5000}
                    className={`${controlClass} min-h-40 resize-y leading-6`}
                    onBlur={validate}
                    onChange={(event) => {
                      if (errors["inquiry-details"]) {
                        setErrors((previous) => ({
                          ...previous,
                          "inquiry-details": fieldError(event.target),
                        }));
                      }
                    }}
                    aria-invalid={Boolean(errors["inquiry-details"])}
                    aria-describedby="inquiry-details-hint inquiry-details-error"
                  />
                  <p id="inquiry-details-hint" className="mt-2 text-xs leading-5 text-muted">
                    Include the site, scope, and any requirements you would like to discuss.
                  </p>
                  {errorMessage("inquiry-details")}
                </div>
              </div>

              <div className="mt-8 flex flex-col items-start gap-3 border-t border-primary/15 pt-6">
                <CTA
                  type="submit"
                >
                  Continue to WhatsApp
                </CTA>
                <p className="flex items-start gap-2 text-xs leading-5 text-muted">
                  <span aria-hidden="true" className="mt-1 size-1.5 shrink-0 rounded-full bg-accent" />
                  WhatsApp opens with a draft for you to review and send. This website does not send messages automatically.
                </p>
                {submissionFeedback && (
                  <p
                    role={submissionFeedback.kind === "error" ? "alert" : "status"}
                    aria-live={submissionFeedback.kind === "error" ? "assertive" : "polite"}
                    className={`w-full rounded-lg border-l-2 bg-secondary/50 p-4 text-sm leading-6 ${
                      submissionFeedback.kind === "error"
                        ? "border-primary text-primary"
                        : "border-accent text-foreground"
                    }`}
                  >
                    {submissionFeedback.message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
