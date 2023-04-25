import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {ApiBody, ApiTags} from "@nestjs/swagger";

@ApiTags('authentification')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        firstname: { type: 'string', example: 'John' },
        lastname: { type: 'string', example: 'Cena' },
        password: { type: 'string', example: 'changeme' },
      },
      required: ['email', 'password'],
    },
  })
  logIn(@Body() signInDto: Record<string, any>) {
    return this.authService.logIn(signInDto.email, signInDto.password);
  }

}