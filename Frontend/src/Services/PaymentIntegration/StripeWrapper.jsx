import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51T4T03FbmxActEvanE1X8uKPg2xtaoM45lsoozwgeru2UZHL5hTQKBIJUPotBXC6ctJOKilgqpSFLZTcTvygbc0q00bUFOEFNt",
);

export default function StripeWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
