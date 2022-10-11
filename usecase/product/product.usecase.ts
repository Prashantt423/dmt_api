import { ProductRepository } from "../../repository/product.repository"
import { CreateProduct } from "../../types/product.types"


export class ProductUseCase {
    public static createProduct : CreateProduct= async(product)=>{
        try{
            return await ProductRepository.createProduct(product);
            
        }catch(e){
           return {
            data:e,
            success:false,
            status:500,
           }
        }
    }      
}