import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { order: orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <p className="mb-4 text-lg font-semibold text-pink-600">ORDERS</p>

      <div className="flex flex-col gap-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border-2 border-gray-200 p-4 sm:p-5 md:p-6 rounded-xl text-xs sm:text-sm text-gray-700 shadow-sm"
          >
            {/* Icon */}
            <img className="w-12 h-12 object-contain" src={assets.parcel_icon} alt="" />

            {/* Address + Items */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap gap-1">
                {order.items.map((item, index) => (
                  <p key={index} className="py-0.5">
                    {item.name} × {item.quantity} <span>{item.size}</span>
                    {index < order.items.length - 1 && ','}
                  </p>
                ))}
              </div>

              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName + ' ' + order.address.lastName}
              </p>

              <div className="leading-snug text-gray-600">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{' '}
                  {order.address.country}, {order.address.zipcode}
                </p>
              </div>

              <p className="mt-1">{order.address.phone}</p>
            </div>

            {/* Order Details */}
            <div className="flex flex-col gap-1">
              <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Amount */}
            <p className="font-medium text-gray-800">{currency} {order.amount}</p>

            {/* Status Dropdown */}
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className="p-2 border rounded-md font-semibold bg-white text-gray-800 hover:ring-2 hover:ring-pink-500 transition-all"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
