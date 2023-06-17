export function formatCurrency(
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
