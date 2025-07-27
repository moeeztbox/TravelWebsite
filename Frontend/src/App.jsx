import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Booking from "./Pages/Booking";
import Packages from "./Pages/Packages";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Copyright from "./Components/Main/CopyRight";
import Navbar from "./Components/Main/Navbar";
import Footer from "./Components/Main/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/packages" element={<Packages />} />
      </Routes>
      <Footer />
      <Copyright />
    </Router>
  );
}

export default App;
