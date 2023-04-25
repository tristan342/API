import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async logIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (user && !(await bcrypt.compare(pass, user.password))) {
            return new UnauthorizedException();
        } else {
            const payload = {username: user.id, sub: user.id};
            return {
                access_token: await this.jwtService.signAsync(payload),
            }
        }
        ;
    }
}
