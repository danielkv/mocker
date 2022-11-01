import { Schema } from 'mongoose';

import { ResourceField } from '../entities/field.entity';
import { GenericResourceSchema } from '../interfaces/data-generator';

export function createGenericResourceSchema(fields: ResourceField[]): Schema {
    const schemaFields = fields.reduce<GenericResourceSchema>(
        (schema, field) => {
            schema[field.name] = Schema.Types.Mixed;
            return schema;
        },
        {},
    );

    return new Schema(schemaFields, { versionKey: false });
}
