import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Schema as SchemaTypes } from 'mongoose';

import { BaseSchema } from '@shared/db/BaseSchema';

import { ResourceField } from '../interfaces/resource-field';

export type ResourceDocument = Resource & Document;

@Schema({
    timestamps: true,
    versionKey: false,
})
export class Resource extends BaseSchema {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    path: string;

    @Prop({ type: [SchemaTypes.Types.Mixed], required: true })
    fields: ResourceField[];

    @Prop({ required: true })
    projectId: string;

    @Prop({ required: true })
    collectionName: string;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
