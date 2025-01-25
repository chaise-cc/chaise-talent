const formatCurrency = (currency: string = "NGN", number: number) =>
  new Intl.NumberFormat(currency == "NGN" ? "en-NG" : "en-US", {
    style: "currency",
    currency: currency,
  }).format(number);

export default formatCurrency;
