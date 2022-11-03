import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { DataGenerator } from '../interfaces/data-generator';
import { BaseGenerator } from './base.generator';

@Injectable()
export class StringGenerator
    extends BaseGenerator
    implements DataGenerator<never, string>
{
    generate(): string {
        return faker.lorem.word();
    }
}
