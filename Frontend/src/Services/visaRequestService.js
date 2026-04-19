import { api } from "./authService";

export async function getVisaOptions() {
  const { data } = await api.get("/visa/options");
  return data.options ?? [];
}

export async function createVisaRequestApi(payload) {
  const { data } = await api.post("/visa/requests", payload);
  return data.visaRequest;
}

export async function listMyVisaRequests() {
  const { data } = await api.get("/visa/requests/me");
  return data.visaRequests ?? [];
}

export async function setVisaPaymentMethod(requestId, method) {
  const { data } = await api.patch(`/visa/requests/${requestId}/payment-method`, {
    method,
  });
  return data.visaRequest;
}

export async function uploadVisaPaymentReceipt(requestId, formData) {
  const { data } = await api.post(
    `/visa/requests/${requestId}/payment-receipt`,
    formData
  );
  return data.visaRequest;
}

export async function dismissVisaRequest(requestId) {
  const { data } = await api.delete(`/visa/requests/${requestId}`);
  return data;
}

export async function createVisaStripePaymentIntent(requestId) {
  const { data } = await api.post(
    `/visa/requests/${requestId}/stripe/payment-intent`
  );
  return data;
}

export async function confirmVisaStripePayment(requestId, paymentIntentId) {
  const { data } = await api.post(`/visa/requests/${requestId}/stripe/confirm`, {
    paymentIntentId,
  });
  return data;
}
