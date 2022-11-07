import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { FilterQuery, Model } from 'mongoose';

import { MAIN_CONN } from '@shared/db/config';
import { DeleteResult } from '@shared/interfaces/responses';

import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';
import {
    RelationTypeOption,
    ReleationGeneratorOptions,
} from './interfaces/generator-options';
import { RelationField, ResourceField } from './interfaces/resource-field';
import { GenericResourceUtils } from './utils/genericResourceUtils';

@Injectable()
export class ResourceRelationService {
    constructor(
        @InjectModel(Resource.name, MAIN_CONN)
        private resourceRepository: Model<Resource>,
        private genericResourceUtils: GenericResourceUtils,
    ) {}

    addThirdParty(
        currentResource: Resource,
        currentField: RelationField,
    ): Promise<Resource> {
        const thirdPartyField = this.buildThidPartyRelationField(
            currentResource,
            currentField,
        );

        return this.resourceRepository
            .findByIdAndUpdate(currentField.options.resourceId, {
                $push: { fields: thirdPartyField },
            })
            .exec();
    }

    private async updateRelations(currentResource: Resource): Promise<void> {
        const { _id: currentResourceId, fields } = currentResource;

        const relationFields =
            this.genericResourceUtils.filterRelationFields(fields);

        const thirdPartyResources: Resource[] = await this.resourceRepository
            .find({
                'fields.type': 'relation',
                'fields.options.resourceId': currentResourceId,
                'fields.name': {
                    $in: relationFields.map(
                        (field) => field.options.relationFieldName,
                    ),
                },
            })
            .exec();

        const fieldsToAdd = relationFields.filter((field) => {
            return thirdPartyResources.some((resource) => {
                const thirdPartyRelationFields =
                    this.genericResourceUtils.filterRelationFields(
                        resource.fields,
                    );

                return !(
                    resource._id === field.options.resourceId &&
                    thirdPartyRelationFields.find(
                        (relationField) =>
                            relationField.options.relationFieldName ===
                            field.name,
                    )
                );
            });
        });

        // add relation to the third party resource
        if (fieldsToAdd.length) {
            await Promise.all(
                fieldsToAdd.map((field) => {
                    return this.addThirdParty(currentResource, field);
                }),
            );
        }

        const relations: Resource[] = await this.resourceRepository
            .find({
                'fields.type': 'relation',
                'fields.options.resourceId': currentResourceId,
                'fields.name': {
                    $nin: relationFields.map(
                        (field) => field.options.relationFieldName,
                    ),
                },
            })
            .exec();

        if (relations.length) {
            // remove relation from third party resource

			await Promise.all(
                fieldsToAdd.map((field) => {
                    return this.removeThirdParty(currentResource._id, {});
                }),
            );
        }
    }

    removeThirdParty(
        currentResourceId: string,
        findField: FilterQuery<RelationField>,
    ): Promise<Resource> {
        return this.resourceRepository
            .findByIdAndUpdate(currentResourceId, {
                $push: { fields: findField },
            })
            .exec();
    }

    private buildThidPartyRelationField(
        currentResource: Resource,
        currentField: RelationField,
    ): RelationField {
        const { _id: currentResourceId } = currentResource;

        const relationThirdPartyOptions: ReleationGeneratorOptions = {
            type:
                currentField.options.type === 'many-to-one'
                    ? 'one-to-many'
                    : 'many-to-one',
            resourceId: currentResourceId,
            relationFieldName: currentField.name,
        };

        return {
            name: currentField.options.relationFieldName,
            type: 'relation',
            options: relationThirdPartyOptions,
        };
    }
}
