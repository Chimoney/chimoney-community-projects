import React, { ReactNode, ErrorInfo } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center"
          style={{
            background: "var(--background-color, #eef2fa)",
            fontFamily: "var(--font-family, Inter, sans-serif)",
            color: "var(--primary-color, #6366f1)",
          }}
        >
          <div className="text-center p-8 rounded-lg shadow-lg max-w-md" style={{
            background: "var(--surface-color, #fff)",
            color: "var(--text-primary, #222)",
            borderRadius: "var(--border-radius, 1.5rem)",
          }}>
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold mb-4" style={{
              color: "var(--primary-color, #6366f1)"
            }}>Something went wrong</h1>
            <p className="mb-4" style={{
              color: "var(--text-secondary, #6b7280)"
            }}>
              An error occurred while loading the wallet. Please try refreshing the page.
            </p>
            <button
              onClick={this.handleReload}
              style={{
                background: "var(--primary-color, #6366f1)",
                color: "var(--button-text, #fff)",
                borderRadius: "var(--border-radius, 1.5rem)",
                padding: "12px 24px",
                fontWeight: 600,
                fontSize: "1rem",
                transition: "background 0.2s",
              }}
              className="hover:brightness-95 focus:outline-none"
            >
              Reload Page
            </button>
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <details className="mt-4 text-left text-sm">
                <summary className="cursor-pointer text-gray-500">Error Details</summary>
                <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                  {this.state.error?.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
