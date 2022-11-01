import { SchemaDefinitionProperty, SchemaType } from 'mongoose';

export type ResourceFieldType = 'string' | 'list' | 'number';

export const ResourceFieldTypeArr: ResourceFieldType[] = [
    'string',
    'list',
    'number',
];

export interface DataGenerator<T = any> {
    generate(options?: string): T;
}

export type DataGeneratorProvider = Record<ResourceFieldType, DataGenerator>;

export type GenericResourceSchema = Record<string, SchemaDefinitionProperty>;

export type GeneratorOptionSingleType = boolean | string | number;

export type GeneratorOptionType = Record<string, GeneratorOptionSingleType>;
