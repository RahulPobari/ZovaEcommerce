import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, {
        headers: { token },
      });

      if (response.data.success) {
        const allOrdersItem = [];
        response.data.orders.forEach(order => {
          order.items.forEach(item => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date
            });
          });
        });

        setOrderData(allOrdersItem.reverse());
      } else {
        toast.error(response.data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Something went wrong');
    }
  };


  useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    
  useEffect(() => {
    loadOrderData();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-500 text-green-700';
      case 'Shipped': return 'bg-blue-500 text-blue-700';
      case 'Out For Delivery': return 'bg-yellow-400 text-yellow-800';
      case 'Packing': return 'bg-purple-500 text-purple-700';
      case 'Order Placed': return 'bg-gray-400 text-gray-700';
      default: return 'bg-gray-300 text-gray-600';
    }
  };

  return (
    <div className='border-t pt-16 px-4 sm:px-10'>
      <div className='text-2xl mb-6'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div className='flex flex-col gap-6'>
        {orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div
              key={index}
              className='border border-gray-200 rounded-xl p-5 bg-white/60 backdrop-blur-md shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-6 transition-all duration-300 hover:shadow-lg'
            >
              {/* Left Info */}
              <div className='flex items-start gap-5 text-sm'>
                <img
                  className='w-16 sm:w-20 rounded-lg object-cover'
                  src={item.image?.[0] || 'https://via.placeholder.com/100'}
                  alt={item.name}
                />
                <div>
                  <p className='text-base font-semibold text-gray-800'>{item.name}</p>
                  <div className='flex flex-wrap items-center gap-3 mt-1 text-base text-gray-700'>
                    <p>{currency}{item.price}</p>
                    <p className='opacity-75'>Qty: {item.quantity}</p>
                    <p className='opacity-75'>Size: {item.size}</p>
                  </div>
                  <p className='mt-1 text-xs text-gray-500'>
                    Ordered on: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span>
                  </p>
                  <p className='mt-1 text-xs text-gray-500'>
                    Payment: <span className='text-gray-400'>{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              {/* Right Info */}
              <div className='flex flex-col sm:flex-row md:w-1/2 justify-between items-start md:items-center gap-3'>
                <div className='flex items-center gap-2'>
                  <span className={`w-2.5 h-2.5 rounded-full ${getStatusColor(item.status).split(' ')[0]}`}></span>
                  <p className={`text-sm font-medium ${getStatusColor(item.status).split(' ')[1]}`}>
                    {item.status}
                  </p>
                </div>

                <button
                  onClick={loadOrderData}
                  className='bg-gradient-to-r from-black to-gray-900 text-white text-sm px-6 py-2 rounded-md font-semibold hover:shadow-lg transition-all hover:scale-105 active:scale-95'
                >
                  TRACK ORDER
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-8">No orders found. Place your first one!</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
