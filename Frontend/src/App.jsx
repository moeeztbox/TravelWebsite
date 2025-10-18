import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Offers from "./Pages/Offers";
import Packages from "./Pages/Packages";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Copyright from "./Components/Main/CopyRight";
// import Navbar from "./Components/Main/Navbar";
// import Navbar from "./Components/Main/Navbar - Copy";
import Navbar from "./Components/Main/Navbar";
import Footer from "./Components/Main/Footer";
import FAQ from "./Pages/FAQ";
import Policies from "./Pages/Policies";
import Services from "./Pages/Services";
import NotFound from "./Pages/NotFound";

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
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/services" element={<Services />} />
        <Route path="/notfound" element={<NotFound />} />
      </Routes>
      <Footer />
      {/* <Copyright /> */}
    </Router>
  );
}

export default App;
