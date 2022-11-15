import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { Connection, Model } from 'mongoose';

import { DATA_CONN, MAIN_CONN } from '@shared/db/config';

import { Resource } from '../entities/resource.entity';
import { RelationField, ResourceField } from '../interfaces/resource-field';

@Injectable()
export class ResourceUtils {
    constructor(
        @InjectModel(Resource.name, MAIN_CONN)
        private resourceRepository: Model<Resource>,
        @InjectConnection(DATA_CONN) private dataConnection: Connection,
    ) {}

    filterRelationFields(fields: ResourceField[]): RelationField[] {
        return fields.filter(
            (field): field is RelationField => field.type === 'relation',
        );
    }

    filterNonRelationFields(fields: ResourceField[]): ResourceField[] {
        return fields.filter((field) => field.type !== 'relation');
    }
}
