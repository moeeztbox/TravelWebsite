import { api } from "./authService";
import type {
  NewsletterStatusResponse,
  NewsletterSubscribeResponse,
  NewsletterUnsubscribeResponse,
} from "../types/newsletter";

export async function newsletterStatus(
  email: string,
): Promise<NewsletterStatusResponse> {
  const { data } = await api.get<NewsletterStatusResponse>(
    "/newsletter/status",
    { params: { email } },
  );
  return data;
}

export async function subscribeNewsletter(
  email: string,
): Promise<NewsletterSubscribeResponse> {
  const { data } = await api.post<NewsletterSubscribeResponse>(
    "/newsletter/subscribe",
    { email },
  );
  return data;
}

export async function unsubscribeNewsletter(
  email: string,
): Promise<NewsletterUnsubscribeResponse> {
  const { data } = await api.post<NewsletterUnsubscribeResponse>(
    "/newsletter/unsubscribe",
    { email },
  );
  return data;
}
