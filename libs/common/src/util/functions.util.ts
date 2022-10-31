export const addOrSubtract = (a, b, type: '+' | '-'): number =>
  type === '+' ? a + b : a - b;
