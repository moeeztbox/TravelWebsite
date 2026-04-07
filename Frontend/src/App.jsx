import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import Chatbot from "./Components/Main/Chatbot";

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Use 'auto' for instant scroll
    });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/services" element={<Services />} />
        <Route path="/faq" element={<FAQ />} />
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
        <Route path="/booking" element={<Booking />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Chatbot />
      <Footer />
      {/* <Copyright /> */}
    </Router>
  );
}

export default App;
