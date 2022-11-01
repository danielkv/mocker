import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BaseSchema } from '@shared/db/BaseSchema';

export type ProjectDocument = Project & Document;

@Schema({
    timestamps: true,
    versionKey: false,
})
export class Project extends BaseSchema {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    path: string;

    @Prop({ required: true })
    userId: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
