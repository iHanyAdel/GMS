// Validation for GMS ID (5 digits after EGY-)
export function validateGmsId(value: string): boolean {
  return /^\d{0,5}$/.test(value);
}

// Validation for National ID (14 digits starting with 2 or 3)
export function validateNationalId(value: string): boolean {
  if (!value) return true; // Allow empty for initial state
  if (!/^[23]/.test(value)) return false; // Must start with 2 or 3
  return /^[23]\d{0,13}$/.test(value); // Allow partial input up to 14 digits
}

export function formatNationalId(value: string): string {
  // Remove any non-digit characters
  const digits = value.replace(/\D/g, '');
  // Take only first 14 digits
  return digits.slice(0, 14);
}