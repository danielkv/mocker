import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { MAIN_CONN } from '@shared/db/config';
import { DeleteResult } from '@shared/interfaces/responses';

import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourceService {
    constructor(
        @InjectModel(Resource.name, MAIN_CONN)
        private userRepository: Model<Resource>,
    ) {}

    private createResourceCollectionName(
        createResourceDto: CreateResourceDto,
    ): string {
        return `${createResourceDto.projectId}-${createResourceDto.path}`;
    }

    create(createResourceDto: CreateResourceDto): Promise<Resource> {
        const collectionName =
            this.createResourceCollectionName(createResourceDto);

        return this.userRepository.create({
            ...createResourceDto,
            collectionName,
        });
    }

    findAll(): Promise<Resource[]> {
        return this.userRepository.find().exec();
    }

    findOne(id: string): Promise<Resource> {
        return this.userRepository.findById(id).exec();
    }

    findOneByProjectIdAndPath(
        projectId: string,
        resourcePath: string,
    ): Promise<Resource> {
        return this.userRepository
            .findOne({ projectId, path: resourcePath })
            .exec();
    }

    update(id: string, updateUserDto: UpdateResourceDto): Promise<Resource> {
        return this.userRepository
            .findByIdAndUpdate(id, updateUserDto, {
                new: true,
            })
            .exec();
    }

    remove(id: string): Promise<DeleteResult> {
        return this.userRepository.deleteOne({ _id: id }).exec();
    }
}
