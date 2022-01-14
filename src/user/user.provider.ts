import { Connection } from 'mongoose';
import { UserSchema } from './schemas/user.schema';
import { MONGODB_PROVIDER } from '../database/constants';
import { USER_PROVIDER } from './constants';

export const UserProviders = [
  {
    provide: USER_PROVIDER,
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: [MONGODB_PROVIDER],
  },
];