import { Outlet, Route, Routes } from "react-router-dom";
import { AppShell } from "./shell/app-shell";

export function Router() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <AppShell>
            <Outlet />
          </AppShell>
        }
      />
    </Routes>
  );
}
