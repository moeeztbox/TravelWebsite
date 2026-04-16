import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { AuthProvider } from "./Context/AuthContext";
import RequireAuth from "./components/RequireAuth";
import RequireAdmin from "./Components/RequireAdmin";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Packages from "./Pages/Packages";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Navbar from "./Components/Main/Navbar";
import Footer from "./Components/Main/Footer";
import FAQ from "./Pages/FAQ";
import Policies from "./Pages/Policies";
import Services from "./Pages/Services";
import NotFound from "./Pages/NotFound";
import Guide from "./Pages/Guide";
import UmrahPage from "./Components/Guide/UmrahPage";
import TravelPage from "./Components/Guide/TravelPage";
import ZiyaratPage from "./Components/Guide/ZiyaratPage";
import ComingSoon from "./Pages/ComingSoon";
import Booking from "./Pages/Booking";
import UserDashboard from "./Pages/UserDashboard";
import AdminPackages from "./Pages/AdminPackages";
import AdminBookings from "./Pages/AdminBookings";
import AdminUserStatuses from "./Pages/AdminUserStatuses";
import AdminStories from "./Pages/AdminStories";
import AdminCustomPackages from "./Pages/AdminCustomPackages";
import AdminTransportation from "./Pages/AdminTransportation";
import AdminVisaRequests from "./Pages/AdminVisaRequests";
import AdminServiceOptions from "./Pages/AdminServiceOptions";
import AdminHotelBookings from "./Pages/AdminHotelBookings";
import Stories from "./Pages/Stories";
import SubmitStory from "./Pages/SubmitStory";
import { forceReleaseScrollLock } from "./Hooks/useScrollLock";

function AppRoutes() {
  const location = useLocation();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const done = () => setInitialLoading(false);
    if (document.readyState === "complete") done();
    else window.addEventListener("load", done);
    return () => window.removeEventListener("load", done);
  }, []);

  useEffect(() => {
    // Safety net: if any modal left the scroll locked, force-release on navigation.
    forceReleaseScrollLock();
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    // Keep navigation natural but always land at the top of the new page.
    // If there's a hash, scroll to that section instead.
    if (location.hash) {
      const id = location.hash.replace(/^#/, "");
      const el = id ? document.getElementById(id) : null;
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  return (
    <>
      {initialLoading ? (
        <div className="fixed inset-0 z-[100000] bg-black/35 backdrop-blur-md flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-md border border-white/40 rounded-2xl px-6 py-5 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full border-4 border-[#C9A227]/30 border-t-[#C9A227] animate-spin" />
              <div className="text-sm font-semibold text-gray-800">Loading…</div>
            </div>
          </div>
        </div>
      ) : null}
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/services" element={<Services />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/stories" element={<Stories />} />
          <Route
            path="/stories/submit"
            element={
              <RequireAuth redirectTo="/login">
                <SubmitStory />
              </RequireAuth>
            }
          />
          <Route path="/guidance" element={<Guide />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/umrah-guide" element={<UmrahPage />} />
          <Route path="/travel-guide" element={<TravelPage />} />
          <Route path="/ziyarat-guide" element={<ZiyaratPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth redirectTo="/login">
                <UserDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/booking"
            element={<Booking />}
          />
          <Route
            path="/admin/packages"
            element={
              <RequireAdmin>
                <AdminPackages />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/service-options"
            element={
              <RequireAdmin>
                <AdminServiceOptions />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <RequireAdmin>
                <AdminBookings />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/hotel-bookings"
            element={
              <RequireAdmin>
                <AdminHotelBookings />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/transportation"
            element={
              <RequireAdmin>
                <AdminTransportation />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/visa-requests"
            element={
              <RequireAdmin>
                <AdminVisaRequests />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/custom-packages"
            element={
              <RequireAdmin>
                <AdminCustomPackages />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/user-statuses"
            element={
              <RequireAdmin>
                <AdminUserStatuses />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/stories"
            element={
              <RequireAdmin>
                <AdminStories />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin"
            element={<Navigate to="/admin/packages" replace />}
          />
          <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
