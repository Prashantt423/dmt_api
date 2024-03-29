import { FilterQuery, ObjectId } from "mongoose";

export interface DiscountType {
  value?: Number;
  startDate?: Date;
  endDate?: Date;
}
export interface ProductDetailsType {
  field?: String;
  value?: String;
}

export interface ProductType {
  title: String;
  price: Number;
  tags?: [String];
  description: String;
  discount?: DiscountType;
  variant?: [any];
  coverImage: String;
  images: [String];
  productDetails?: ProductDetailsType;
  artists?: [String];
  songs?: [String];
  hotAlbumPoster?: String;
  sample?: String;
  compiledBy?: String;
  productType: "release" | "goods";
  created_at: number;
  updatedAt: Date;
  createdAt: Date;
  downloadLink?: String;
}

export type ProductReturnType = {
  data: any;
  success: boolean;
  status: number;
  message?: String;
};
export type CreateProduct = (
  product: ProductType
) => Promise<ProductReturnType>;
export type DeleteProduct = (
  productId: FilterQuery<ProductType>
) => Promise<ProductReturnType>;

type GetProductArgument = {
  limit: number;
  timestamp?: number;
};

export type GetProductUseCase = (params: any) => Promise<ProductReturnType>;
export type GetProduct = (params: GetProductArgument) => Promise<any>;

export type GetProductWithPageAndLimitArgument = {
  limit: number;
};
export type GetProductWithPageAndLimit = (
  params: GetProductWithPageAndLimitArgument
) => Promise<any>;

export type GetSearchedProducts = (params: any) => Promise<any>;
export type GetSearchedProductsRepository = (params: RegExp[]) => Promise<any>;

export type GetAlbums = (params: number) => Promise<any>;
export type GetProductById = (id: string) => Promise<any>;
export type GetProductByIds = (ids: []) => Promise<any>;

export type getMultipleProductsById = (ids: any) => Promise<any>;
export type getAllReleases = () => Promise<any>;
