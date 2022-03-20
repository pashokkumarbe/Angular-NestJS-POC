import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'; 
import { CreateProductDto } from './dto/create-product.dto'; 
import { Product, ProductDocument } from './schemas/product.schema';
import { Logger } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor( 
    @InjectModel(Product.name) private ProductModel: Model<ProductDocument>
    ) {}
 
  async productcreate(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.ProductModel(createProductDto);
    return createdProduct.save();
  }
 
  async getproduct(typeid): Promise<any> {
    Logger.log('createProductDto 231 ', typeid);
    if (typeid) {
      const userlgdata = await this.ProductModel.find({ "type": typeid }, "name").exec(); 
      return userlgdata;
    } else {
      const userlgdata = await this.ProductModel.find(null, "name").exec();
      return userlgdata;
    }
  }
  
   

}
