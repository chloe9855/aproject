// @ts-check

/**
 * @param {string} password
 * @returns {string}
 */
export function validatePassword (password) {
  if (
    !/[A-Za-z]/.test(password) ||
    !/[0-9]/.test(password) ||
    password.length < 8 ||
    password.length > 30
  ) {
    return '密碼格式不符';
  }
}
