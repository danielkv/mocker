import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ProjectModule } from './modules/project/project.module';
import { ResourceModule } from './modules/resource/resource.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ProjectModule,
        UserModule,
        ResourceModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                dbName: config.get('DATABASE_NAME'),
                uri: config.get('MONGO_URL'),
            }),
        }),
    ],
    controllers: [],
})
export class AppModule {}
