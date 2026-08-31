function HomeDeviceMock() {
  return (
    <div className="mock-device">
      <div className="mock-device-antenna" />
      <div className="mock-device-bezel">
        <span className="mock-device-rivet" />
        <span className="mock-device-rivet" />
      </div>
      <div className="mock-device-screen">
        <div
          className="mock-card"
          style={{ borderColor: "var(--rarity-raro)" }}
        >
          <div className="mock-card-image" />
          <div className="mock-card-name">Cóndor andino</div>
          <div
            className="mock-card-rarity"
            style={{ color: "var(--rarity-raro)" }}
          >
            Raro
          </div>
        </div>
      </div>
      <div className="mock-device-controls">
        <div className="mock-dpad" />
        <div className="mock-mini-screen" />
      </div>
    </div>
  );
}

export default HomeDeviceMock;
