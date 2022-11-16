import { Injectable } from '@nestjs/common';

import { DataType } from '../interfaces/data-type';

@Injectable()
export class ResourceUtils {
    filterRelationFields(fields: DataType.Field[]): DataType.RelationField[] {
        return fields.filter(
            (field): field is DataType.RelationField =>
                field.type === 'relation',
        );
    }

    filterNonRelationFields(fields: DataType.Field[]): DataType.Field[] {
        return fields.filter((field) => field.type !== 'relation');
    }
}
