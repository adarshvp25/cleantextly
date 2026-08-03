"use client"

import { useId } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CONTACT_MESSAGE_MAX_LENGTH } from "@/lib/contact/validate-contact-form"

export function ContactForm() {
  const nameId = useId()
  const emailId = useId()
  const subjectId = useId()
  const messageId = useId()

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6"
    >
      <p role="status" className="text-sm text-foreground">
        The contact form is temporarily unavailable. Please contact us using
        the email address above.
      </p>

      <div className="flex flex-col gap-2">
        <label htmlFor={nameId} className="text-sm font-medium text-foreground">
          Name
        </label>
        <Input id={nameId} name="name" type="text" autoComplete="name" disabled />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={emailId} className="text-sm font-medium text-foreground">
          Email
        </label>
        <Input id={emailId} name="email" type="email" autoComplete="email" disabled />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={subjectId} className="text-sm font-medium text-foreground">
          Subject
        </label>
        <Input id={subjectId} name="subject" type="text" autoComplete="off" disabled />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label htmlFor={messageId} className="text-sm font-medium text-foreground">
            Message
          </label>
          <span className="text-xs text-muted-foreground">
            0 / {CONTACT_MESSAGE_MAX_LENGTH}
          </span>
        </div>
        <Textarea
          id={messageId}
          name="message"
          disabled
          placeholder="How can we help?"
          className="min-h-[160px]"
        />
      </div>

      <Button type="submit" disabled className="self-start">
        Send Message
      </Button>
    </form>
  )
}
