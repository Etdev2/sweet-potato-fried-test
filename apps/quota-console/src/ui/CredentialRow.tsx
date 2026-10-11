import { credentialFileName, type EmailDisplay } from "../domain/identity";
import type { Credential } from "../domain/quota-document";
import { describeReset } from "../domain/reset";
import { Bar, PercentText } from "./Bar";
import { Icon } from "./icons";

export type RowNotice =
  | { readonly kind: "none" }
  | { readonly kind: "refreshing" }
  | { readonly kind: "refreshed" }
  | { readonly kind: "failed"; readonly message: string };

interface CredentialRowProps {
  readonly credential: Credential;
  readonly emails: EmailDisplay;
  readonly asOf: Date;
  readonly timeZone: string;
  readonly notice: RowNotice;
  readonly busy: boolean;
  readonly onRefresh: () => void;
}

function NoticeText({ notice }: { readonly notice: RowNotice }) {
  switch (notice.kind) {
    case "none":
      return null;
    case "refreshing":
      return <span className="row-notice">Refreshing…</span>;
    case "refreshed":
      return <span className="row-notice" data-tone="ok">Refreshed</span>;
    case "failed":
      return (
        <span className="row-notice" data-tone="error" role="alert">
          {notice.message}
        </span>
      );
  }
}

export function CredentialRow({ credential, emails, asOf, timeZone, notice, busy, onRefresh }: CredentialRowProps) {
  const fileName = credentialFileName(credential, emails);
  return (
    <li className="row" data-credential={credential.id} aria-busy={notice.kind === "refreshing"}>
      <div className="row-name">
        <span className="file-name">{fileName}</span>
        {credential.plan === null ? null : <span className="plan">{credential.plan}</span>}
        {credential.state === "failed" ? <span className="plan" data-tone="error">Failed to load</span> : null}
      </div>
      <ul className="row-limits">
        {credential.limits.map((limit) => {
          const reset = describeReset(limit.reset, asOf, timeZone);
          return (
            <li key={limit.id} className="limit" data-limit={limit.id}>
              <div className="limit-head">
                <span>{limit.label}</span>
                <strong>
                  <PercentText remaining={limit.remaining} />
                </strong>
              </div>
              <Bar remaining={limit.remaining} label={`${fileName} ${limit.label}`} />
              <p className="reset">
                <strong>{reset.relative}</strong>
                {reset.absolute === null ? null : <span> · {reset.absolute}</span>}
              </p>
            </li>
          );
        })}
      </ul>
      <div className="row-action">
        <button type="button" className="ghost-button" disabled={busy} onClick={onRefresh} aria-label={`Refresh quota for ${fileName}`}>
          <Icon name="refresh" />
          Refresh quota
        </button>
        <span aria-live="polite">
          <NoticeText notice={notice} />
        </span>
      </div>
    </li>
  );
}
