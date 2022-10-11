import mongoose, { Model, Schema } from "mongoose";
import { ProductType ,DiscountType,AttributeType,VariantType,ProductDetailsType} from "../types/product.types";
const discountSchema = new Schema<DiscountType>({
    value:{
        type:Number,
        min:0.01,
        max:100
    },
    startDate:{
        type:Date,
    },
    endDate:{
        type:Date,
    }
},{ _id : false })
const productDetailSchema = new Schema<ProductDetailsType>({
    field:{
      type:String,
      required:true
    },
    value:{
      type:String,
      required:true
    }
},{ _id : false })
const attributeSchema = new Schema<AttributeType>({
    variant:[]
    // other fields are dynamically added
}, { _id : false })
const productSchema = new Schema<ProductType>({
  title: {
    required: true,
    type: String,
    unique:true
  },
  price:{
    required: true,
    type:Number
  },
  description:{
    required: true,
    type:String
  },
  discount:discountSchema,
  attribute:attributeSchema,
  coverImage:{
    type:String,
    required: true
  },
  images:{
    type:[String],
    // required: true
  },
  productDetails:[productDetailSchema],// other fields are dynamically added
  artists:{
    type:[String],
  },
  songs:{
    type:[String]
  },
  productType:{
    type:String,
    enum:["release","goods"],
    default:"goods"
  }
},{timestamps:true},);

const Product: Model<ProductType> = mongoose.model("Product", productSchema);
export default Product;