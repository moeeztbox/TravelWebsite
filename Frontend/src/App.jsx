import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./components/RequireAuth";
import RequireAdmin from "./Components/RequireAdmin";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Packages from "./Pages/Packages";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
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
import Stories from "./Pages/Stories";
import SubmitStory from "./Pages/SubmitStory";

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return null;
};

function AppRoutes() {
  const location = useLocation();
  const hideMainChrome = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideMainChrome ? <Navbar /> : null}
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
          element={
            <RequireAuth redirectTo="/register">
              <Booking />
            </RequireAuth>
          }
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
          path="/admin/bookings"
          element={
            <RequireAdmin>
              <AdminBookings />
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
      {!hideMainChrome ? <Footer /> : null}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
