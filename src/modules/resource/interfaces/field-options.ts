export interface NumberDataTypeOptions {
    min: number;
    max: number;
}

export interface OneOfDataTypeOptions {
    values: string[];
}

export type RelationTypeOption = 'many-to-one' | 'one-to-many';
export interface ReleationDataTypeOptions {
    type: RelationTypeOption;
    resourceId: string;
    collectionName: string;
    populate: boolean;
}

export type FieldOptions =
    | NumberDataTypeOptions
    | OneOfDataTypeOptions
    | ReleationDataTypeOptions;
