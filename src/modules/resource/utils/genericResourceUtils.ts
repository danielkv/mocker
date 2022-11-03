import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';

import { Connection, Model, Schema } from 'mongoose';

import { DATA_CONN } from '@shared/db/config';

import { Resource } from '../entities/resource.entity';
import { GenericResourceSchema } from '../interfaces/data-generator';
import { ResourceField } from '../interfaces/resource-field';
import { ResourceData } from '../interfaces/resources';

@Injectable()
export class GenericResourceUtils {
    constructor(
        @InjectConnection(DATA_CONN) private dataConnection: Connection,
    ) {}

    getModel(resource: Resource): Model<ResourceData> {
        const { collectionName } = resource;
        const cachedModel = this.dataConnection.models?.[collectionName];
        if (cachedModel) return cachedModel;

        const genericSchema = this.createGenericSchema(resource.fields);

        return this.dataConnection.model(
            resource.collectionName,
            genericSchema,
        );
    }

    createGenericSchema(fields: ResourceField[]): Schema<ResourceData> {
        const schemaFields = fields.reduce<GenericResourceSchema>(
            (schema, field) => {
                schema[field.name] = Schema.Types.Mixed;
                return schema;
            },
            {},
        );

        return new Schema(schemaFields, { versionKey: false });
    }
}
