import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { DataType } from '../interfaces/data-type';
import { ResourceDataTypeHelper } from '../interfaces/data-type-helper';
import { ResourceDataBaseHelper } from './base.helper';

@Injectable()
export class BooleanDataTypeHelper
    extends ResourceDataBaseHelper
    implements ResourceDataTypeHelper<DataType.BooleanField, boolean>
{
    generate(): boolean {
        return faker.datatype.boolean();
    }
}
