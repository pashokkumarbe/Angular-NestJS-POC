import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AngularUniversalModule } from '@nestjs/ng-universal';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppServerModule } from '../../../frontend/server';
import { FrontendMiddleware } from './middlewares/frontend.middleware';
import { ApiController } from './api/api.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module'; 

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/frontend/browser')
    }),
  MongooseModule.forRoot('mongodb+srv://pashokkumarbe:Test123Pwd@cluster0.ovgtx.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-r4isd9-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'),
  TodoModule
  ],
  controllers: [AppController, ApiController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(FrontendMiddleware).forRoutes({
      path: '/**',
      method: RequestMethod.ALL,
    });
  }
}
