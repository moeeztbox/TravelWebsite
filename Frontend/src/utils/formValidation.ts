export function sanitizeDigits(value: unknown): string {
  return String(value ?? "").replace(/\D+/g, "");
}

export function validateName(name: unknown): string {
  const v = String(name ?? "").trim();
  if (v.length < 3) return "Name must be at least 3 characters.";
  return "";
}

export function validateEmail(email: unknown): string {
  const v = String(email ?? "").trim();
  if (!v.includes("@")) return 'Email must include "@".';
  return "";
}

export function validatePhoneDigits(phoneDigits: unknown): string {
  const digits = sanitizeDigits(phoneDigits);
  if (digits.length < 9) return "Number must be at least 9 digits.";
  if (digits.length > 15) return "Number must be at most 15 digits.";
  return "";
}

export interface CommonFieldsInput {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
}

export interface CommonFieldsErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export function validateCommonFields({
  name,
  email,
  phone,
}: CommonFieldsInput): CommonFieldsErrors {
  const errors: CommonFieldsErrors = {};
  const nameErr = validateName(name);
  if (nameErr) errors.name = nameErr;
  const emailErr = validateEmail(email);
  if (emailErr) errors.email = emailErr;
  const phoneErr = validatePhoneDigits(phone);
  if (phoneErr) errors.phone = phoneErr;
  return errors;
}
