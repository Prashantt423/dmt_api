import { CreateProduct } from "../types/product.types";
import Product from "../model/product.model"
export class ProductRepository {
    public static createProduct : CreateProduct= async(product)=>{
       try{

         const newProduct = await new Product({
            title: product.title,
              price:product.price,
              description:product.description,
              discount:{
                "startDate":new Date( product?.discount?.startDate),
                "endDate":new Date( product?.discount?.endDate),
                "value":product?.discount?.value
              },
              attribute:product?.attribute,
              coverImage:product.coverImage,
              images:product.images,
              productDetails:product?.productDetails,// other fields are dynamically added
              artists:product?.artists,
              songs:product?.songs,
              productType:product?.productType
         });
         const savedProduct = await newProduct.save();
          console.log(savedProduct)
        return{
            data: savedProduct,
            success:true,
            status:200,
        }
       }catch(e){
        return {
            data:e,
            success:false,
            status:500,
        }
       }
    }
}