import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Application error boundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-background px-5 text-foreground">
          <section className="max-w-md text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Something went wrong</p>
            <h1 className="mt-3 text-3xl font-bold">The page could not be loaded safely.</h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Please refresh the page or return home. The error has been logged locally for debugging.
            </p>
            <a
              href="/"
              className="mt-6 inline-flex rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
            >
              Return home
            </a>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
