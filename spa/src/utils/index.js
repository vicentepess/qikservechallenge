export const BUY_X_GET_Y_FREE = (cart, i, sum, descSum) => {
  let qty = cart[i].count;
  let original_price =toUnsignedFloat(cart[i].data.price, 2)
  let free_qty = cart[i].data.promotions[0].free_qty;
  let required_qty = cart[i].data.promotions[0].required_qty + free_qty;

  if (qty >= required_qty) {
    descSum += ((qty - (qty % required_qty)) / required_qty) * original_price;
    sum +=
      qty * original_price -
      ((qty - (qty % required_qty)) / required_qty) * original_price;
  } else {
    sum = sum + qty * original_price;
  }

  return [sum, descSum];
};

export const QTY_BASED_PRICE_OVERRIDE = (cart, i, sum, descSum) => {
  let required_qty = cart[i].data.promotions[0].required_qty;
  let promotion_price = toUnsignedFloat(cart[i].data.promotions[0].price ,2);
  let qty = cart[i].count;
  let original_price =toUnsignedFloat(cart[i].data.price, 2)

  if (qty >= required_qty) {
    descSum +=
      qty * original_price -
      (((qty - (qty % required_qty)) / required_qty) * promotion_price +
        (qty % required_qty) * original_price);
    sum +=
      ((qty - (qty % required_qty)) / required_qty) * promotion_price +
      (qty % required_qty) * original_price;
  } else {
    sum = sum + qty * original_price;
  }
  return [sum, descSum];
};

export const FLAT_PERCENT = (cart, i, sum, descSum) => {
    let qty = cart[i].count
    let original_price =toUnsignedFloat(cart[i].data.price, 2)
    let flat_percent = cart[i].data.promotions[0].amount/100

    sum += (qty * original_price) * (1-flat_percent)
    descSum += (qty * original_price) * (flat_percent)

    return [sum, descSum];
}

export const toUnsignedFloat = (value, decimals) => (isNaN(value)) ? 0 : Math.abs(parseFloat(value).toFixed(decimals))