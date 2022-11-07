export interface NumberGeneratorOptions {
    min: number;
    max: number;
}

export interface OneOfGeneratorOptions {
    values: string[];
}

export type RelationTypeOption = 'many-to-one' | 'one-to-many';
export interface ReleationGeneratorOptions {
    type: RelationTypeOption;
    resourceId: string;
    relationFieldName: string;
}

export type FieldOptions = NumberGeneratorOptions | OneOfGeneratorOptions;
