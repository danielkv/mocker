import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { FieldValidationException } from '../exceptions/field-validation-exception';
import { DataType } from '../interfaces/data-type';
import { ResourceDataTypeHelper } from '../interfaces/data-type-helper';
import { ResourceDataBaseHelper } from './base.helper';

@Injectable()
export class NumberDataTypeHelper
    extends ResourceDataBaseHelper
    implements ResourceDataTypeHelper<DataType.NumberField, number>
{
    validate(
        value: number,
        field: DataType.NumberField,
        update: boolean,
    ): boolean {
        super.validate(value, field, update);

        if (typeof value === 'undefined' && update) return true;

        if (value > field.options.max)
            throw new FieldValidationException(
                `Field ${field.name} max value is ${field.options.max}`,
            );
        if (value < field.options.min)
            throw new FieldValidationException(
                `Field ${field.name} min value is ${field.options.min}`,
            );
    }

    generate({ options: { min, max } }: DataType.NumberField): number {
        return faker.datatype.number({ max, min });
    }
}
