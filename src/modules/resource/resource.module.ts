import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MAIN_CONN } from '@shared/db/config';

import { AbilityFactory } from '@modules/auth/ability.factory';

import { DATA_TYPE_HELPERS_PROVIDER } from './data-types';
import { Resource, ResourceSchema } from './entities/resource.entity';
import { ResourceDataHelperService } from './resource-data-helper.service';
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
        AbilityFactory,
        ResourceService,
        ResourceDataHelperService,
        ResourceUtils,
        ResourceDataService,
        ResourceDataModelService,
        DATA_TYPE_HELPERS_PROVIDER,
    ],
})
export class ResourceModule {}
