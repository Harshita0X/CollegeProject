/**
 * Formats a date string to a human-readable format (Indina locale)
 * @param {string} dateStr 
 * @returns {string}
 */
export const formatDateLong = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

/**
 * Generates a random reference ID for bookings
 * @returns {string}
 */
export const generateReferenceId = () => {
  return "MAIT-" + Math.random().toString(36).substr(2, 6).toUpperCase();
};
