import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { DataGenerator } from '../interfaces/data-generator';
import { NumberGeneratorOptions } from '../interfaces/generator-options';
import { BaseGenerator } from './base.generator';

@Injectable()
export class NumberGenerator
    extends BaseGenerator
    implements DataGenerator<NumberGeneratorOptions, number>
{
    generate({ min, max }: NumberGeneratorOptions): number {
        return faker.datatype.number({ max, min });
    }
}
