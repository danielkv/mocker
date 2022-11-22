import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BaseSchema } from '@shared/db/BaseSchema';

export type UserDocument = User & Document;

@Schema({
    timestamps: true,
    versionKey: false,
})
export class User extends BaseSchema {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, default: false })
    admin: boolean;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true, select: false })
    password: string;
}

export type UserWithoutPassword = Omit<User, 'password'>;

export const UserSchema = SchemaFactory.createForClass(User);
