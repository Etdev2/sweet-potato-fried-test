import { useCallback, useEffect, useState } from "react";
import { describeLoadError, loadQuota, type LoadError, type SourceResolution } from "../data/load-quota";
import type { EmailDisplay } from "../domain/identity";
import { PROVIDER_IDS, PROVIDER_LABELS, type ProviderId } from "../domain/providers";
import type { CredentialId, QuotaDocument } from "../domain/quota-document";
import { clockTime } from "../domain/reset";
import { countByProvider, countLoaded, groupByProvider } from "../domain/summary";
import { CredentialRow, type RowNotice } from "./CredentialRow";
import { Icon } from "./icons";
import { ProviderCard } from "./ProviderCard";
import { ProviderMark } from "./ProviderMark";
import { Sidebar } from "./Sidebar";

type View =
  | { readonly status: "no-source" }
  | { readonly status: "loading" }
  | { readonly status: "failed"; readonly error: LoadError }
  | { readonly status: "ready"; readonly document: QuotaDocument };

// At most one request runs at a time.
type Activity =
  | { readonly kind: "idle" }
  | { readonly kind: "page" }
  | { readonly kind: "row"; readonly id: CredentialId };

type Tab = "all" | ProviderId;

interface RowOutcome {
  readonly id: CredentialId;
  readonly notice: RowNotice;
}

interface AppProps {
  readonly source: SourceResolution;
  readonly timeZone: string;
}

// Replaces one credential with its fresh copy. The document time only moves
// forward, because reset labels are measured from it.
function withRefreshedCredential(current: QuotaDocument, fresh: QuotaDocument, id: CredentialId): QuotaDocument | null {
  const replacement = fresh.credentials.find((credential) => credential.id === id);
  if (replacement === undefined) return null;
  const newer = Date.parse(fresh.generatedAt) > Date.parse(current.generatedAt);
  return {
    ...current,
    generatedAt: newer ? fresh.generatedAt : current.generatedAt,
    credentials: current.credentials.map((credential) => (credential.id === id ? replacement : credential)),
  };
}

