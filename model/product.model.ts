import mongoose, { Schema } from "mongoose";
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
})
const variantSchema = new Schema<VariantType>({
    field:{
      type:String,
      required:true
    },
    value:{
      type:String,
      required:true
    },
    stock:{
      type:Number,
      min:0,
      required:true,
    }
    
})
const productDetailSchema = new Schema<ProductDetailsType>({
    field:{
      type:String,
      required:true
    },
    value:{
      type:String,
      required:true
    }
})
const attributeSchema = new Schema<AttributeType>({
    variant:[variantSchema]
    // other fields are dynamically added
})
const productSchema = new Schema<ProductType>({
  title: {
    required: true,
    type: String,
  },
  price:{
    required: true,
    type:Number
  },
  description:{
    required: true,
    type:Number
  },
  discount:discountSchema,
  attribute:attributeSchema,
  coverImage:{
    type:String,
    required: true
  },
  images:{
    type:[String],
    required: true
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
});

module.exports = mongoose.model("Product",productSchema)