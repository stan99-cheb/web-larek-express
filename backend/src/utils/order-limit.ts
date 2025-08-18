import Order from '../models/order-model.js';

export async function maintainOrderLimit(limit = 5) {
  const orderCount = await Order.countDocuments();
  if (orderCount > limit) {
    const ordersToDelete = orderCount - limit;
    const oldestOrders = await Order.find()
      .sort({ createdAt: 1 })
      .limit(ordersToDelete)
      .select('_id');
    const idsToDelete = oldestOrders.map(order => order._id);
    await Order.deleteMany({ _id: { $in: idsToDelete } });
  }
}
