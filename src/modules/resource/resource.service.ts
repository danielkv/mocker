import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

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
export class ResourceService {
    constructor(
        @InjectModel(Resource.name, MAIN_CONN)
        private resourceRepository: Model<Resource>,
        private genericResourceUtils: GenericResourceUtils,
    ) {}

    private createResourceCollectionName(
        createResourceDto: CreateResourceDto,
    ): string {
        return `${createResourceDto.projectId}-${createResourceDto.path}`;
    }

    create(createResourceDto: CreateResourceDto): Promise<Resource> {
        const collectionName =
            this.createResourceCollectionName(createResourceDto);

        return this.resourceRepository.create({
            ...createResourceDto,
            collectionName,
        });
    }

    findAll(): Promise<Resource[]> {
        return this.resourceRepository.find().exec();
    }

    findOne(id: string): Promise<Resource> {
        return this.resourceRepository.findById(id).exec();
    }

    findOneByProjectIdAndPath(
        projectId: string,
        resourcePath: string,
    ): Promise<Resource> {
        return this.resourceRepository
            .findOne({ projectId, path: resourcePath })
            .exec();
    }

    async update(
        id: string,
        updateUserDto: UpdateResourceDto,
    ): Promise<Resource> {
        const updatedResource = await this.resourceRepository
            .findByIdAndUpdate(id, updateUserDto, {
                new: true,
            })
            .exec();

        await this.updateRelations(updatedResource);

        return updatedResource;
    }

    private async updateRelations({
        _id: currentResourceId,
        fields,
    }: Resource): Promise<void> {
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
                    const relationThirdPartyOptions: ReleationGeneratorOptions =
                        {
                            type:
                                field.options.type === 'many-to-one'
                                    ? 'one-to-many'
                                    : 'many-to-one',
                            resourceId: currentResourceId,
                            relationFieldName: field.name,
                        };

                    const relationThirdPartyField: RelationField = {
                        name: field.options.relationFieldName,
                        type: 'relation',
                        options: relationThirdPartyOptions,
                    };

                    return this.resourceRepository.findByIdAndUpdate(
                        field.options.resourceId,
                        { $push: { fields: relationThirdPartyField } },
                    );
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
        }
    }

    remove(id: string): Promise<DeleteResult> {
        return this.resourceRepository.deleteOne({ _id: id }).exec();
    }
}
