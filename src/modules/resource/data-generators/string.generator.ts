import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { DataGenerator } from '../interfaces/data-generator';

@Injectable()
export class StringGenerator implements DataGenerator<string> {
    generate(options?: string): string {
        return faker.lorem.word();
    }
}
