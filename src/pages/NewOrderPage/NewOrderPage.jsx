import './NewOrderPage.css';
import { useEffect } from 'react';
import * as ordersAPI from '../../utilities/orders-api';
import CartDetail from '../../components/CartDetail/CartDetail';

export default function NewOrderPage({ cart, setCart, handleCheckout }) {

  useEffect(function() {
    async function getCart() {
      const cart = await ordersAPI.getCart();
      setCart(cart);
    }
    getCart();
   }, []);

  async function handleRemoveQty(productId, newQty) {
    const updatedCart = await ordersAPI.setProductQtyInCart(productId, newQty);
    setCart(updatedCart)
  }

  return (
    <main className="NewOrderPage">
      <CartDetail order={cart} handleRemoveQty={handleRemoveQty} handleCheckout={handleCheckout} />
    </main>
  );
}