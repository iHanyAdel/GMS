export const nameValidation = {
  pattern: /^[A-Za-z\s]*$/,
  message: 'Only English characters are allowed'
};

export function validateNameInput(value: string): boolean {
  return nameValidation.pattern.test(value);
}