import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const orderSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Admin',
    required: true,
  },
  branch: { type: mongoose.Schema.ObjectId, ref: 'Branch' },
  assigned: {
    type: mongoose.Schema.ObjectId,
    ref: 'Employee',
  },
  number: {
    type: Number,
  },
  year: {
    type: Number,
  },
  recurring: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'annually', 'quarter'],
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: true,
  },
  invoice: {
    type: mongoose.Schema.ObjectId,
    ref: 'Ivoince',
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: String,
        required: true,
      },
    },
  ],
  shipment: {
    type: mongoose.Schema.ObjectId,
    ref: 'Shipment',
  },
  approved: {
    type: Boolean,
    default: false,
  },
  note: {
    type: String,
  },
  fulfillment: {
    type: String,
    enum: ['pending', 'in review', 'processing', 'packing', 'shipped', 'on hold', 'cancelled'],
    default: 'pending',
  },
  status: {
    type: String,
    enum: [
      'not started',
      'in progress',
      'delayed',
      'completed',
      'delivered',
      'returned',
      'cancelled',
      'on hold',
      'refunded',
    ],
    default: 'not started',
  },
  processingStatus: String,
  pdf: {
    type: String,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.plugin(mongooseAutoPopulate);

export default mongoose.model('Order', orderSchema);
