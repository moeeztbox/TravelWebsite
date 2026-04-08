import { Link, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  ClipboardList,
  Users,
  BookOpen,
  Menu,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout({ title, subtitle, children, headerRight }) {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    signOut();
    navigate("/login", { replace: true });
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-[#f4f5f7] flex">
      {sidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-[210] bg-black/40 lg:hidden"
          onClick={closeSidebar}
          aria-label="Close sidebar overlay"
        />
      ) : null}

      <aside
        className={[
          "w-64 shrink-0 bg-white border-r border-zinc-200/80 flex flex-col shadow-sm",
          "fixed inset-y-0 left-0 z-[220] lg:static lg:translate-x-0",
          "transition-transform duration-200 ease-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <div className="p-6 border-b border-zinc-100">
          <Link
            to="/admin/packages"
            className="flex items-center gap-2"
            onClick={closeSidebar}
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500 text-white font-bold text-sm">
              T
            </span>
            <span className="font-semibold text-zinc-900 tracking-tight">
              Travel Admin
            </span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          <Link
            to="/admin/packages"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium bg-rose-50 text-rose-700 border border-rose-100"
            onClick={closeSidebar}
          >
            <LayoutGrid className="h-5 w-5 shrink-0" />
            Packages
          </Link>
          <Link
            to="/admin/bookings"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 border border-transparent hover:border-zinc-200"
            onClick={closeSidebar}
          >
            <ClipboardList className="h-5 w-5 shrink-0 text-zinc-500" />
            Bookings
          </Link>
          <Link
            to="/admin/stories"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 border border-transparent hover:border-zinc-200"
            onClick={closeSidebar}
          >
            <BookOpen className="h-5 w-5 shrink-0 text-zinc-500" />
            Stories
          </Link>
          <Link
            to="/admin/user-statuses"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 border border-transparent hover:border-zinc-200"
            onClick={closeSidebar}
          >
            <Users className="h-5 w-5 shrink-0 text-zinc-500" />
            User Statuses
          </Link>
        </nav>
        <div className="p-4 border-t border-zinc-100 text-xs text-zinc-400">
          Signed in as admin
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-zinc-200/80 flex items-center gap-4 px-4 sm:px-6 shrink-0">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl text-zinc-600 hover:bg-zinc-100"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-50 border border-zinc-200/80 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-300"
              readOnly
              aria-label="Search (placeholder)"
            />
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button
              type="button"
              className="p-2 rounded-xl text-zinc-500 hover:bg-zinc-100"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </button>
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 rounded-xl pl-1 pr-2 py-1 hover:bg-zinc-100"
              >
                <span className="h-9 w-9 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center text-white text-sm font-medium">
                  A
                </span>
                <span className="text-sm font-medium text-zinc-800 hidden sm:inline">
                  Admin
                </span>
                <ChevronDown className="h-4 w-4 text-zinc-400" />
              </button>
              {menuOpen ? (
                <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white border border-zinc-200 shadow-lg py-1 z-50">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">
                  {title}
                </h1>
                {subtitle ? (
                  <p className="text-sm text-zinc-500 mt-1">{subtitle}</p>
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
