import { useEffect, useRef, useState } from "react";

function getFocusable(container) {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll(
      'input, button, a[href], [tabindex]:not([tabindex="-1"])',
    ),
  ).filter(el => !el.disabled && el.offsetParent !== null);
}

function DeviceLoading() {
  return (
    <div className="device-loading">
      <div className="radar">
        <span className="radar-sweep" />
      </div>
      <p className="device-loading-text">Adquiriendo señal...</p>
    </div>
  );
}

function preventFocusSteal(e) {
  e.preventDefault();
}

function DPad({ onMove }) {
  return (
    <div className="dpad" role="group" aria-label="Navegación del dispositivo">
      <button
        type="button"
        className="dpad-btn dpad-up"
        onMouseDown={preventFocusSteal}
        onClick={() => onMove("up")}
        aria-label="Arriba"
      >
        ▲
      </button>
      <button
        type="button"
        className="dpad-btn dpad-left"
        onMouseDown={preventFocusSteal}
        onClick={() => onMove("left")}
        aria-label="Izquierda"
      >
        ◀
      </button>
      <span className="dpad-center" />
      <button
        type="button"
        className="dpad-btn dpad-right"
        onMouseDown={preventFocusSteal}
        onClick={() => onMove("right")}
        aria-label="Derecha"
      >
        ▶
      </button>
      <button
        type="button"
        className="dpad-btn dpad-down"
        onMouseDown={preventFocusSteal}
        onClick={() => onMove("down")}
        aria-label="Abajo"
      >
        ▼
      </button>
    </div>
  );
}

function DeviceFrame({ title, children }) {
  const [booting, setBooting] = useState(true);
  const screenRef = useRef(null);

  useEffect(() => {
    setBooting(true);
    const timer = setTimeout(() => setBooting(false), 650);
    return () => clearTimeout(timer);
  }, [title]);

  function moveFocus(direction) {
    const focusable = getFocusable(screenRef.current);
    if (focusable.length === 0) return;

    const currentIndex = focusable.indexOf(document.activeElement);
    let nextIndex;
    if (direction === "down" || direction === "right") {
      nextIndex =
        currentIndex === -1 ? 0 : (currentIndex + 1) % focusable.length;
    } else {
      nextIndex =
        currentIndex === -1
          ? 0
          : (currentIndex - 1 + focusable.length) % focusable.length;
    }
    focusable[nextIndex].focus();
  }

  function activate() {
    const container = screenRef.current;
    if (!container) return;
    const active = document.activeElement;

    // Si estas escribiendo en un input, Enter envia el formulario (comportamiento esperado)
    if (active && container.contains(active) && active.tagName === "INPUT") {
      const form = active.closest("form");
      if (form) {
        form.requestSubmit();
        return;
      }
    }

    // Si el foco esta en un boton o link dentro de la pantalla, lo activa
    if (active && container.contains(active) && active !== document.body) {
      active.click();
      return;
    }

    // Sin nada enfocado: envia el primer formulario visible, si existe
    const form = container.querySelector("form");
    if (form) form.requestSubmit();
  }

  return (
    <div className="device">
      <div className="device-antenna" />

      <div className="device-bezel-top">
        <div className="device-rivets">
          <span className="rivet" />
          <span className="rivet" />
        </div>
        {title && <span className="device-label">{title}</span>}
      </div>

      <div className="device-screen-frame">
        <div className="device-screen" ref={screenRef}>
          {booting ? <DeviceLoading /> : children}
        </div>
      </div>

      <div className="device-controls">
        <DPad onMove={moveFocus} />
        <button
          type="button"
          className="device-enter"
          onMouseDown={preventFocusSteal}
          onClick={activate}
        >
          Enter
        </button>
      </div>
    </div>
  );
}

export default DeviceFrame;
