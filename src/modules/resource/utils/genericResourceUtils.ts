import { Injectable } from '@nestjs/common';

import { DataType } from '../interfaces/data-type';

@Injectable()
export class ResourceUtils {
    filterRelationFields(
        fields: DataType.ResourceField[],
    ): DataType.RelationField[] {
        return fields.filter(
            (field): field is DataType.RelationField =>
                field.type === 'relation',
        );
    }

    filterNonRelationFields(
        fields: DataType.ResourceField[],
    ): DataType.ResourceField[] {
        return fields.filter((field) => field.type !== 'relation');
    }
}
