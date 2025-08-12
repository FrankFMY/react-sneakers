export function formatCurrency(value) {
  const number = Number(value) || 0;
  const formatted = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
  return `${formatted} руб.`;
}