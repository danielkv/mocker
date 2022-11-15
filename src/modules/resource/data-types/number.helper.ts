import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { ResourceDataTypeHelper } from '../interfaces/data-type-helper';
import { NumberDataTypeOptions } from '../interfaces/field-options';
import { ResourceDataBaseHelper } from './base.helper';

@Injectable()
export class NumberDataTypeHelper
    extends ResourceDataBaseHelper
    implements ResourceDataTypeHelper<NumberDataTypeOptions, number>
{
    generate({ min, max }: NumberDataTypeOptions): number {
        return faker.datatype.number({ max, min });
    }
}
