import { useState, useEffect } from "react";

// Returns a "slow copy" of `value` that only updates once `value`
// has stopped changing for `delay` milliseconds.
//
// Usage:  const debouncedTerm = useDebounce(term, 300);
//   term           -> updates on every keystroke (for the input)
//   debouncedTerm  -> updates after a 300ms pause (for the network)
export function useDebounce(value, delay = 300) {
  // The delayed copy. Starts equal to the initial value.
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    // SETUP: schedule the copy to catch up with `value` after `delay` ms.
    const id = setTimeout(() => setDebounced(value), delay);

    // CLEANUP: if `value` changes again before the timer fires, React runs
    // this first, cancelling the old timer. Then the effect runs again with
    // a fresh timer. That cancel-and-restart IS the debounce.
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
