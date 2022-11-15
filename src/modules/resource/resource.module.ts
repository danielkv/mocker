import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MAIN_CONN } from '@shared/db/config';

import { DATA_TYPE_HELPERS_PROVIDER } from './data-types';
import { Resource, ResourceSchema } from './entities/resource.entity';
import { ResourceDataGeneratorService } from './resource-data-generator.service';
import { ResourceDataModelService } from './resource-data-model.service';
import { ResourceDataController } from './resource-data.controller';
import { ResourceDataService } from './resource-data.service';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { ResourceUtils } from './utils/genericResourceUtils';

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
        ResourceUtils,
        ResourceDataService,
        ResourceDataModelService,
        DATA_TYPE_HELPERS_PROVIDER,
    ],
})
export class ResourceModule {}
