import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    unique: true,
    uppercase: true
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative'],
    default: 0
  },
  reorderLevel: {
    type: Number,
    default: 5
  },
  supplier: {
    type: String
  }
}, {
  timestamps: true, 
  toJSON: { virtuals: true }, // Ensures virtuals are included in JSON response
  toObject: { virtuals: true }
});

// Virtual field to match screenshot output: stockValue = price * quantity
productSchema.virtual('stockValue').get(function() {
  return this.price * this.quantity;
});

// Automatically assign a custom 'id' string field to match screenshots
productSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    return ret;
  }
});

const Product = mongoose.model('Product', productSchema);
export default Product;