import { useCallback, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  createTransportStripePaymentIntent,
  confirmTransportStripePayment,
} from "../transportationService";
import {
  createVisaStripePaymentIntent,
  confirmVisaStripePayment,
} from "../visaRequestService";

const pk = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY?.trim();
const stripePromise = pk ? loadStripe(pk) : null;

function StripePayForm({ onConfirm, onPaid, onFatal }) {
  const stripe = useStripe();
  const elements = useElements();
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setBusy(true);
    setLocalError("");
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: `${window.location.origin}/dashboard`,
      },
    });
    if (error) {
      setLocalError(error.message || "Payment failed");
      setBusy(false);
      return;
    }
    if (paymentIntent?.status === "succeeded") {
      try {
        await onConfirm(paymentIntent.id);
        onPaid();
      } catch (err) {
        onFatal(err);
      }
    }
    setBusy(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {localError ? (
        <p className="text-sm text-red-600" role="alert">
          {localError}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={!stripe || busy}
        className="inline-flex items-center justify-center w-full sm:w-auto bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-800 disabled:opacity-60"
      >
        {busy ? "Processing…" : "Pay securely"}
      </button>
    </form>
  );
}

/** kind: `transport` (PKR) or `visa` (USD) — totals come from the server record. */
export default function MiscStripeCheckout({ kind, recordId, onPaid, onError }) {
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const confirmPayment = useCallback(
    async (paymentIntentId) => {
      if (kind === "transport") {
        await confirmTransportStripePayment(recordId, paymentIntentId);
      } else {
        await confirmVisaStripePayment(recordId, paymentIntentId);
      }
    },
    [kind, recordId]
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setLoadError("");
      try {
        const data =
          kind === "transport"
            ? await createTransportStripePaymentIntent(recordId)
            : await createVisaStripePaymentIntent(recordId);
        const cs = data?.clientSecret;
        if (!cancelled && cs) setClientSecret(cs);
        else if (!cancelled) setLoadError("Could not start payment session.");
      } catch (e) {
        if (!cancelled) {
          setLoadError(
            e.response?.data?.message || "Could not start Stripe checkout."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [kind, recordId]);

  if (!pk || !stripePromise) {
    return (
      <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
        Online card payment is not configured. Add{" "}
        <code className="font-mono text-[11px]">VITE_STRIPE_PUBLISHABLE_KEY</code>{" "}
        to the frontend <code className="font-mono text-[11px]">.env</code> and{" "}
        <code className="font-mono text-[11px]">STRIPE_SECRET_KEY</code> on the
        server.
      </p>
    );
  }

  if (loading) {
    return (
      <p className="text-sm text-stone-600 py-2">Preparing secure checkout…</p>
    );
  }

  if (loadError) {
    return (
      <p className="text-sm text-red-600" role="alert">
        {loadError}
      </p>
    );
  }

  if (!clientSecret) return null;

  return (
    <div className="rounded-xl border border-stone-200 bg-white px-3 py-4 sm:px-4">
      <p className="text-xs font-medium text-stone-800 mb-3">
        Pay with card (Stripe)
      </p>
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: { theme: "stripe" },
        }}
      >
        <StripePayForm
          onConfirm={confirmPayment}
          onPaid={onPaid}
          onFatal={(err) =>
            onError?.(
              err?.response?.data?.message ||
                err?.message ||
                "Confirmation failed"
            )
          }
        />
      </Elements>
    </div>
  );
}
