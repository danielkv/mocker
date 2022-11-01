import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MAIN_CONN } from '@shared/db/config';

import { User, UserSchema } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: User.name, schema: UserSchema }],
            MAIN_CONN,
        ),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