function ErrorPanel({ title, details, onRetry }: { readonly title: string; readonly details: readonly string[]; readonly onRetry: (() => void) | null }) {
  return (
    <section className="error-panel" role="alert">
      <h2>{title}</h2>
      <ul>
        {details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
      {onRetry === null ? null : (
        <button type="button" className="ghost-button" onClick={onRetry}>
          <Icon name="refresh" />
          Try again
        </button>
      )}
    </section>
  );
}

export function App({ source, timeZone }: AppProps) {
  const [view, setView] = useState<View>(source.ok ? { status: "loading" } : { status: "no-source" });
  const [activity, setActivity] = useState<Activity>(source.ok ? { kind: "page" } : { kind: "idle" });
  const [tab, setTab] = useState<Tab>("all");
  const [emails, setEmails] = useState<EmailDisplay>("masked");
  const [rowOutcome, setRowOutcome] = useState<RowOutcome | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const url = source.ok ? source.url : null;

  const refreshPage = useCallback(async () => {
    if (url === null) return;
    setActivity({ kind: "page" });
    setRowOutcome(null);
    const result = await loadQuota(url);
    setView(result.ok ? { status: "ready", document: result.document } : { status: "failed", error: result.error });
    setActivity({ kind: "idle" });
  }, [url]);

  const refreshRow = useCallback(
    async (id: CredentialId) => {
      if (url === null) return;
      setActivity({ kind: "row", id });
      setRowOutcome(null);
      const result = await loadQuota(url);
      if (result.ok) {
        const fresh = result.document;
        const stillListed = fresh.credentials.some((credential) => credential.id === id);
        if (stillListed) {
          setView((current) => {
            if (current.status !== "ready") return current;
            const next = withRefreshedCredential(current.document, fresh, id);
            return next === null ? current : { status: "ready", document: next };
          });
        }
        setRowOutcome({
          id,
          notice: stillListed
            ? { kind: "refreshed" }
            : { kind: "failed", message: "This credential is no longer in the data. Refresh the page." },
        });
      } else {
        setRowOutcome({ id, notice: { kind: "failed", message: describeLoadError(result.error, url).title } });
      }
      setActivity({ kind: "idle" });
    },
    [url],
  );

  useEffect(() => {
    void refreshPage();
  }, [refreshPage]);

  const busy = activity.kind !== "idle";
  const document = view.status === "ready" ? view.document : null;
  const credentials = document?.credentials ?? [];
  const counts = countByProvider(credentials);
  const asOf = document === null ? null : new Date(document.generatedAt);
  const visibleGroups = groupByProvider(credentials).filter((group) =>
    tab === "all" ? group.credentials.length > 0 : group.provider === tab,
  );

  const noticeFor = (id: CredentialId): RowNotice => {
    if (activity.kind === "row" && activity.id === id) return { kind: "refreshing" };
    if (rowOutcome?.id === id) return rowOutcome.notice;
    return { kind: "none" };
  };

  return (
    <div className="shell">
      <Sidebar
        credentialCount={document === null ? null : credentials.length}
        collapsed={sidebarCollapsed}
        onToggle={() => {
          setSidebarCollapsed((value) => !value);
        }}
      />
      <main id="quota" className="main" aria-busy={busy}>
        <header className="page-head">
          <div>
            <h1>Quota Management</h1>
            <p className="page-meta" data-testid="page-meta">
              {document === null ? (
                <span>{view.status === "loading" ? "Loading credentials…" : "No credentials loaded"}</span>
              ) : (
                <>
                  <span>
                    {credentials.length} {credentials.length === 1 ? "credential" : "credentials"}
                  </span>{" "}
                  <span className="dot">·</span>{" "}
                  <span className="loaded">{countLoaded(credentials)} loaded</span>
                </>
              )}
            </p>
          </div>
          <div className="page-actions">
            {asOf === null ? null : (
              <span className="as-of" data-testid="as-of">
                Data as of {clockTime(asOf, timeZone)}
              </span>
            )}
            <button
              type="button"
              className="ghost-button pill"
              aria-pressed={emails === "shown"}
              disabled={document === null}
              onClick={() => {
                setEmails((value) => (value === "shown" ? "masked" : "shown"));
              }}
            >
              {emails === "shown" ? "Hide emails" : "Show emails"}
            </button>
            <button
              type="button"
              className="primary-button pill"
              disabled={busy || url === null}
              onClick={() => {
                void refreshPage();
              }}
            >
              <Icon name="refresh" />
              {activity.kind === "page" ? "Refreshing…" : "Refresh"}
            </button>
          </div>
        </header>

        {!source.ok ? (
          <ErrorPanel
            title={`Unknown data source "${source.requested}"`}
            details={[`Use one of: ${source.known.join(", ")}.`]}
            onRetry={null}
          />
        ) : null}

        {view.status === "failed" && url !== null ? (
          <ErrorPanel
            {...describeLoadError(view.error, url)}
            onRetry={() => {
              void refreshPage();
            }}
          />
        ) : null}

        {document !== null && asOf !== null ? (
          <>
            <div className="tabs" role="tablist" aria-label="Providers">
              <button type="button" role="tab" id="tab-all" aria-selected={tab === "all"} aria-controls="quota-panel" onClick={() => { setTab("all"); }}>
                <Icon name="all" />
                All
                <span className="badge">{credentials.length}</span>
              </button>
              {PROVIDER_IDS.map((provider) => (
                <button
                  key={provider}
                  type="button"
                  role="tab"
                  id={`tab-${provider}`}
                  aria-selected={tab === provider}
                  aria-controls="quota-panel"
                  onClick={() => {
                    setTab(provider);
                  }}
                >
                  <ProviderMark provider={provider} />
                  {PROVIDER_LABELS[provider]}
                  <span className="badge">{counts[provider]}</span>
                </button>
              ))}
            </div>

            <div id="quota-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
              {visibleGroups.every((group) => group.credentials.length === 0) ? (
                <p className="empty">
                  {tab === "all" ? "No credentials in this data file." : `No ${PROVIDER_LABELS[tab]} credentials.`}
                </p>
              ) : (
                <>
                  <section className="cards" aria-label="Provider summaries">
                    {visibleGroups.map((group) => (
                      <ProviderCard
                        key={group.provider}
                        provider={group.provider}
                        credentials={group.credentials}
                        asOf={asOf}
                        timeZone={timeZone}
                      />
                    ))}
                  </section>
                  {visibleGroups.map((group) => (
                    <section key={group.provider} className="group" aria-label={`${PROVIDER_LABELS[group.provider]} credentials`}>
                      <h2>
                        {PROVIDER_LABELS[group.provider]} <span className="group-count">{group.credentials.length}</span>
                      </h2>
                      <ul className="rows">
                        {group.credentials.map((credential) => (
                          <CredentialRow
                            key={credential.id}
                            credential={credential}
                            emails={emails}
                            asOf={asOf}
                            timeZone={timeZone}
                            notice={noticeFor(credential.id)}
                            busy={busy}
                            onRefresh={() => {
                              void refreshRow(credential.id);
                            }}
                          />
                        ))}
                      </ul>
                    </section>
                  ))}
                </>
              )}
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}
