import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { MAIN_CONN } from '@shared/db/config';

import { GENERATORS } from './data-generators';
import { Resource } from './entities/resource.entity';
import { DataGeneratorProvider } from './interfaces/data-generator';
import { ResourceData } from './interfaces/resources';
import { GenericResourceUtils } from './utils/genericResourceUtils';

@Injectable()
export class ResourceDataGeneratorService {
    constructor(
        @InjectModel(Resource.name, MAIN_CONN)
        private resourceRepository: Model<Resource>,
        @Inject(GENERATORS) private generatorsProvider: DataGeneratorProvider,
        private genericResourceUtils: GenericResourceUtils,
    ) {}

    async execute(resourceId: string, numberOfRows: number) {
        const resource: Resource = await this.resourceRepository.findById(
            resourceId,
        );

        const data = Array.from({ length: numberOfRows }).map(() => {
            return resource.fields.reduce<ResourceData>((row, field) => {
                const generator = this.generatorsProvider[field.type];
                if (!generator)
                    throw new Error("Generator Provider doesn't exist");

                const value = generator.generate(field.options);

                row[field.name] = value;

                return row;
            }, {});
        });

        const genericModel = await this.genericResourceUtils.getModel(
            resourceId,
        );
        await genericModel.create(data);

        return data;
    }
}
