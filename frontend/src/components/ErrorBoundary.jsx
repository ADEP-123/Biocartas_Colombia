import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error capturado por ErrorBoundary:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.href = "/dashboard";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Algo salió mal</h2>
          <p>
            Ocurrió un error inesperado en esta pantalla. Vuelve al menú e
            intenta de nuevo.
          </p>
          <button type="button" onClick={this.handleReset}>
            Volver al menú
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
