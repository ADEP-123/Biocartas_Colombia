import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Collection from "./pages/Collection";
import Play from "./pages/Play";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/collection" element={<Collection />} />
          <Route path="/play" element={<Play />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
