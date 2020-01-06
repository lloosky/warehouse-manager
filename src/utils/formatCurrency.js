function formatCurrency(arg) {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN'
  }).format(arg);
}
export default formatCurrency;
