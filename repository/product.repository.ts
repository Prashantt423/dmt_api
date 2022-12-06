import {
  CreateProduct,
  DeleteProduct,
  GetAlbums,
  getAllReleases,
  getMultipleProductsById,
  GetProduct,
  GetProductById,
  GetProductWithPageAndLimit,
  GetSearchedProductsRepository,
} from "../types/product.types";
import Product from "../model/product.model";
export class ProductRepository {
  public static createProduct: CreateProduct = async (product) => {
    try {
      // check if stock field is available or not in every variant
      if (product.variant) {
        for (let i = 0; i < product.variant.length; i++) {
          if (!("stock" in product.variant[i])) {
            return {
              data: "stock information is required!",
              success: false,
              status: 201,
            };
          }
        }
      }
      const newProduct = await new Product({
        title: product.title,
        price: product.price,
        description: product.description,
        discount: {
          startDate: new Date(product?.discount?.startDate),
          endDate: new Date(product?.discount?.endDate),
          value: product?.discount?.value,
        },
        tags: product?.tags,
        variant: product?.variant,
        coverImage: product.coverImage,
        images: product.images,
        productDetails: product?.productDetails, // other fields are dynamically added
        artists: product?.artists,
        songs: product?.songs,
        hotAlbumPoster: product?.hotAlbumPoster,
        sample: product?.sample,
        compiledBy: product?.compiledBy,
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
      console.log(e);
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
          deletedProduct === null ? "No such product exists." : deletedProduct,
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
    return await Product.find({ productType: "goods" })
      .sort({ updatedAt: -1 })
      .limit(limit);
  };
  public static getAlbums: GetAlbums = async (limit) => {
    return await Product.find({
      productType: "release",
    })
      .sort({ updatedAt: -1 })
      .limit(limit);
  };
  public static searchForTags: GetSearchedProductsRepository = async (
    regexp
  ) => {
    const filter: any = {
      tags: {
        $in: regexp,
      },
    };
    console.log(filter);
    return await Product.find(filter);
  };
  public static getSingleProductById: GetProductById = async (id) => {
    try {
      const data = await Product.findById(id);
      return {
        data,
        status: 200,
        success: true,
      };
    } catch (e) {
      return {
        message: "Could not fetch the id",
        data: null,
        status: 404,
        success: false,
      };
    }
  };
  public static getAllReleases: getAllReleases = async () => {
    try {
      const data = await Product.find({ productType: "release" }).sort({
        updatedAt: -1,
      });
      return {
        data,
        success: true,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
      };
    }
  };
}
