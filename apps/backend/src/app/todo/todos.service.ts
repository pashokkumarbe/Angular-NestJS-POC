import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTodoDto } from './dto/create-todo.dto'; 
import { Todo, TodoDocument } from './schemas/todo.schema'; 
import { Logger } from '@nestjs/common';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private TodoModel: Model<TodoDocument>
    ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = new this.TodoModel(createTodoDto);
    return createdTodo.save();
  } 

  async login(emailid, pwd): Promise<any> { 
    Logger.log('createTodoDto', emailid + ' / '+ pwd); 
    const userlgdata = await this.TodoModel.findOne({"email": emailid , "pwd": pwd }, "email" ).exec();     
    return userlgdata;
  }

  async emailExist(emailid): Promise<any> { 
    Logger.log('createTodoDto', emailid); 
    const userlgdata = await this.TodoModel.findOne({"email": emailid }, "email" ).exec();     
    return userlgdata;
  }
 
  
  async find(id: string): Promise<any> {
    return await this.TodoModel.findById(id).exec() || null; 
  }

  async findAll(): Promise<Todo[]> {
    return await this.TodoModel.find().exec();
  }

}
