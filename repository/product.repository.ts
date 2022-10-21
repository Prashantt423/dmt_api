import {
  CreateProduct,
  DeleteProduct,
  GetProduct,
  GetProductWithPageAndLimit,
} from '../types/product.types';
import Product from '../model/product.model';
export class ProductRepository {
  public static createProduct: CreateProduct = async (product) => {
    try {
      const newProduct = await new Product({
        title: product.title,
        price: product.price,
        description: product.description,
        discount: {
          startDate: new Date(product?.discount?.startDate),
          endDate: new Date(product?.discount?.endDate),
          value: product?.discount?.value,
        },
        attribute: product?.attribute,
        coverImage: product.coverImage,
        images: product.images,
        productDetails: product?.productDetails, // other fields are dynamically added
        artists: product?.artists,
        songs: product?.songs,
        productType: product?.productType,
        created_at: Date.now(),
      });
      const savedProduct = await newProduct.save();
      return {
        data: savedProduct,
        success: true,
        status: 200,
      };
    } catch (e) {
      return {
        data: e,
        success: false,
        status: 500,
      };
    }
  };
  public static deleteProduct: DeleteProduct = async (productId) => {
    try {
      const deletedProduct = await Product.findOneAndDelete(productId);
      return {
        data:
          deletedProduct === null ? 'No such product exists.' : deletedProduct,
        success: true,
        status: deletedProduct === null ? 202 : 204,
      };
    } catch (e) {
      console.log(e);
      return {
        data: e,
        success: false,
        status: 500,
      };
    }
  };
  public static getProductWithLimitAndTimeGreaterThan: GetProduct = async ({
    limit,
    timestamp,
  }) => {
    return await Product.find({
      created_at: { $gt: timestamp },
    })
      .sort({ created_at: 1 })
      .limit(limit);
  };
  public static getProductWithLimitAndTimeLesserThan: GetProduct = async ({
    limit,
    timestamp,
  }) => {
    return await Product.find({
      created_at: { $lt: timestamp },
    })
      .sort({ created_at: -1 })
      .limit(limit);
  };
  public static getProductWithLimit: GetProduct = async ({ limit }) => {
    return await Product.find({}).sort({ updatedAt: -1 }).limit(limit);
  };
}
