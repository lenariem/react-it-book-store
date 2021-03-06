import React, { useEffect, useContext } from "react";
import { ShopContext } from "../../context/context";
import "./Cart.css";

export default function Cart() {
  const { order, toggleCartDisplay } = useContext(ShopContext);

  const quantity = order.length;

  //close cart on esc press
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        toggleCartDisplay();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [toggleCartDisplay]);

  return (
    <div
      className="cart white-text deep-purple darken-2"
      onClick={toggleCartDisplay}
      title="show your order"
    >
      <i className="material-icons">shopping_cart</i>
      {quantity ? <span className="cart-quantity">{quantity}</span> : null}
    </div>
  );
}
