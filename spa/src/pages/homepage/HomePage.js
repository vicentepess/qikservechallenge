import axios from "axios";
import React, { useEffect, useState } from "react";
import { ItemCheckout } from "../../components/itemCheckout/ItemCard";
import { ItemCard } from "../../components/itemsCard/ItemCard";
import {
  BUY_X_GET_Y_FREE,
  toUnsignedFloat,
  FLAT_PERCENT,
  QTY_BASED_PRICE_OVERRIDE,
} from "../../utils";
import "./style.css";

export const HomePage = () => {
  const [itensList, setItensList] = useState([]);
  const [cart, setCart] = useState([]);
  const [rawTotal, setRawTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [descount, setDescount] = useState(0);

  useEffect(() => {
    axios
      .get("/products")
      .then((res) => {
        setItensList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCheckout = () => {
    let sum = 0;
    let descSum = 0;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].data.promotions.length === 0) {
        sum += (cart[i].data.price) * cart[i].count;
      } else {
        if (cart[i].data.promotions[0].type === "BUY_X_GET_Y_FREE") {
          [sum, descSum] = BUY_X_GET_Y_FREE(cart, i, sum, descSum);
        } else if (cart[i].data.promotions[0].type === "QTY_BASED_PRICE_OVERRIDE") {
          [sum, descSum] = QTY_BASED_PRICE_OVERRIDE(cart, i, sum, descSum);
        } else if (cart[i].data.promotions[0].type === "FLAT_PERCENT") {
          [sum, descSum] = FLAT_PERCENT(cart, i, sum, descSum);
        }
      }
    }
    setTotal(toUnsignedFloat(sum / 100, 2));
    setDescount(toUnsignedFloat(descSum / 100, 2));
    setRawTotal(toUnsignedFloat((sum + descSum) / 100, 2));
  };

  useEffect(() => {
    handleCheckout()
  }, [cart])

  return (
    <div className="home-container">
      <h1>Qikserve home challenge</h1>
      <br />
      {itensList.length === 0
        ? "no itens found"
        : itensList.map((item, index) => (
            <ItemCard
              item={item}
              key={item.id}
              index={index}
              cart={cart}
              setCart={setCart}
            />
          ))}
      <br />
      <h1>Cart</h1>
      <br />
      {cart.length === 0
        ? <h3> no items into cart</h3>
        : cart.map((item, index) => (
            <ItemCheckout
              item={item}
              key={item.id}
              index={index}
              cart={cart}
              setCart={setCart}
            />
          ))}

      <br />
      <h1>Checkout</h1>
      <br />
      <h3>Raw total: £{rawTotal.toFixed(2)}</h3>
      <h3>Descount: £{descount.toFixed(2)}</h3>
      <h3>Total: £{total.toFixed(2)}</h3>
      <br />
    </div>
  );
};
