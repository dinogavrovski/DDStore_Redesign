// Macedonian Cyrillic -> Latin. People type "лаптоп", "laptop" and "laptpo".
// If we convert everything (products AND the query) to the same Latin form,
// Fuse only has to deal with typos, not with two alphabets.
const CYR_TO_LAT = {
  а: "a", б: "b", в: "v", г: "g", д: "d", ѓ: "gj", е: "e", ж: "zh", з: "z",
  ѕ: "dz", и: "i", ј: "j", к: "k", л: "l", љ: "lj", м: "m", н: "n", њ: "nj",
  о: "o", п: "p", р: "r", с: "s", т: "t", ќ: "kj", у: "u", ф: "f", х: "h",
  ц: "c", ч: "ch", џ: "dz", ш: "sh",
};

export function normalize(text) {
  return text
    .toLowerCase()
    .split("")
    .map((ch) => CYR_TO_LAT[ch] ?? ch)
    .join("")
    .trim();
}
