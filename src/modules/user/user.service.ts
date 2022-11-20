import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { omit } from 'radash';

import { MAIN_CONN } from '@shared/db/config';
import { DeleteResult } from '@shared/interfaces/responses';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserWithoutPassword } from './entities/user.entity';

@Injectable()
export class UserService {
    readonly saltRounds = 10;

    constructor(
        @InjectModel(User.name, MAIN_CONN)
        private userRepository: Model<User>,
    ) {}

    private async hidrateUserData(data: CreateUserDto | UpdateUserDto) {
        if (!data.password) return data;

        const hash = await bcrypt.hash(data.password, this.saltRounds);

        return { ...data, password: hash };
    }

    async create(createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
        const hidratedUserData = await this.hidrateUserData(createUserDto);

        const createdUser = await this.userRepository.create(hidratedUserData);

        return omit(createdUser, ['password']);
    }

    findByEmail(email: string): Promise<User> {
        return this.userRepository
            .findOne({ email })
            .select('+password')
            .lean()
            .exec();
    }

    findAll(): Promise<UserWithoutPassword[]> {
        return this.userRepository.find().exec();
    }

    findOne(id: string): Promise<UserWithoutPassword> {
        return this.userRepository.findById(id).exec();
    }

    async update(
        id: string,
        updateUserDto: UpdateUserDto,
    ): Promise<UserWithoutPassword> {
        const hidratedUserData = await this.hidrateUserData(updateUserDto);

        const updatedUser = await this.userRepository
            .findByIdAndUpdate(id, hidratedUserData, { new: true })
            .lean()
            .exec();

        return omit(updatedUser, ['password']);
    }

    remove(id: string): Promise<DeleteResult> {
        return this.userRepository.deleteOne({ _id: id }).exec();
    }
}
