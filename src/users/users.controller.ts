import {Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation, ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';;
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { User as UserEntity } from './entities/user.entity';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }
  //
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  async delete(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.remove(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
