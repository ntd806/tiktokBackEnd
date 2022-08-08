import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { UserSchema, User } from './model/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        JwtModule.register({ secret: process.env.SECRET }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    providers: [TagService],
    controllers: [TagController]
})
export class TagModule {}
