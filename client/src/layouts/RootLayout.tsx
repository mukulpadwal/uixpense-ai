import { useEffect } from "react";
import { Outlet } from "react-router";

function RootLayout() {
  useEffect(() => {
    async function healthCheck() {
      await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/health`);
    }

    healthCheck();
  }, [])

  return <Outlet />;
}

export default RootLayout;
