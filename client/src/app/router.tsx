import SourceListPage from "@/source-list/source-list.page";
import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "./shell/app-shell";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <SourceListPage />,
      },
    ],
  },
]);
