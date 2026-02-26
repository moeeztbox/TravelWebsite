import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error.message);
      alert("Error: " + error.message);
    } else {
      console.log("PaymentMethod created:", paymentMethod);
      alert("Payment method created! Check console for test details.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-4 border rounded-md" />
      <button
        type="submit"
        disabled={!stripe}
        className="px-6 py-2 bg-yellow-500 text-black font-bold rounded"
      >
        Pay Now
      </button>
    </form>
  );
}
