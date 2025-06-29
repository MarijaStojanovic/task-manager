import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/module';

const databaseUrl = process.env.MONGO_URI;

if (!databaseUrl) {
  throw new Error('MONGO_URI is not set!');
}
@Module({
  imports: [MongooseModule.forRoot(databaseUrl), TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
