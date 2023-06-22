/**
 * Formats the currency value based on the base currency.
 * @param {number} value - The currency value to format.
 * @returns {string} The formatted currency value.
 */
export function getFormattedCurrency(
  currency,
  value,
  maximumFractionDigits = 0,
  minimumFractionDigits = 0
) {
  const formattedCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits
  }).format(value)
  return formattedCurrency
}
