export type ContactFormValues = {
  name: string
  email: string
  subject: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

export type ContactFormState = {
  status: "idle" | "success" | "error"
  message: string
  errors: ContactFormErrors
}

export const initialContactFormState: ContactFormState = {
  status: "idle",
  message: "",
  errors: {},
}

export const CONTACT_MESSAGE_MAX_LENGTH = 2000

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!values.name.trim()) {
    errors.name = "Name is required."
  }

  if (!values.email.trim()) {
    errors.email = "Email is required."
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Enter a valid email address."
  }

  if (!values.subject.trim()) {
    errors.subject = "Subject is required."
  }

  if (!values.message.trim()) {
    errors.message = "Message is required."
  } else if (values.message.length > CONTACT_MESSAGE_MAX_LENGTH) {
    errors.message = `Message must be ${CONTACT_MESSAGE_MAX_LENGTH} characters or fewer.`
  }

  return errors
}
