export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const isStrongPassword = (password) => {
  // At least 8 characters, one uppercase, one lowercase, one digit
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return re.test(password);
};

export const isNonEmpty = (value) => {
  return value.trim().length > 0;
};

export const isPositiveNumber = (value) => {
  const num = Number(value);
  return !isNaN(num) && num > 0;
};