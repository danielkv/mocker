import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { DataValidationException } from '../exceptions/data-validation-exception';
import { DataType } from '../interfaces/data-type';
import { ResourceDataTypeHelper } from '../interfaces/data-type-helper';
import { ResourceDataBaseHelper } from './base.helper';

@Injectable()
export class BooleanDataTypeHelper
    extends ResourceDataBaseHelper
    implements ResourceDataTypeHelper<DataType.BooleanField, boolean>
{
    validate(value: boolean, field: DataType.BooleanField): boolean {
        if (!this.isRequiredValid(value, field.options.required))
            throw new DataValidationException(`${field.name} is required`);

        if (typeof value === 'boolean')
            throw new DataValidationException(`${field.name} is not valid`);

        return true;
    }

    generate(): boolean {
        return faker.datatype.boolean();
    }
}
