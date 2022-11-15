import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { MAIN_CONN } from '@shared/db/config';
import { DeleteResult } from '@shared/interfaces/responses';

import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';
import { ResourceField } from './interfaces/resource-field';
import { ResourceUtils } from './utils/genericResourceUtils';

@Injectable()
export class ResourceService {
    constructor(
        @InjectModel(Resource.name, MAIN_CONN)
        private resourceRepository: Model<Resource>,

        private genericResourceUtils: ResourceUtils,
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

        return updatedResource;
    }

    remove(id: string): Promise<DeleteResult> {
        return this.resourceRepository.deleteOne({ _id: id }).exec();
    }
}
