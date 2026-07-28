/** A ruled placeholder line rather than a spinner — it matches the sheet. */
const LoadingSpinner = ({ label = 'Loading' }: { label?: string }) => (
  <p className="lbl flex items-center gap-3" role="status">
    {label}
    <span className="inline-block h-px w-16 animate-pulse bg-steel" />
  </p>
);

export default LoadingSpinner;
