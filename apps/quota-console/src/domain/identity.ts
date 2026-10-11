import type { Credential } from "./quota-document";

export type EmailDisplay = "masked" | "shown";

const HIDDEN = "•••";

// Keeps the first character of the local part and of the domain, plus the
// last domain label. The hidden run has a fixed width, so it does not reveal
// how long the real text is.
export function maskEmail(email: string): string {
  const at = email.lastIndexOf("@");
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  const lastDot = domain.lastIndexOf(".");
  const suffix = lastDot === -1 ? "" : domain.slice(lastDot);
  return `${local.slice(0, 1)}${HIDDEN}@${domain.slice(0, 1)}${HIDDEN}${suffix}`;
}

export function credentialFileName(
  credential: Pick<Credential, "provider" | "account">,
  display: EmailDisplay,
): string {
  const { account } = credential;
  switch (account.kind) {
    case "email": {
      const address = display === "shown" ? account.email : maskEmail(account.email);
      return `${credential.provider}-${address}.json`;
    }
    case "local":
      return `${credential.provider}-${account.label}.json`;
  }
}
