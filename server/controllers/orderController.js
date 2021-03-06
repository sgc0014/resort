const asyncHandler = require("express-async-handler");
const Order = require("../model/orderSchema");

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  if (orderItems.length > 0) {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice
      ,totalPrice
    });
    const orderCreated = await order.save();
    res.status(201).json(orderCreated);
  } else {
    res.status(400);
    throw new Error("No items");
  }
});

const getAllOrder = asyncHandler(async (req, res) => {

  const orderSelcted = await Order.find();
  if (orderSelcted) {
    res.status(201).json(orderSelcted);
  } else {
    res.status(400);
    throw new Error("No such order found");
  }
});


const getOrder = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const orderSelcted = await Order.findById(id).populate("user", "name email");
  if (orderSelcted) {
    res.status(201).json(orderSelcted);
  } else {
    res.status(400);
    throw new Error("No such order found");
  }
});

const myOrder = asyncHandler(async (req, res) => {
 const order = await Order.find({user:req.user._id})
 if(order){
   res.json(order)
 }
 else{
   res.status(404)
   throw new Error("No orders found")
 }
  
});

const updateTopaid = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const orderSelcted = await Order.findById(id);
  if (orderSelcted) {
    orderSelcted.isPaid = true;
    orderSelcted.isPaidAt = Date.now();
    orderSelcted.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await orderSelcted.save();
    res.status(201).json(updatedOrder);
  } else {
    res.status(400);
    throw new Error("No such order found");
  }
});
const updateToDelivered = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const orderSelcted = await Order.findById(id);
  if (orderSelcted) {
    orderSelcted.isDelivered = true;
    orderSelcted.isDeliveredAt = Date.now();
    const updatedOrder = await orderSelcted.save();
    res.status(201).json(updatedOrder);
  } else {
    res.status(400);
    throw new Error("No such order found");
  }
});

module.exports.addOrderItems = addOrderItems;
module.exports.getOrder = getOrder;
module.exports.updateTopaid = updateTopaid;
module.exports.myOrder = myOrder;
module.exports.getAllOrder = getAllOrder;
module.exports.updateToDelivered = updateToDelivered;
