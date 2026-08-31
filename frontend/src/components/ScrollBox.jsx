import { useEffect, useRef, useState } from "react";

function ScrollBox({ children, maxHeight = 160 }) {
  const scrollRef = useRef(null);
  const [scrollState, setScrollState] = useState({ up: false, down: false });

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setScrollState({
      up: el.scrollTop > 4,
      down: el.scrollTop + el.clientHeight < el.scrollHeight - 4,
    });
  }

  useEffect(() => {
    updateScrollState();
  });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  function scrollByArrow(direction) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ top: direction === "down" ? 70 : -70, behavior: "smooth" });
  }

  return (
    <div className="scroll-box">
      {scrollState.up && (
        <button
          type="button"
          className="scroll-cue scroll-cue-up scroll-cue-inner"
          onMouseDown={e => e.preventDefault()}
          onClick={() => scrollByArrow("up")}
          aria-label="Desplazar hacia arriba"
        >
          ▲
        </button>
      )}
      <div className="scroll-box-inner" style={{ maxHeight }} ref={scrollRef}>
        {children}
      </div>
      {scrollState.down && (
        <button
          type="button"
          className="scroll-cue scroll-cue-down scroll-cue-inner"
          onMouseDown={e => e.preventDefault()}
          onClick={() => scrollByArrow("down")}
          aria-label="Desplazar hacia abajo"
        >
          ▼
        </button>
      )}
    </div>
  );
}

export default ScrollBox;
