export interface NewsletterStatusResponse {
  email: string;
  subscribed: boolean;
}

export interface NewsletterSubscribeResponse {
  email: string;
  subscribed: true;
  alreadySubscribed: boolean;
}

export interface NewsletterUnsubscribeResponse {
  email: string;
  subscribed: false;
  alreadyUnsubscribed: boolean;
}
