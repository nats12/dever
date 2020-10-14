import React from 'react';

interface IState {
  hasError: boolean,
  error: any,
  errorInfo: string
}

interface IProps {
  data: string
}

export class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: "", errorInfo: "" };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    this.setState({
      hasError: true,
      error,
      errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Error loading {this.props.data}</h1>;
    }

    return this.props.children;
  }
}