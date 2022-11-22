import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Schema as SchemaTypes } from 'mongoose';

import { BaseSchema } from '@shared/db/BaseSchema';

import { DataType } from '../interfaces/data-type';

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
    fields: DataType.Field[];

    @Prop({ required: true })
    projectId: string;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    collectionName: string;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
