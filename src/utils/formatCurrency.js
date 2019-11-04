function formatCurrency(arg) {
  return new Intl.NumberFormat('pl-PLN', {
    style: 'currency',
    currency: 'PLN'
  }).format(arg);
}
export default formatCurrency;
