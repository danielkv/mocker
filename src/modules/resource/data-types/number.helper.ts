import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { DataType } from '../interfaces/data-type';
import { ResourceDataTypeHelper } from '../interfaces/data-type-helper';
import { ResourceDataBaseHelper } from './base.helper';

@Injectable()
export class NumberDataTypeHelper
    extends ResourceDataBaseHelper
    implements ResourceDataTypeHelper<DataType.NumberField, number>
{
    generate({ options: { min, max } }: DataType.NumberField): number {
        return faker.datatype.number({ max, min });
    }
}
