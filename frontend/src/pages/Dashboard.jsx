import { useNavigate } from "react-router-dom";
import { Gamepad2, Layers, LogOut } from "lucide-react";
import DeviceFrame from "../components/DeviceFrame";
import { useAuth } from "../hooks/useAuth";

function AppIcon({ icon: Icon, label, onSelect }) {
  return (
    <button type="button" className="app-icon" onClick={onSelect}>
      <span className="app-icon-glyph">
        <Icon size={22} strokeWidth={1.75} />
      </span>
      <span className="app-icon-label">{label}</span>
    </button>
  );
}

function DashboardScreen() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <>
      <p className="auth-heading">Hola, {user.name}</p>
      <div className="app-grid">
        <AppIcon
          icon={Gamepad2}
          label="Jugar"
          onSelect={() => navigate("/play")}
        />
        <AppIcon
          icon={Layers}
          label="Mi colección"
          onSelect={() => navigate("/collection")}
        />
        <AppIcon icon={LogOut} label="Salir" onSelect={logout} />
      </div>
    </>
  );
}

function Dashboard() {
  return (
    <DeviceFrame title="BioCartas · Menú">
      <DashboardScreen />
    </DeviceFrame>
  );
}

export default Dashboard;
