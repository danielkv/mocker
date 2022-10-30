import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/shared/BaseSchema';

export type ProjectDocument = Project & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Project extends BaseSchema {
  @Prop()
  name: string;

  @Prop()
  path: string;

  @Prop()
  userId: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
