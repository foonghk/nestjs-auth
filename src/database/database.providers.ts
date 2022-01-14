import * as mongoose from 'mongoose';
import { MONGODB_PROVIDER } from './constants';

export const databaseProviders = [
  {
    provide: MONGODB_PROVIDER,
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(process.env.MONGO_URI)
      
  },
];
