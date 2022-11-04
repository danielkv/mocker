import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { GeneratorException } from '../exceptions/generator-exception';
import { DataGenerator } from '../interfaces/data-generator';
import { BaseGenerator } from './base.generator';

@Injectable()
export class NumberGenerator
    extends BaseGenerator
    implements DataGenerator<number>
{
    generate(options?: string): number {
        const length = Number(options);
        if (length === NaN)
            throw new GeneratorException('Option is not a Number');

        return Number(faker.random.numeric(Number(options)));
    }
}
