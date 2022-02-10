import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
//import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    //DatabaseModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),   
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
