import { Injectable } from '@nestjs/common';

import { DataGenerator } from '../interfaces/data-generator';

@Injectable()
export class StringGenerator implements DataGenerator {
    generate(options?: string): any {
        throw new Error('Method not implemented.');
    }
}
