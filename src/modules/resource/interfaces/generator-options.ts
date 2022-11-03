export interface NumberGeneratorOptions {
    min: number;
    max: number;
}

export interface OneOfGeneratorOptions {
    values: string[];
}

export type FieldOptions = NumberGeneratorOptions | OneOfGeneratorOptions;
