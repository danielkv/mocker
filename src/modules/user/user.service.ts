import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { MAIN_CONN } from '@shared/db/config';
import { DeleteResult } from '@shared/interfaces/responses';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name, MAIN_CONN)
        private userRepository: Model<User>,
    ) {}

    create(createUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.create(createUserDto);
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find().exec();
    }

    findOne(id: string): Promise<User> {
        return this.userRepository.findById(id).exec();
    }

    update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return this.userRepository.findByIdAndUpdate(id, updateUserDto).exec();
    }

    remove(id: string): Promise<DeleteResult> {
        return this.userRepository.deleteOne({ _id: id }).exec();
    }
}
