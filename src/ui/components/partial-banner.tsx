type PartialBannerProps = {
  text: string;
  actionLabel?: string;
};

export function PartialBanner({ text, actionLabel }: PartialBannerProps) {
  return (
    <div className="f8sync-partial-banner" role="status">
      <span className="f8sync-info-icon" aria-hidden="true">i</span>
      <span>{text}</span>
      {actionLabel ? <strong>{actionLabel}</strong> : null}
    </div>
  );
}
