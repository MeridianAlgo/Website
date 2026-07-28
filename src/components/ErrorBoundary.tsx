import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="sheet flex min-h-dvh flex-col justify-center py-20">
          <p className="lbl flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-stamp" aria-hidden="true" />
            Page stopped
          </p>
          <h2 className="display-2 mt-3">This page hit an error and stopped.</h2>
          <p className="lede mt-4">
            Nothing you entered was sent anywhere. Reloading usually clears it; if
            it keeps happening, tell us at meridianalgo@gmail.com.
          </p>
          <div className="mt-8">
            <button onClick={this.handleReload} className="btn-primary">
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Reload the page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
