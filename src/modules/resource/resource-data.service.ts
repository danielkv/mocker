import { Injectable } from '@nestjs/common';

import { DeleteResult } from '@shared/interfaces/responses';

import { UpdateResourceDto } from './dto/update-resource.dto';
import { ResourceData } from './interfaces/resources';
import { ResourceService } from './resource.service';
import { GenericResourceUtils } from './utils/genericResourceUtils';

@Injectable()
export class ResourceDataService {
    constructor(
        private readonly resourceService: ResourceService,
        private genericResourceUtils: GenericResourceUtils,
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

        const genericModel = await this.genericResourceUtils.getModel(
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

        const genericModel = await this.genericResourceUtils.getModel(
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

        const genericModel = await this.genericResourceUtils.getModel(
            resource._id,
        );

        const resourceData = await genericModel.findById(resourceDataId).exec();

        return resourceData;
    }

    async update(
        projectId: string,
        resourcePath: string,
        id: string,
        updateUserDto: UpdateResourceDto,
    ): Promise<ResourceData> {
        const resource = await this.resourceService.findOneByProjectIdAndPath(
            projectId,
            resourcePath,
        );

        const genericModel = await this.genericResourceUtils.getModel(
            resource._id,
        );

        const resourceData = genericModel
            .findByIdAndUpdate(id, updateUserDto, {
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

        const genericModel = await this.genericResourceUtils.getModel(
            resource._id,
        );

        const result = await genericModel.deleteOne({ _id: id });

        return result;
    }
}
