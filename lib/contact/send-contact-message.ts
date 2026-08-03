"use server"

import {
  validateContactForm,
  type ContactFormValues,
  type ContactFormState,
} from "@/lib/contact/validate-contact-form"

// This is the one function to replace when wiring up a real email provider
// (e.g. Resend). Its signature and return shape are what the form component
// depends on, so nothing else needs to change when that happens.
//
// Note: a file with a top-level "use server" directive may only export
// async functions — shared types/constants (ContactFormState,
// initialContactFormState) live in validate-contact-form.ts instead.
export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const values: ContactFormValues = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
  }

  const errors = validateContactForm(values)

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please fix the errors below and try again.",
      errors,
    }
  }

  // TODO(resend): replace this simulated delay with a real send, e.g.:
  //   await resend.emails.send({
  //     from: "CleanTextly <contact@cleantextly.com>",
  //     to: "contact@cleantextly.com",
  //     replyTo: values.email,
  //     subject: `[Contact] ${values.subject}`,
  //     text: `From: ${values.name} <${values.email}>\n\n${values.message}`,
  //   })
  await new Promise((resolve) => setTimeout(resolve, 600))

  return {
    status: "success",
    message: "Thanks for reaching out — we'll get back to you within 24–48 hours.",
    errors: {},
  }
}
