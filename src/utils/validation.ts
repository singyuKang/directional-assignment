const FORBIDDEN_WORDS = ["캄보디아", "프놈펜", "불법체류", "텔레그램"];

export const containsForbiddenWords = (text: string): boolean => {
  return FORBIDDEN_WORDS.some((word) => text.includes(word));
};

export const getForbiddenWord = (text: string): string | null => {
  const found = FORBIDDEN_WORDS.find((word) => text.includes(word));
  return found || null;
};
