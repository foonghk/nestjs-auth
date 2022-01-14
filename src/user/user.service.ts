import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
// import { InjectConnection } from '@nestjs/mongoose';
// import { Connection } from 'mongoose';
import { User } from './types/user';
import { RegisterDTO } from './dto/register.dto';
import { Payload } from './types/payload';
import { USER_PROVIDER } from './constants';

@Injectable()
export class UserService {
    constructor(     
      @Inject(USER_PROVIDER)
      @InjectModel('User') private userModel: Model<User>,
    ) {}

    async create(RegisterDTO: RegisterDTO) {
        const { email } = RegisterDTO;
        const user = await this.userModel.findOne({ email });
        if (user) {
          throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
        }
    
        const createdUser = new this.userModel(RegisterDTO);

       
        await createdUser.save();
        return this.sanitizeUser(createdUser);
    }

    async findByPayload(payload: Payload) {
        const { email } = payload;
        return await this.userModel.findOne({ email });
    }

    async findByLogin(UserDTO: RegisterDTO) {
        const { email, password } = UserDTO;
        const user = await this.userModel.findOne({ email });
        if (!user) {
          throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
        }
        if (await bcrypt.compare(password, user.password)) {
          return this.sanitizeUser(user)
        } else {
          throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
        }
    }
    sanitizeUser(user: User) {
        const sanitized = user.toObject();
        delete sanitized['password'];
        return sanitized;
    }
}
