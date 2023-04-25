import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
      @Inject('USER_MODEL')
      private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...rest } = createUserDto;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const createdUser = new this.userModel({ ...rest, password: hashedPassword });
    return createdUser.save();
  }


  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(email: string): Promise<User> {
    return this.userModel.findById(email).exec();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({email}).exec();
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);
    await this.userModel.deleteOne({id: id}).exec();
    return user;
  }
}
