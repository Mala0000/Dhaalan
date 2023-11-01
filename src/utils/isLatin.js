export function isLatin(text) {
  // Regular expression that matches Latin letters, numbers, punctuation, and whitespace
  let regex = /^[A-Za-z0-9\s.,!?@:;'"-]*$/;
  return regex.test(text);
}
