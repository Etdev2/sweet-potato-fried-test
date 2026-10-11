import { PROVIDER_LABELS, type ProviderId } from "../domain/providers";

// A plain coloured initial, not a provider logo.
export function ProviderMark({ provider }: { readonly provider: ProviderId }) {
  return (
    <span className="provider-mark" data-provider={provider} aria-hidden="true">
      {PROVIDER_LABELS[provider].slice(0, 1).toUpperCase()}
    </span>
  );
}
