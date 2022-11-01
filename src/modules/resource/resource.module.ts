import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MAIN_CONN } from '@shared/db/config';

import { GENERATORS_PROVIDER } from './data-generators';
import { Resource, ResourceSchema } from './entities/resource.entity';
import { ResourceDataGeneratorService } from './resource-data-generator.service';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: Resource.name, schema: ResourceSchema }],
            MAIN_CONN,
        ),
    ],
    controllers: [ResourceController],
    providers: [
        ResourceService,
        ResourceDataGeneratorService,
        GENERATORS_PROVIDER,
    ],
})
export class ResourceModule {}
