import {
    NumberGeneratorOptions,
    OneOfGeneratorOptions,
} from './generator-options';

interface BaseField {
    name: string;
}

export interface StringField extends BaseField {
    type: 'string';
    options: never;
}
export interface NumberField extends BaseField {
    type: 'number';
    options: NumberGeneratorOptions;
}
export interface OneOfField extends BaseField {
    type: 'oneof';
    options: OneOfGeneratorOptions;
}
export interface BooleanField extends BaseField {
    type: 'boolean';
    options: never;
}

export type ResourceField =
    | StringField
    | NumberField
    | OneOfField
    | BooleanField;
