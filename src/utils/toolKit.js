const formatMoney = (amount) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount).replace("$", "");
};

const formatAddress = (text) => {
  return `${text.substring(0, 8)}...${text.substring(text.length - 6)}`;
};

export { formatMoney, formatAddress };
