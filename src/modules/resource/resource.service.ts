import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { FilterQuery, Model } from 'mongoose';

import { MAIN_CONN } from '@shared/db/config';
import {
    buildPaginatedResponse,
    getLimitOffset,
    getPagination,
} from '@shared/helpers/pagination';
import { DeleteResult, PaginatedResponse } from '@shared/interfaces/responses';

import { CreateResourceDto } from './dto/create-resource.dto';
import { ResourceQueryDto } from './dto/resource-fields.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourceService {
    constructor(
        @InjectModel(Resource.name, MAIN_CONN)
        private resourceRepository: Model<Resource>,
    ) {}

    private createResourceCollectionName(
        createResourceDto: CreateResourceDto,
    ): string {
        return `${createResourceDto.projectId}-${createResourceDto.path}`;
    }

    private buildFilterQuery(
        requestQuery?: ResourceQueryDto,
        initialQuery?: FilterQuery<Resource>,
    ): FilterQuery<Resource> {
        const query: FilterQuery<Resource> = initialQuery || {};
        if (requestQuery.name) query.name = { $regex: requestQuery.name };
        if (requestQuery.projectId) query.projectId = requestQuery.projectId;

        return query;
    }

    create(createResourceDto: CreateResourceDto): Promise<Resource> {
        const collectionName =
            this.createResourceCollectionName(createResourceDto);

        return this.resourceRepository.create({
            ...createResourceDto,
            collectionName,
        });
    }

    async findAll(
        requestQuery?: ResourceQueryDto,
    ): Promise<PaginatedResponse<Resource>> {
        const query = this.buildFilterQuery(requestQuery);

        const totalItems = await this.resourceRepository.find(query).exec();

        const pagination = getPagination(requestQuery);
        const { limit, offset } = getLimitOffset(pagination);

        const items = await this.resourceRepository
            .find(query)
            .skip(offset)
            .limit(limit)
            .exec();

        return buildPaginatedResponse(items, totalItems.length, pagination);
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

        return updatedResource;
    }

    remove(id: string): Promise<DeleteResult> {
        return this.resourceRepository.deleteOne({ _id: id }).exec();
    }
}
