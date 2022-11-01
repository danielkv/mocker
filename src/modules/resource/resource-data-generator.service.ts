import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { Connection, Model } from 'mongoose';

import { DATA_CONN, MAIN_CONN } from '@shared/db/config';

import { GENERATORS } from './data-generators';
import { Resource } from './entities/resource.entity';
import { DataGeneratorProvider } from './interfaces/data-generator';
import { createGenericResourceSchema } from './utils/createGenericResourceSchema';

@Injectable()
export class ResourceDataGeneratorService {
    constructor(
        @InjectModel(Resource.name, MAIN_CONN)
        private resourceRepository: Model<Resource>,
        @Inject(GENERATORS) private generatorsProvider: DataGeneratorProvider,
        @InjectConnection(DATA_CONN) private dataConnection: Connection,
    ) {}

    async execute(resourceId: string, numberOfRows: number) {
        const resource: Resource = await this.resourceRepository.findById(
            resourceId,
        );

        const data = Array.from({ length: numberOfRows }).map(() => {
            return resource.fields.reduce<Record<string, any>>((row, field) => {
                const generator = this.generatorsProvider[field.type];
                if (!generator)
                    throw new Error("Generator Provider doesn't exist");

                const value = generator.generate(field.options);

                row[field.name] = value;

                return row;
            }, {});
        });

        const genericSchema = createGenericResourceSchema(resource.fields);

        await this.dataConnection
            .model(resource.collectionName, genericSchema)
            .create(data);

        return data;
    }
}
