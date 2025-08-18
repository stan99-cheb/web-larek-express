import { Document, model, Schema } from 'mongoose';

export enum PaymentMethod {
  CARD = 'card',
  ONLINE = 'online'
}

export interface IOrder extends Document {
  payment: PaymentMethod;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

const orderSchema = new Schema<IOrder>(
  {
    payment: {
      type: String,
      required: true,
      enum: Object.values(PaymentMethod),
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    items: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'orders',
  },
);

const Order = model<IOrder>('Order', orderSchema);

export default Order;

