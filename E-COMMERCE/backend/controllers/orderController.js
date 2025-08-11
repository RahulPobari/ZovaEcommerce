import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

// ✅ Place Order - COD Method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed", order: newOrder });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// 🚧 Place Order - Razorpay (Not Implemented Yet)
const placeOrderRazorpay = async (req, res) => {
  res.json({ success: false, message: "Razorpay order placement not implemented yet." });
};

// ✅ Get All Orders - Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get Orders by User ID
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Update Order Status (Admin Panel)
const updateStatus = async (req, res) => {
  try {
    const { order, status } = req.body;

    if (!order || !status) {
      return res.status(400).json({ success: false, message: "Order ID and status are required" });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(order, { status }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Status Updated", order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus
};
