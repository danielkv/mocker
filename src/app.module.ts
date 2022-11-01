import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { DATA_CONN, MAIN_CONN } from '@shared/db/config';

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
            connectionName: MAIN_CONN,
            useFactory: async (config: ConfigService) => ({
                dbName: config.get('MAIN_DATABASE_NAME'),
                uri: config.get('MAIN_MONGO_URL'),
            }),
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            connectionName: DATA_CONN,
            useFactory: async (config: ConfigService) => ({
                dbName: config.get('DATA_DATABASE_NAME'),
                uri: config.get('DATA_MONGO_URL'),
            }),
        }),
    ],
    controllers: [],
})
export class AppModule {}
