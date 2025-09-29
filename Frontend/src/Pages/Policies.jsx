import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PolicyHeroSection from "../Components/Policies/PolicyHeroSection";
import BookingPolicy from "../Components/Policies/BookingPolicy";
import CancellationPolicy from "../Components/Policies/CancellationPolicy";
import Disclaimer from "../Components/Policies/Disclaimer";
import PrivacyPolicy from "../Components/Policies/PrivacyPolicy";
import RefundPolicy from "../Components/Policies/RefundPolicy";
import TermsAndConditions from "../Components/Policies/TermsAndConditions";
import PaymentPolicy from "../Components/Policies/PaymentPolicy";
import UserResponsibilities from "../Components/Policies/UserResponsibilities";

function Policies() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const section = document.querySelector(location.hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div>
      <PolicyHeroSection />
      <div id="booking">
        <BookingPolicy />
      </div>
      <div id="cancellation">
        <CancellationPolicy />
      </div>
      <div id="disclaimer">
        <Disclaimer />
      </div>
      <div id="privacy">
        <PrivacyPolicy />
      </div>
      <div id="refund">
        <RefundPolicy />
      </div>
      <div id="terms">
        <TermsAndConditions />
      </div>
      <div id="payment">
        <PaymentPolicy />
      </div>
      <div id="responsibilities">
        <UserResponsibilities />
      </div>
    </div>
  );
}

export default Policies;
