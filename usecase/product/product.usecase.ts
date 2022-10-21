import { ProductRepository } from '../../repository/product.repository';
import {
  GetProduct,
  GetProductUseCase,
  GetProductWithPageAndLimit,
} from '../../types/product.types';

export class ProductUseCase {
  public static getProduct: GetProductUseCase = async (query) => {
    try {
      let { limit, timestamp, flag, isFirst } = query;
      limit = limit != undefined ? parseInt(limit) : 100000;
      timestamp = timestamp != undefined ? parseInt(timestamp) : -1;
      flag = flag != undefined ? parseInt(flag) : -1;
      isFirst = isFirst != undefined ? parseInt(isFirst) : 0;
      console.log(query);
      let data;
      let nextPageUrl = '',
        prevPageUrl = '';
      if (parseInt(isFirst) === 1) {
        // first request :- Just return from here with data and next link
        const data = await ProductRepository.getProductWithLimit({
          limit,
        });
        nextPageUrl = `http://localhost:3001/api/product?timestamp=${
          data[data.length - 1].created_at
        }&limit=${limit}&flag=1`;
        return {
          data: data,
          success: true,
          status: 200,
          next: nextPageUrl,
        };
      }

      if (parseInt(flag) === 1) {
        /* when next page is requested*/
        data = await ProductRepository.getProductWithLimitAndTimeLesserThan({
          limit,
          timestamp,
        });
      } else if (flag === 0) {
        // prev page is requested...
        data = await ProductRepository.getProductWithLimitAndTimeGreaterThan({
          limit,
          timestamp,
        });
        data.reverse();
      } else {
        throw new Error('Got unexpected value for flag:');
      }
      if (data.length == 0)
        return {
          data: data,
          success: true,
          message: 'You have reached at the end!',
          status: 200,
        };

      nextPageUrl = `http://localhost:3001/api/product?timestamp=${
        data[data.length - 1].created_at
      }&limit=${limit}&flag=1`;

      prevPageUrl = `http://localhost:3001/api/product?timestamp=${data[0].created_at}&limit=${limit}&flag=0`;

      return {
        data: data,
        success: true,
        status: 200,
        next: nextPageUrl,
        prev: prevPageUrl,
      };
    } catch (e) {
      console.log(e);
      return {
        data: '',
        success: false,
        status: 500,
      };
    }
  };
  public static getProductFirstPageAndLimit: GetProductWithPageAndLimit =
    async (query) => {
      try {
        const { limit } = query;
        const data = await ProductRepository.getProductWithLimit({
          limit,
        });
        const nextPageUrl = `http://localhost:3001/api/product?timestamp=${
          data[data.length - 1].created_at
        }&limit=${limit}&flag=1`;
        return {
          data: data,
          success: true,
          status: 200,
          next: nextPageUrl,
        };
      } catch (e) {
        return {
          data: e,
          status: 500,
          success: false,
        };
      }
    };
}
