import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "./shell/app-shell";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <div>Source List</div>,
      },
    ],
  },
]);
