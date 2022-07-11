import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { User } from './entity/user.entity';

@Injectable()
export class AuthService {
    constructor(private readonly jwt: JwtService) {}

    async signup(dto: AuthDto) {
        return true;
        // const newUser = await this.userRepo.create(dto);
        // await this.userRepo.save(newUser);
        // return this.signToken(newUser.phone, newUser.email);
    }

    async signin(dto: AuthDto) {
        // find the user by email
        // const user =
        //   await this.userRepo.findOne({
        //     where: {
        //       email: dto.email,
        //     },
        //   });
        // // if user does not exist throw exception
        // if (!user)
        //   throw new ForbiddenException(
        //     'Credentials incorrect',
        //   );
        // compare password
        // const pwMatches = await argon.verify(
        //   user.password,
        //   dto.password,
        // );
        // // if password incorrect throw exception
        // if (!pwMatches)
        //   throw new ForbiddenException(
        //     'Credentials incorrect',
        //   );
        // return this.signToken(user.phone, user.email);
    }

    async signToken(
        phone: string,
        email: string
    ): Promise<{ access_token: string }> {
        const payload = {
            sub: phone,
            email
        };
        const secret = process.env.JWT_SECRET;

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret
        });

        return {
            access_token: token
        };
    }
}
