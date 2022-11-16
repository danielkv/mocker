import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { DataValidationException } from '../exceptions/data-validation-exception';
import { DataGeneratorException } from '../exceptions/generator-exception';
import { DataType } from '../interfaces/data-type';
import { ResourceDataTypeHelper } from '../interfaces/data-type-helper';
import { ResourceDataBaseHelper } from './base.helper';

@Injectable()
export class OneOfDataTypeHelper
    extends ResourceDataBaseHelper
    implements ResourceDataTypeHelper<DataType.OneOfField, string>
{
    validate(value: string, field: DataType.OneOfField): boolean {
        super.validate(value, field);

        if (typeof value !== 'string' || !field.options.values.includes(value))
            throw new DataValidationException(
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
