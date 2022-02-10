import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({type:String,unique:true,required:true})
  email: String;

  @Prop({type:String,required:true})
  password: String;

  //@Prop({timestamps: true})
}

//export const UserSchema = SchemaFactory.createForClass(User);
export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  }, 
  password: {
    type: String,
    required: true
  }
}, {timestamps: true});

UserSchema.pre('save', async function(next) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
      const hashed = await bcrypt.hash(this['password'], 10);
      this['password'] = hashed;
      return next();
    } catch (err) {
      return next(err);
    }
});
