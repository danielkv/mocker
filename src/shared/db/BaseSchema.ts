import { ObjectId } from 'mongoose';

export abstract class BaseSchema {
    _id: ObjectId;

    createdAt: Date;

    updatedAt: Date;
}
