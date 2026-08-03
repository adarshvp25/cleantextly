"use client"

import { useActionState, useEffect, useId, useRef, useState } from "react"
import { LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { sendContactMessage } from "@/lib/contact/send-contact-message"
import {
  CONTACT_MESSAGE_MAX_LENGTH,
  initialContactFormState,
} from "@/lib/contact/validate-contact-form"

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialContactFormState
  )
  const [message, setMessage] = useState("")
  const [lastHandledState, setLastHandledState] = useState(state)
  const formRef = useRef<HTMLFormElement>(null)

  const nameId = useId()
  const emailId = useId()
  const subjectId = useId()
  const messageId = useId()
  const nameErrorId = `${nameId}-error`
  const emailErrorId = `${emailId}-error`
  const subjectErrorId = `${subjectId}-error`
  const messageErrorId = `${messageId}-error`

  // Clear the controlled message field as soon as a new (successful) action
  // result arrives — adjusting state during render, per React's guidance,
  // rather than calling setState inside an effect.
  if (state !== lastHandledState) {
    setLastHandledState(state)
    if (state.status === "success") {
      setMessage("")
    }
  }

  // Resetting the native form fields is a real DOM side effect, so that
  // part alone belongs in an effect.
  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6"
    >
      {state.status === "success" && (
        <p role="status" className="text-sm text-foreground">
          {state.message}
        </p>
      )}
      {state.status === "error" && Object.keys(state.errors).length === 0 && (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor={nameId} className="text-sm font-medium text-foreground">
          Name
        </label>
        <Input
          id={nameId}
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={!!state.errors.name}
          aria-describedby={state.errors.name ? nameErrorId : undefined}
        />
        {state.errors.name && (
          <p id={nameErrorId} role="alert" className="text-sm text-destructive">
            {state.errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={emailId} className="text-sm font-medium text-foreground">
          Email
        </label>
        <Input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={!!state.errors.email}
          aria-describedby={state.errors.email ? emailErrorId : undefined}
        />
        {state.errors.email && (
          <p id={emailErrorId} role="alert" className="text-sm text-destructive">
            {state.errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={subjectId} className="text-sm font-medium text-foreground">
          Subject
        </label>
        <Input
          id={subjectId}
          name="subject"
          type="text"
          autoComplete="off"
          required
          aria-invalid={!!state.errors.subject}
          aria-describedby={state.errors.subject ? subjectErrorId : undefined}
        />
        {state.errors.subject && (
          <p id={subjectErrorId} role="alert" className="text-sm text-destructive">
            {state.errors.subject}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label htmlFor={messageId} className="text-sm font-medium text-foreground">
            Message
          </label>
          <span className="text-xs text-muted-foreground">
            {message.length} / {CONTACT_MESSAGE_MAX_LENGTH}
          </span>
        </div>
        <Textarea
          id={messageId}
          name="message"
          required
          maxLength={CONTACT_MESSAGE_MAX_LENGTH}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="How can we help?"
          className="min-h-[160px]"
          aria-invalid={!!state.errors.message}
          aria-describedby={state.errors.message ? messageErrorId : undefined}
        />
        {state.errors.message && (
          <p id={messageErrorId} role="alert" className="text-sm text-destructive">
            {state.errors.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={pending} className="self-start">
        {pending && <LoaderCircle aria-hidden="true" className="animate-spin" />}
        {pending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
