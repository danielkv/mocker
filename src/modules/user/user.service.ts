import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userRepository: Model<User>,
    ) {}

    create(createUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.create(createUserDto);
    }

    findAll() {
        return this.userRepository.find();
    }

    findOne(id: string) {
        return this.userRepository.findById(id);
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        return this.userRepository.updateOne({ _id: id }, updateUserDto);
    }

    remove(id: string) {
        return this.userRepository.deleteOne({ _id: id });
    }
}
