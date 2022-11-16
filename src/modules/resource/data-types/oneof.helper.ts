import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

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
        throw new Error('Method not implemented.');
    }

    generate({ options }: DataType.OneOfField): string {
        if (!options) throw new DataGeneratorException('No elements to select');

        return faker.helpers.arrayElement(options.values);
    }
}
