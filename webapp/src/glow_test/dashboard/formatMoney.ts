/** 36260 -> "$362.60". Prototype only: the real app has Money / i18n helpers. */
export default function formatMoney(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
