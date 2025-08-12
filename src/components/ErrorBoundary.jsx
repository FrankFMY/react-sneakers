import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('UI error caught by ErrorBoundary:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h2>Что-то пошло не так</h2>
          <p>Пожалуйста, обновите страницу или попробуйте снова.</p>
          <button className="greenButton" onClick={this.handleReset}>Повторить</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;