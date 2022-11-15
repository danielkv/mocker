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

export interface ResourceDataTypeHelper<Options = any, Response = any> {
    generate(options: Options): Response;
}

export type DataTypeHelperProviders = Record<
    ResourceFieldType,
    ResourceDataTypeHelper
>;

export type GeneratorOptionSingleType = boolean | string | number;

export type GeneratorOptionType = Record<string, GeneratorOptionSingleType>;
