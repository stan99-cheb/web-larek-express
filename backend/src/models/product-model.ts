import { Document, model, Schema } from 'mongoose';

export enum ProductCategory {
  SOFT_SKILL = 'софт-скил',
  HARD_SKILL = 'хард-скил',
  BUTTON = 'кнопка',
  OTHER = 'другое',
  ADDITIONAL = 'дополнительное'
}

interface ImageData {
  fileName: string;
  originalName: string;
}

export interface IProduct extends Document {
  category: ProductCategory;
  description?: string;
  image: ImageData;
  price?: number;
  title: string;
}

const productSchema = new Schema<IProduct>(
  {
    category: {
      type: String,
      required: true,
      enum: Object.values(ProductCategory),
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      fileName: {
        type: String,
        required: true,
      },
      originalName: {
        type: String,
        required: true,
      },
    },
    price: {
      type: Number,
      required: false,
      default: null,
    },
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 30,
    },
  },
  {
    timestamps: true,
    collection: 'products',
  },
);

const Product = model<IProduct>('Product', productSchema);

export default Product;
