import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { DataGenerator } from '../interfaces/data-generator';
import { BaseGenerator } from './base.generator';

@Injectable()
export class BooleanGenerator
    extends BaseGenerator
    implements DataGenerator<boolean>
{
    generate(): boolean {
        return faker.datatype.boolean();
    }
}
