export function sanitizeDigits(value) {
  return String(value ?? "").replace(/\D+/g, "");
}

export function validateName(name) {
  const v = String(name ?? "").trim();
  if (v.length < 3) return "Name must be at least 3 characters.";
  return "";
}

export function validateEmail(email) {
  const v = String(email ?? "").trim();
  if (!v.includes("@")) return 'Email must include "@".';
  return "";
}

export function validatePhoneDigits(phoneDigits) {
  const digits = sanitizeDigits(phoneDigits);
  if (digits.length < 9) return "Number must be at least 9 digits.";
  if (digits.length > 15) return "Number must be at most 15 digits.";
  return "";
}

export function validateCommonFields({ name, email, phone }) {
  const errors = {};
  const nameErr = validateName(name);
  if (nameErr) errors.name = nameErr;
  const emailErr = validateEmail(email);
  if (emailErr) errors.email = emailErr;
  const phoneErr = validatePhoneDigits(phone);
  if (phoneErr) errors.phone = phoneErr;
  return errors;
}
