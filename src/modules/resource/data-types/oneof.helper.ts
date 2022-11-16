import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { FieldValidationException } from '../exceptions/field-validation-exception';
import { DataGeneratorException } from '../exceptions/generator-exception';
import { DataType } from '../interfaces/data-type';
import { ResourceDataTypeHelper } from '../interfaces/data-type-helper';
import { ResourceDataBaseHelper } from './base.helper';

@Injectable()
export class OneOfDataTypeHelper
    extends ResourceDataBaseHelper
    implements ResourceDataTypeHelper<DataType.OneOfField, string>
{
    validate(
        value: string,
        field: DataType.OneOfField,
        update: boolean,
    ): boolean {
        super.validate(value, field, update);
        if (update && typeof value === 'undefined') return true;

        if (typeof value !== 'string' || !field.options.values.includes(value))
            throw new FieldValidationException(
                `Field ${
                    field.name
                } expect one of these values: ${field.options.values.join(
                    ', ',
                )}`,
            );

        return true;
    }

    generate({ options }: DataType.OneOfField): string {
        if (!options) throw new DataGeneratorException('No elements to select');

        return faker.helpers.arrayElement(options.values);
    }
}
