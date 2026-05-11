import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-bg px-4">
      <div className="text-center">
        <p className="font-wordmark text-wordmark text-primary mb-4 text-[6rem] leading-none">
          404
        </p>
        <h1 className="font-headline-md text-headline-md text-on-surface mb-2">
          Page not found
        </h1>
        <p className="font-body-base text-body-base text-text-muted mb-8">
          This region of space has not been charted.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-on-primary font-telemetry text-telemetry hover:opacity-90 transition"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
