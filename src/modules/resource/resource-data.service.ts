import { ConsoleLogger, Injectable } from '@nestjs/common';

import { DeleteResult } from '@shared/interfaces/responses';

import { ResourceData } from './interfaces/resources';
import { ResourceDataHelperService } from './resource-data-helper.service';
import { ResourceDataModelService } from './resource-data-model.service';
import { ResourceService } from './resource.service';
import { ResourceUtils } from './utils/genericResourceUtils';

@Injectable()
export class ResourceDataService {
    constructor(
        private readonly resourceService: ResourceService,
        private resourceDataModelService: ResourceDataModelService,
        private resourceUtils: ResourceUtils,
        private resourceDataHelperService: ResourceDataHelperService,
    ) {}

    async create(
        projectId: string,
        resourcePath: string,
        createResourceDto: ResourceData,
    ): Promise<ResourceData> {
        const resource = await this.resourceService.findOneByProjectIdAndPath(
            projectId,
            resourcePath,
        );

        const genericModel = await this.resourceDataModelService.getModel(
            resource._id,
        );

        const resourceData = await genericModel.create(createResourceDto);

        return resourceData;
    }

    async findAll(
        projectId: string,
        resourcePath: string,
    ): Promise<ResourceData[]> {
        const resource = await this.resourceService.findOneByProjectIdAndPath(
            projectId,
            resourcePath,
        );

        const genericModel = await this.resourceDataModelService.getModel(
            resource._id,
        );

        const resourceData = await genericModel.find().exec();

        return resourceData;
    }

    async findOne(
        projectId: string,
        resourcePath: string,
        resourceDataId: string,
    ): Promise<ResourceData> {
        const resource = await this.resourceService.findOneByProjectIdAndPath(
            projectId,
            resourcePath,
        );

        const genericModel = await this.resourceDataModelService.getModel(
            resource._id,
        );

        const resourceQuery = genericModel.findById(resourceDataId);

        const relationFields = this.resourceUtils.filterRelationFields(
            resource.fields,
        );
        relationFields.forEach((field) => {
            if (field.options.populate) resourceQuery.populate(field.name);
        });

        const resourceData = await resourceQuery;

        return resourceData;
    }

    async update(
        projectId: string,
        resourcePath: string,
        id: string,
        data: ResourceData,
    ): Promise<ResourceData> {
        const resource = await this.resourceService.findOneByProjectIdAndPath(
            projectId,
            resourcePath,
        );

        // validation
        this.resourceDataHelperService.validate(resource, data, true);

        const model = await this.resourceDataModelService.getModel(
            resource._id,
        );

        const resourceData = model
            .findByIdAndUpdate(id, data, {
                new: true,
            })
            .exec();

        return resourceData;
    }

    async remove(
        projectId: string,
        resourcePath: string,
        id: string,
    ): Promise<DeleteResult> {
        const resource = await this.resourceService.findOneByProjectIdAndPath(
            projectId,
            resourcePath,
        );

        const genericModel = await this.resourceDataModelService.getModel(
            resource._id,
        );

        const result = await genericModel.deleteOne({ _id: id });

        return result;
    }
}
