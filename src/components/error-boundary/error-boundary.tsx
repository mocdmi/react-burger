import { Component } from 'react';

import type { ErrorInfo, ReactNode } from 'react';

import styles from './error-boundary.module.css';

type TErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type TErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<TErrorBoundaryProps, TErrorBoundaryState> {
  constructor(props: TErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): TErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.error_boundary}>
          <h1 className="text text_type_main-large mb-4">Что-то пошло не так</h1>
          <p className="text text_type_main-default text_color_inactive mb-6">
            Произошла непредвиденная ошибка. Попробуйте обновить страницу.
          </p>
          <button className={styles.button} onClick={() => window.location.reload()}>
            Обновить страницу
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
