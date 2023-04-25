import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: String,
  firstname: String,
  lastname: String,
  password: String,
});
