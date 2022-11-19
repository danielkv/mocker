import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { MAIN_CONN } from '@shared/db/config';

import { DATA_TYPE_HELPERS } from './data-types';
import { Resource } from './entities/resource.entity';
import { DataValidationException } from './exceptions/data-validation-exception';
import { DataType } from './interfaces/data-type';
import {
    DataTypeHelperProviders,
    ResourceDataTypeHelper,
} from './interfaces/data-type-helper';
import { ResourceData } from './interfaces/resources';
import { ResourceDataModelService } from './resource-data-model.service';

@Injectable()
export class ResourceDataHelperService {
    constructor(
        @InjectModel(Resource.name, MAIN_CONN)
        private resourceRepository: Model<Resource>,
        @Inject(DATA_TYPE_HELPERS)
        private helperProvider: DataTypeHelperProviders,
        private resourceDataModelService: ResourceDataModelService,
    ) {}

    async generate(resourceId: string, numberOfRows: number) {
        const resource: Resource = await this.resourceRepository.findById(
            resourceId,
        );

        const data = Array.from({ length: numberOfRows }).map(() => {
            return resource.fields.reduce<ResourceData>((row, field) => {
                const filedHelper = this.getFieldHelper(field.type);

                const value = filedHelper.generate(field);

                row[field.name] = value;

                return row;
            }, {});
        });

        const genericModel = await this.resourceDataModelService.getModel(
            resourceId,
        );
        await genericModel.create(data);

        return data;
    }

    validate(
        { fields, name }: Resource,
        values: ResourceData,
        update: boolean,
    ): boolean {
        const unknowFields = Object.keys(values).reduce<string[]>(
            (unknown, key) => {
                if (!fields.some((field) => field.name === key))
                    unknown.push(
                        `Field ${key} is not in the resource ${name} fields list`,
                    );
                return unknown;
            },
            [],
        );

        const invalidFields = fields.reduce<string[]>((accErrors, field) => {
            const filedHelper = this.getFieldHelper(field.type);

            try {
                const value = values[field.name];

                filedHelper.validate(value, field, update);
            } catch (err) {
                accErrors.push((err as Error).message);
            }

            return accErrors;
        }, []);

        const fieldErrors = [...unknowFields, ...invalidFields];

        if (fieldErrors.length) throw new DataValidationException(fieldErrors);

        return true;
    }

    private getFieldHelper(type: DataType.FieldType): ResourceDataTypeHelper {
        const filedHelper = this.helperProvider[type];
        if (!filedHelper) throw new Error("Field Helper doesn't exist");

        return filedHelper;
    }
}
