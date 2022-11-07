import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { Connection, Model, Schema, SchemaDefinition } from 'mongoose';

import { DATA_CONN, MAIN_CONN } from '@shared/db/config';

import { Resource } from '../entities/resource.entity';
import { ResourceField } from '../interfaces/resource-field';
import { ResourceData } from '../interfaces/resources';

@Injectable()
export class GenericResourceUtils {
    constructor(
        @InjectModel(Resource.name, MAIN_CONN)
        private resourceRepository: Model<Resource>,
        @InjectConnection(DATA_CONN) private dataConnection: Connection,
    ) {}

    async getModel(resourceId: string): Promise<Model<ResourceData>> {
        const resource: Resource = await this.resourceRepository.findById(
            resourceId,
        );

        const { collectionName } = resource;
        const cachedModel = this.dataConnection.models?.[collectionName];
        if (cachedModel) return cachedModel;

        const schema = await this.buildSchema(resource.fields);

        return this.dataConnection.model(resource.collectionName, schema);
    }

    async buildSchema(fields: ResourceField[]): Promise<Schema<ResourceData>> {
        const schemaFields: SchemaDefinition = {};

        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];

            switch (field.type) {
                case 'relation': {
                    const model = await this.getModel(field.options.resourceId);

                    if (field.options.type === 'many-to-one') {
                        schemaFields[field.name] = {
                            type: Schema.Types.ObjectId,
                            ref: model.name,
                        };
                    } else {
                        schemaFields[field.name] = [
                            {
                                type: Schema.Types.ObjectId,
                                ref: model.name,
                            },
                        ];
                    }
                    break;
                }
                default:
                    schemaFields[field.name] = Schema.Types.Mixed;
            }
        }

        return new Schema(schemaFields, { versionKey: false });
    }

    filterRelationFields(fields: ResourceField[]): ResourceField[] {
        return fields.filter((field) => field.type === 'relation');
    }

    filterNonRelationFields(fields: ResourceField[]): ResourceField[] {
        return fields.filter((field) => field.type !== 'relation');
    }
}
