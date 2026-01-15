import { Outlet } from "react-router";

function PublicLayout() {
  return (
    <main className="relative min-h-screen">
      <Outlet />
    </main>
  );
}

export default PublicLayout;
