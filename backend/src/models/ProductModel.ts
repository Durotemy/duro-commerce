import mongoose from 'mongoose';

interface product{
    user:{},
    name:string,
    image:string,
    brand:string,
    category:string,
    description:string,
    reviews:[],
    rating:number,
    numReviews:number,
    price:number,
    countInStock:number
}

interface review{
    name:string,
    rating:number,
    comment:string,
    user:{},
}

const reviewShema = new mongoose.Schema<review>({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  })

const productSchema = new mongoose.Schema<product>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
      },
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      reviews: [reviewShema],
      rating: {
        type: Number,
        required: true,
        default: 0,
      },
      numReviews: {
        type: Number,
        required: true,
        default: 0,
      },
      price: {
        type: Number,
        required: true,
        default: 0,
      },
      countInStock: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
)

const Product = mongoose.model("productSchema", productSchema);
export default Product;
