
import * as mongoose from 'mongoose';
import * as dotenv from "dotenv";
dotenv.config();

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://'+process.env.database_user+':'+process.env.database_password+'@cluster0.l7driyq.mongodb.net/?retryWrites=true&w=majority'),
  },
];
