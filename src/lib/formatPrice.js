// ============================================================
// TODO #1 (warm-up, plain JS): format a price in denars
// ============================================================
// Goal:   formatPrice(98211)  ->  "98.211 ден."
//
// Hints:
//  - JS has a built-in formatter, no library needed: Intl.NumberFormat
//    new Intl.NumberFormat("mk-MK").format(98211)  gives  "98.211"
//  - Creating a formatter is relatively expensive. Create it ONCE outside
//    the function (module scope) and reuse it inside.
//  - Then just append " ден." (template literal: `${...} ден.`)
//  - Bonus: what should happen if price is 0, null or undefined?
//    The current site shows "0 ден." which looks broken. Return
//    "Цена на упит" (price on request) instead.
//

const intl = new Intl.NumberFormat("mk-MK")

// The placeholder below works but prints "98211 ден." with no dot separator.
export function formatPrice(price) {
  if (!price) {
    return "Цената во моментот е недостапна"
  }
  return `${intl.format(price)} ден.`;
}
