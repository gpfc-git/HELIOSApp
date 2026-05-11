import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export function Layout() {
  return (
    <div className="min-h-dvh flex flex-col bg-bg">
      <Navbar />
      <main className="flex-1 max-w-container-max w-full mx-auto px-section-padding py-8">
        <Outlet />
      </main>
    </div>
  );
}
