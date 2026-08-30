function DeviceFrame({ title, children }) {
  return (
    <div className="device">
      <div className="device-top">
        <div className="device-rivets">
          <span className="rivet" />
          <span className="rivet" />
        </div>
        {title && <span className="device-label">{title}</span>}
      </div>
      <div className="device-screen">{children}</div>
      <div className="device-bottom">
        <span className="device-dial" />
        <span className="device-vents" />
      </div>
    </div>
  );
}

export default DeviceFrame;
