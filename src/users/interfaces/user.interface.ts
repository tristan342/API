import { Document } from 'mongoose';

export interface User extends Document {
  readonly email: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly password: string;
}
