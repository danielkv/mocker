import { ValueProvider } from '@nestjs/common';

import { DataGeneratorProvider } from '../interfaces/data-generator';
import { StringGenerator } from './string.generator';

const generators: DataGeneratorProvider = {
    string: new StringGenerator(),
    list: new StringGenerator(),
    number: new StringGenerator(),
};

export const GENERATORS = 'GENERATORS_PROVIDER';

export const GENERATORS_PROVIDER: ValueProvider<DataGeneratorProvider> = {
    provide: GENERATORS,
    useValue: generators,
};
