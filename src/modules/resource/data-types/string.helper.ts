import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { DataType } from '../interfaces/data-type';
import { ResourceDataTypeHelper } from '../interfaces/data-type-helper';
import { ResourceDataBaseHelper } from './base.helper';

@Injectable()
export class StringDataTypeHelper
    extends ResourceDataBaseHelper
    implements ResourceDataTypeHelper<DataType.StringField, string>
{
    generate(): string {
        return faker.lorem.word();
    }
}
