import { Body, Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Todo } from './schemas/todo.schema'; 
import { Logger } from '@nestjs/common';
import { Response } from 'express';
import { Product } from './schemas/product.schema';
import { ProductsService } from './product.service';


@Controller('api/todo')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly productsService: ProductsService,
    ) {}

  @Post('/productcreate')
  async productcreate(@Res() res: Response,@Body() createProductDto: CreateProductDto) {
    const data=  await this.productsService.productcreate(createProductDto);
    return res.status(HttpStatus.OK).send(data);
  }

  @Post('/signup')
  async create(@Res() res: Response,@Body() createTodoDto: CreateTodoDto) {
    const data=  await this.todosService.create(createTodoDto);
    return res.status(HttpStatus.OK).send(data);
  }

  @Post('/signin')
  async login(@Res() res: Response, @Body() createTodoDto: CreateTodoDto): Promise<any> {
    const data = await this.todosService.login(createTodoDto.email, 
      createTodoDto.pwd); 
      return res.status(HttpStatus.OK).send(data);
  }

  @Post('/emailExist')
  async emailExist(@Res() res: Response, @Body() createTodoDto: CreateTodoDto): Promise<any> {
    const data = await this.todosService.emailExist(createTodoDto.email); 
      return res.status(HttpStatus.OK).send(data);
  }

  @Post('/getproduct')
  async getproduct(@Res() res: Response, @Body() createProductDto: CreateProductDto):Promise<any> {
    const data: any[] = await this.productsService.getproduct(createProductDto.type); 
    Logger.log('createProductDto - 123 ', JSON.stringify(data));
    return res.status(HttpStatus.OK).send(JSON.stringify(data));
  }

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }
}
