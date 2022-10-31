import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
  type: string;
}

export const ResourceFieldSchema = SchemaFactory.createForClass(ResourceField);
