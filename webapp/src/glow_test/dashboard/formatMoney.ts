interface FormatMoneyOptions {
  /** Leave out ".00" on whole amounts: -5000 -> "-$50". */
  trimZeroCents?: boolean;
}

/**
 * 36260 -> "$362.60". -5000 -> "-$50.00".
 * Prototype only: the real app formats money with the Money component and i18n.
 */
export default function formatMoney(
  cents: number,
  options: FormatMoneyOptions = {}
): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  const whole = abs % 100 === 0;
  const amount =
    options.trimZeroCents && whole ? String(abs / 100) : (abs / 100).toFixed(2);
  return `${sign}$${amount}`;
}
