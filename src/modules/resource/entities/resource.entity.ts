import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BaseSchema } from '@shared/db/BaseSchema';

import { ResourceField, ResourceFieldSchema } from './field.entity';

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

    @Prop({ type: [ResourceFieldSchema], required: true })
    fields: ResourceField[];
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
