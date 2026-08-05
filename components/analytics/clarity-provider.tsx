"use client"

import { useEffect } from "react"
import Clarity from "@microsoft/clarity"

const CLARITY_PROJECT_ID = "xxgvsp79ty"

// Module-level guard so Clarity initializes exactly once per page load,
// even if this component remounts (e.g. React Strict Mode's dev double-invoke).
let hasInitialized = false

export function ClarityProvider() {
  useEffect(() => {
    if (hasInitialized) {
      return
    }
    hasInitialized = true
    Clarity.init(CLARITY_PROJECT_ID)
  }, [])

  return null
}
