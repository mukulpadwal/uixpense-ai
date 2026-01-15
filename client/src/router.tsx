import { createBrowserRouter, type RouteObject } from "react-router";
import { ProtectedLayout, PublicLayout, RootLayout } from "./layouts";
import { ChatPage, HomePage } from "./pages";

const protectedRoutes: RouteObject = {
  path: "",
  element: <ProtectedLayout />,
  children: [],
};

const publicRoutes: RouteObject = {
  path: "",
  element: <PublicLayout />,
  children: [
    {
      path: "",
      index: true,
      element: <HomePage />,
    },
    {
      path: "/chat",
      element: <ChatPage />,
    },
  ],
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [protectedRoutes, publicRoutes],
  },
]);
