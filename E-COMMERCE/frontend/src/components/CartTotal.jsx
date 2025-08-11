import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const cartAmount = getCartAmount();
  const total = cartAmount === 0 ? 0 : cartAmount + delivery_fee;

  return (
    <div className="w-full">
      <div className="text-2xl mb-4">
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className="flex flex-col gap-3 text-sm text-gray-800">
        {/* Subtotal */}
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{currency}{cartAmount}.00</span>
        </div>
        <hr className="border-gray-200" />

        {/* Shipping Fee */}
        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span>{currency}{delivery_fee}.00</span>
        </div>
        <hr className="border-gray-200" />

        {/* Total */}
        <div className="flex justify-between font-semibold text-base mt-1">
          <span>Total</span>
          <span>{currency}{total}.00</span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
