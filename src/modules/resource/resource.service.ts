import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourceService {
    constructor(
        @InjectModel(Resource.name)
        private userRepository: Model<Resource>,
    ) {}

    create(createUserDto: CreateResourceDto): Promise<Resource> {
        return this.userRepository.create(createUserDto);
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
