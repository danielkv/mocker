import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MAIN_CONN } from '@shared/db/config';

import { GENERATORS_PROVIDER } from './data-generators';
import { Resource, ResourceSchema } from './entities/resource.entity';
import { ResourceDataGeneratorService } from './resource-data-generator.service';
import { ResourceDataController } from './resource-data.controller';
import { ResourceDataService } from './resource-data.service';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { GenericResourceUtils } from './utils/genericResourceUtils';

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: Resource.name, schema: ResourceSchema }],
            MAIN_CONN,
        ),
    ],
    controllers: [ResourceController, ResourceDataController],
    providers: [
        ResourceService,
        ResourceDataGeneratorService,
        GenericResourceUtils,
        ResourceDataService,
        GENERATORS_PROVIDER,
    ],
})
export class ResourceModule {}
