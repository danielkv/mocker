import { ValueProvider } from '@nestjs/common';

import { DataGeneratorProvider } from '../interfaces/data-generator';
import { NumberGenerator } from './number.generator';
import { OneOfGenerator } from './oneof.generator';
import { StringGenerator } from './string.generator';

const generators: DataGeneratorProvider = {
    string: new StringGenerator(),
    oneof: new OneOfGenerator(),
    number: new NumberGenerator(),
    boolean: new NumberGenerator(),
};

export const GENERATORS = 'GENERATORS_PROVIDER';

export const GENERATORS_PROVIDER: ValueProvider<DataGeneratorProvider> = {
    provide: GENERATORS,
    useValue: generators,
};
