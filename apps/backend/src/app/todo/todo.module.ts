import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { ProductsService } from './product.service';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { Product, ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Todo.name, schema: TodoSchema }
    ]),
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema }
    ])
  ],
  controllers: [TodosController],
  providers: [TodosService, ProductsService],
  exports: [TodosService, ProductsService]
})
export class TodoModule {}

