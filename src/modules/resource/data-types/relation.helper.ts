import { Injectable } from '@nestjs/common';

import { DataValidationException } from '../exceptions/data-validation-exception';
import { DataType } from '../interfaces/data-type';
import { ResourceDataTypeHelper } from '../interfaces/data-type-helper';
import { ResourceDataBaseHelper } from './base.helper';

@Injectable()
export class RelationDataTypeHelper
    extends ResourceDataBaseHelper
    implements
        ResourceDataTypeHelper<DataType.RelationField, DataType.RelationValue>
{
    validate(
        value: DataType.RelationValue,
        field: DataType.RelationField,
    ): boolean {
        super.validate(value, field);

        if (field.options.type === 'many-to-one' && !this.isListValid(value))
            throw new DataValidationException(
                `Relation field ${field.name} expects a list of objects with IDs: Eg.: [ { _id: '1723982387123987' } ]`,
            );

        if (field.options.type === 'one-to-many' && !this.isSingleValid(value))
            throw new DataValidationException(
                `Relation field ${field.name} expects an object with IDs: Eg.: { _id: '1723982387123987' }`,
            );

        return true;
    }

    private isSingleValid(
        value: DataType.RelationValue,
    ): value is DataType.RelationSingleValue {
        if (!Array.isArray(value) && typeof value._id === 'string') return true;

        return false;
    }

    private isListValid(
        value: DataType.RelationValue,
    ): value is DataType.RelationListValue {
        if (Array.isArray(value) && value.every(this.isSingleValid))
            return true;

        return false;
    }

    generate({ options }: DataType.RelationField): DataType.RelationValue {
        //if (!options) throw new DataGeneratorException('No elements to select');

        return { _id: 'oi' };
    }
}
