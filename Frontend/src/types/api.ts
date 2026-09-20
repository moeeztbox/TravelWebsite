/** Generic `{ message: string }` response shared by several mutation endpoints. */
export interface ApiMessageResponse {
  message: string;
}

/** Shape of an Axios error's `response.data` when the Backend sends JSON. */
export interface ApiErrorPayload {
  message?: string;
  errors?: { msg: string }[];
}
