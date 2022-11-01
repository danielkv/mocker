import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, ObjectId } from 'mongoose';

import { MAIN_CONN } from '@shared/db/config';

import { GENERATORS } from '../data-generators';
import { Resource } from '../entities/resource.entity';
import { DataGeneratorProvider } from '../interfaces/data-generator';

@Injectable()
export class GenerateResourceDataCase {
    constructor(
        @InjectModel(Resource.name, MAIN_CONN)
        private resourceRepository: Model<Resource>,
        @Inject(GENERATORS) private generatorsProvider: DataGeneratorProvider,
    ) {}

    async execute(resourceId: ObjectId, numberOfRows: number) {
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
    }
}
