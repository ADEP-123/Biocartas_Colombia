import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import GuestRoute from "./components/GuestRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Play = lazy(() => import("./pages/Play"));
const Collection = lazy(() => import("./pages/Collection"));

function LazyFallback() {
  return <p className="loading-text">Cargando...</p>;
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<LazyFallback />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/play"
            element={
              <Suspense fallback={<LazyFallback />}>
                <Play />
              </Suspense>
            }
          />
          <Route
            path="/collection"
            element={
              <Suspense fallback={<LazyFallback />}>
                <Collection />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
