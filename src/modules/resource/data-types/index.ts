import { ValueProvider } from '@nestjs/common';

import { DataTypeHelperProviders } from '../interfaces/data-type-helper';
import { BooleanDataTypeHelper } from './boolean.helper';
import { NumberDataTypeHelper } from './number.helper';
import { OneOfDataTypeHelper } from './oneof.helper';
import { StringDataTypeHelper } from './string.helper';

const helpers: DataTypeHelperProviders = {
    string: new StringDataTypeHelper(),
    oneof: new OneOfDataTypeHelper(),
    number: new NumberDataTypeHelper(),
    boolean: new BooleanDataTypeHelper(),
    relation: new BooleanDataTypeHelper(),
};

export const DATA_TYPE_HELPERS = 'DATA_TYPE_HELPERS';

export const DATA_TYPE_HELPERS_PROVIDER: ValueProvider<DataTypeHelperProviders> =
    {
        provide: DATA_TYPE_HELPERS,
        useValue: helpers,
    };
