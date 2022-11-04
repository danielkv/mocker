import { SchemaDefinitionProperty } from 'mongoose';

export type ResourceFieldType = 'string' | 'oneof' | 'number' | 'boolean';

export const ResourceFieldTypeArr: ResourceFieldType[] = [
    'string',
    'oneof',
    'number',
    'boolean',
];

export interface DataGenerator<T = any> {
    generate(options?: string): T;
}

export type DataGeneratorProvider = Record<ResourceFieldType, DataGenerator>;

export type GenericResourceSchema = Record<string, SchemaDefinitionProperty>;

export type GeneratorOptionSingleType = boolean | string | number;

export type GeneratorOptionType = Record<string, GeneratorOptionSingleType>;
