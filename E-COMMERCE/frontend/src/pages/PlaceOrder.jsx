import React, { useContext, useEffect , useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const quantity = cartItems[productId][size];
          if (quantity > 0) {
            const product = products.find((p) => p._id === productId);
            if (product) {
              orderItems.push({
                ...product,
                size,
                quantity,
              });
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      if (method === 'cod') {
        const response = await axios.post(
          `${backendUrl}/api/order/place`,
          orderData,
          { headers: { token } }
        );

        if (response.data.success) {
          setCartItems({});
          navigate('/orders');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Something went wrong!');
    }
  };

  useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-10'
    >
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px] bg-white/60 backdrop-blur-lg p-6 rounded-2xl border shadow-md'>
        <div className='my-3 text-xl'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input
            onChange={onChangeHandler}
            name='firstName'
            value={formData.firstName}
            className='w-full input-style'
            type='text'
            placeholder='First name'
            required
          />
          <input
            onChange={onChangeHandler}
            name='lastName'
            value={formData.lastName}
            className='w-full input-style'
            type='text'
            placeholder='Last name'
            required
          />
        </div>

        <input
          onChange={onChangeHandler}
          name='email'
          value={formData.email}
          className='input-style'
          type='email'
          placeholder='Email address'
          required
        />
        <input
          onChange={onChangeHandler}
          name='street'
          value={formData.street}
          className='input-style'
          type='text'
          placeholder='Street'
          required
        />

        <div className='flex gap-3'>
          <input
            onChange={onChangeHandler}
            name='city'
            value={formData.city}
            className='w-full input-style'
            type='text'
            placeholder='City'
            required
          />
          <input
            onChange={onChangeHandler}
            name='state'
            value={formData.state}
            className='w-full input-style'
            type='text'
            placeholder='State'
            required
          />
        </div>

        <div className='flex gap-3'>
          <input
            onChange={onChangeHandler}
            name='zipcode'
            value={formData.zipcode}
            className='w-full input-style'
            type='text'
            placeholder='Zipcode'
            required
          />
          <input
            onChange={onChangeHandler}
            name='country'
            value={formData.country}
            className='w-full input-style'
            type='text'
            placeholder='Country'
            required
          />
        </div>

        <input
          onChange={onChangeHandler}
          name='phone'
          value={formData.phone}
          className='input-style'
          type='tel'
          placeholder='Phone'
          required
        />
      </div>

      {/* Right Side */}
      <div className='mt-8 w-full sm:max-w-[480px]'>
        <div className='mt-8'>
          <CartTotal />
        </div>

        <div className='mt-12 text-xl'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          <div className='flex flex-col gap-3 mt-4'>
            
            <div
              onClick={() =>
                toast.warning('⚠️ Stripe is disabled in demo. Please use Cash On Delivery.', {
                  position: 'top-center',
                  autoClose: 3000,
                  theme: 'dark',
                })
              }
              className={`payment-option ${method === 'stripe' ? 'active' : ''}`}
            >
              <span className='dot' />
              <img className='h-5 ml-2' src={assets.stripe_logo} alt='stripe' />
            </div>

            {/* Razorpay (Disabled) */}
            <div
              onClick={() =>
                toast.warning('⚠️ Razorpay is disabled in demo. Please use Cash On Delivery.', {
                  position: 'top-center',
                  autoClose: 3000,
                  theme: 'dark',
                })
              }
              className={`payment-option ${method === 'razorpay' ? 'active' : ''}`}
            >
              <span className='dot' />
              <img className='h-5 ml-2' src={assets.razorpay_logo} alt='razorpay' />
            </div>

            {/* COD */}
            <div
              onClick={() => setMethod('cod')}
              className={`payment-option ${method === 'cod' ? 'active border-green-600 bg-gray-100' : ''}`}
            >
              <span className={`dot ${method === 'cod' ? 'bg-green-600 border-green-600' : ''}`} />
              <p className='text-gray-600 text-sm font-medium ml-2'>Cash On Delivery</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button
              type='submit'
              className='bg-gradient-to-r from-black to-gray-900 text-white text-sm font-semibold px-12 py-3 rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:scale-105 active:scale-95'
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          .input-style {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid #ccc;
            border-radius: 0.75rem;
            background-color: #f9f9f9;
            transition: 0.3s ease;
          }

          .input-style:focus {
            border-color: #111;
            outline: none;
            background-color: #fff;
            box-shadow: 0 0 0 2px rgba(0,0,0,0.1);
          }

          .payment-option {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 1rem;
            border: 1px solid #ccc;
            border-radius: 0.75rem;
            cursor: pointer;
            transition: 0.2s ease;
          }

          .payment-option.active {
            border-color: #111;
            background-color: #f3f3f3;
          }

          .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: 1px solid #ccc;
          }
        `}
      </style>
    </form>
  );
};

export default PlaceOrder;
