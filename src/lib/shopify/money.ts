export function formatEUR(amount: string | number) {
  const v = typeof amount === "string" ? Number(amount) : amount;
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(v);
}