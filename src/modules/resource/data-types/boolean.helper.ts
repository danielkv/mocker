import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { ResourceDataTypeHelper } from '../interfaces/data-type-helper';
import { ResourceDataBaseHelper } from './base.helper';

@Injectable()
export class BooleanDataTypeHelper
    extends ResourceDataBaseHelper
    implements ResourceDataTypeHelper<boolean>
{
    generate(): boolean {
        return faker.datatype.boolean();
    }
}
