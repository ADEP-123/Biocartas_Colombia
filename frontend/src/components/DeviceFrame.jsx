import { createContext, useContext, useEffect, useRef, useState } from "react";

const DeviceStatusContext = createContext(null);

export function useDeviceStatus() {
  const ctx = useContext(DeviceStatusContext);
  if (!ctx) {
    throw new Error("useDeviceStatus debe usarse dentro de un DeviceFrame");
  }
  return ctx;
}

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

function DPad({ onMove, onEnter }) {
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
      <button
        type="button"
        className="dpad-btn dpad-center"
        onMouseDown={preventFocusSteal}
        onClick={onEnter}
        aria-label="Enter"
      />
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

function MiniScreen({ message, tone }) {
  return (
    <div className={`mini-screen mini-screen-${tone}`}>
      <span className="mini-screen-text">{message}</span>
    </div>
  );
}

const IDLE_STATUS = { message: "Listo", tone: "idle" };

function DeviceFrame({ title, children }) {
  const [booting, setBooting] = useState(true);
  const [status, setStatusState] = useState(IDLE_STATUS);
  const [scrollState, setScrollState] = useState({ up: false, down: false });
  const screenRef = useRef(null);

  useEffect(() => {
    setBooting(true);
    setStatusState(IDLE_STATUS);
    const timer = setTimeout(() => setBooting(false), 650);
    return () => clearTimeout(timer);
  }, [title]);

  function updateScrollState() {
    const el = screenRef.current;
    if (!el) return;
    setScrollState({
      up: el.scrollTop > 4,
      down: el.scrollTop + el.clientHeight < el.scrollHeight - 4,
    });
  }

  useEffect(() => {
    if (booting) return;
    const el = screenRef.current;
    if (!el) return;

    updateScrollState();

    const resizeObserver = new ResizeObserver(updateScrollState);
    Array.from(el.children).forEach(child => resizeObserver.observe(child));

    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      resizeObserver.disconnect();
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [booting]);

  function scrollByArrow(direction) {
    const el = screenRef.current;
    if (!el) return;
    el.scrollBy({ top: direction === "down" ? 90 : -90, behavior: "smooth" });
  }

  function setStatus(message, tone = "idle") {
    setStatusState({ message: message || IDLE_STATUS.message, tone });
  }

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

    if (active && container.contains(active) && active.tagName === "INPUT") {
      const form = active.closest("form");
      if (form) {
        form.requestSubmit();
        return;
      }
    }

    if (active && container.contains(active) && active !== document.body) {
      active.click();
      return;
    }

    const form = container.querySelector("form");
    if (form) form.requestSubmit();
  }

  return (
    <DeviceStatusContext.Provider value={{ setStatus }}>
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
          {!booting && scrollState.up && (
            <button
              type="button"
              className="scroll-cue scroll-cue-up"
              onMouseDown={preventFocusSteal}
              onClick={() => scrollByArrow("up")}
              aria-label="Desplazar hacia arriba"
            >
              ▲
            </button>
          )}

          <div className="device-screen" ref={screenRef}>
            {booting ? <DeviceLoading /> : children}
          </div>

          {!booting && scrollState.down && (
            <button
              type="button"
              className="scroll-cue scroll-cue-down"
              onMouseDown={preventFocusSteal}
              onClick={() => scrollByArrow("down")}
              aria-label="Desplazar hacia abajo"
            >
              ▼
            </button>
          )}
        </div>

        <div className="device-controls">
          <DPad onMove={moveFocus} onEnter={activate} />
          <MiniScreen message={status.message} tone={status.tone} />
        </div>
      </div>
    </DeviceStatusContext.Provider>
  );
}

export default DeviceFrame;
