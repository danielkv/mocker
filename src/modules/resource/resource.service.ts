import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { MAIN_CONN } from '@shared/db/config';

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

    findAll() {
        return this.userRepository.find();
    }

    findOne(id: string) {
        return this.userRepository.findById(id);
    }

    update(id: string, updateUserDto: UpdateResourceDto) {
        return this.userRepository.findByIdAndUpdate(id, updateUserDto, {
            new: true,
        });
    }

    remove(id: string) {
        return this.userRepository.deleteOne({ _id: id });
    }
}
