import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Home,
  ClipboardList,
  PackagePlus,
  Users,
  BookOpen,
  Menu,
  Bus,
  FileText,
  Layers,
  Hotel,
} from "lucide-react";
import { useState } from "react";

function sidebarLinkClass(active) {
  return [
    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium border transition-colors",
    active
      ? "bg-amber-50 text-amber-900 border-amber-200 shadow-sm"
      : "text-zinc-700 hover:bg-amber-50/60 border border-transparent hover:border-amber-100",
  ].join(" ");
}

export default function AdminLayout({ title, subtitle, children, headerRight }) {
  const location = useLocation();
  const path = location.pathname;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  const nav = [
    { to: "/admin/packages", label: "Packages", icon: LayoutGrid },
    {
      to: "/admin/service-options",
      label: "Transport & visa options",
      icon: Layers,
    },
    { to: "/admin/bookings", label: "Bookings", icon: ClipboardList },
    { to: "/admin/hotel-bookings", label: "Hotel bookings", icon: Hotel },
    { to: "/admin/transportation", label: "Transportation Bookings", icon: Bus },
    { to: "/admin/visa-requests", label: "Visa requests", icon: FileText },
    { to: "/admin/custom-packages", label: "Custom Packages", icon: PackagePlus },
    { to: "/admin/stories", label: "Stories", icon: BookOpen },
    { to: "/admin/user-statuses", label: "User Statuses", icon: Users },
  ];

  return (
    <div className="min-h-screen box-border pt-16 lg:pt-20 flex bg-gradient-to-b from-amber-50/40 via-stone-50 to-stone-100">
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed left-3 z-[225] top-[4.75rem] inline-flex h-10 w-10 items-center justify-center rounded-full border border-amber-200/80 bg-white text-amber-800 shadow-md hover:bg-amber-50"
        aria-label="Open admin menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {sidebarOpen ? (
        <button
          type="button"
          className="fixed top-16 left-0 right-0 bottom-0 z-30 bg-black/40 lg:hidden"
          onClick={closeSidebar}
          aria-label="Close sidebar overlay"
        />
      ) : null}

      <aside
        className={[
          "w-64 shrink-0 bg-white/95 backdrop-blur-sm border-r border-amber-200/60 flex flex-col shadow-md shadow-amber-900/5",
          "fixed left-0 bottom-0 top-16 z-[220] lg:static lg:z-auto lg:top-auto lg:bottom-auto lg:left-auto lg:min-h-[calc(100vh-5rem)] lg:translate-x-0",
          "transition-transform duration-200 ease-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <nav className="flex-1 p-3 pt-4 space-y-1">
          {nav.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={sidebarLinkClass(path === to)}
              onClick={closeSidebar}
            >
              <Icon className="h-5 w-5 shrink-0 text-amber-600/90" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-amber-100">
          <Link
            to="/"
            className="flex items-center justify-center lg:justify-start rounded-xl p-2 text-amber-800 hover:bg-amber-50/80 transition-colors"
            title="View public site"
            onClick={closeSidebar}
          >
            <Home className="h-5 w-5 shrink-0" aria-hidden />
            <span className="sr-only">View public site</span>
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <main
          id="admin-scroll-container"
          className="flex-1 px-4 py-4 sm:px-6 sm:py-6 pl-14 lg:pl-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
                  {title}
                </h1>
                {subtitle ? (
                  <p className="text-sm text-zinc-600 mt-1">{subtitle}</p>
                ) : null}
              </div>
              {headerRight}
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
