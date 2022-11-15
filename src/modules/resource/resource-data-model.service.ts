import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { Connection, Model, Schema, SchemaDefinition } from 'mongoose';

import { DATA_CONN, MAIN_CONN } from '@shared/db/config';

import { Resource } from './entities/resource.entity';
import { RelationField, ResourceField } from './interfaces/resource-field';
import { ResourceData } from './interfaces/resources';
import { ResourceUtils } from './utils/genericResourceUtils';

@Injectable()
export class ResourceDataModelService {
    constructor(
        @InjectModel(Resource.name, MAIN_CONN)
        private resourceRepository: Model<Resource>,
        @InjectConnection(DATA_CONN) private dataConnection: Connection,
        private resourceUtils: ResourceUtils,
    ) {}

    async getModel(resourceId: string): Promise<Model<ResourceData>> {
        const resource: Resource = await this.resourceRepository.findById(
            resourceId,
        );

        const { collectionName } = resource;
        const cachedModel = this.dataConnection.models?.[collectionName];
        if (cachedModel) return cachedModel;

        const schema = this.buildSchema(resource.fields);

        const model = this.dataConnection.model(
            resource.collectionName,
            schema,
        );

        await this.buildRelationsSchema(
            this.resourceUtils.filterRelationFields(resource.fields),
        );

        return model;
    }

    buildRelationsSchema(
        fields: RelationField[],
    ): Promise<Model<ResourceData>[]> {
        const promises = fields.map((field) => {
            const resourceId = field.options.resourceId;

            return this.getModel(resourceId);
        });

        return Promise.all(promises);
    }

    buildSchema(fields: ResourceField[]): Schema<ResourceData> {
        const schemaFields: SchemaDefinition = {};

        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];

            switch (field.type) {
                case 'relation': {
                    const relationRef = field.options.collectionName;

                    if (field.options.type === 'many-to-one') {
                        schemaFields[field.name] = {
                            type: Schema.Types.ObjectId,
                            ref: relationRef,
                        };
                    } else {
                        schemaFields[field.name] = [
                            {
                                type: Schema.Types.ObjectId,
                                ref: relationRef,
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
}
