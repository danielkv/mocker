import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { GeneratorException } from '../exceptions/generator-exception';
import { DataGenerator } from '../interfaces/data-generator';
import { BaseGenerator } from './base.generator';

@Injectable()
export class OneOfGenerator
    extends BaseGenerator
    implements DataGenerator<string>
{
    generate(options?: string): string {
        if (!options) throw new GeneratorException('No elements to select');

        const arr = this.translateArray(options);

        return faker.helpers.arrayElement(arr);
    }

    private translateArray(options: string): string[] {
        const last = options.substring(-1, 0);
        const toArr = last === ',' ? options.substring(0, -1) : options;

        return toArr.split(',');
    }
}
