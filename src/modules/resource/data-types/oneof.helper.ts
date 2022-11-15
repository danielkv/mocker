import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { DataGeneratorException } from '../exceptions/generator-exception';
import { ResourceDataTypeHelper } from '../interfaces/data-type-helper';
import { ResourceDataBaseHelper } from './base.helper';

@Injectable()
export class OneOfDataTypeHelper
    extends ResourceDataBaseHelper
    implements ResourceDataTypeHelper<string>
{
    generate(options?: string): string {
        if (!options) throw new DataGeneratorException('No elements to select');

        const arr = this.translateArray(options);

        return faker.helpers.arrayElement(arr);
    }

    private translateArray(options: string): string[] {
        const last = options.substring(-1, 0);
        const toArr = last === ',' ? options.substring(0, -1) : options;

        return toArr.split(',');
    }
}
