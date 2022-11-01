import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ResourceFieldType } from '../interfaces/data-generator';

export type ResourceDocument = ResourceField & Document;

@Schema({
    timestamps: false,
    versionKey: false,
    _id: false,
})
export class ResourceField {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    type: ResourceFieldType;

    @Prop({ required: false })
    options?: string;
}

export const ResourceFieldSchema = SchemaFactory.createForClass(ResourceField);
