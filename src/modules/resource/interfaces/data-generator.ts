export type ResourceFieldType =
    | 'string'
    | 'oneof'
    | 'number'
    | 'boolean'
    | 'relation';

export const ResourceFieldTypeArr: ResourceFieldType[] = [
    'string',
    'oneof',
    'number',
    'boolean',
    'relation',
];

export interface DataGenerator<Options = any, Response = any> {
    generate(options: Options): Response;
}

export type DataGeneratorProvider = Record<ResourceFieldType, DataGenerator>;

export type GeneratorOptionSingleType = boolean | string | number;

export type GeneratorOptionType = Record<string, GeneratorOptionSingleType>;
