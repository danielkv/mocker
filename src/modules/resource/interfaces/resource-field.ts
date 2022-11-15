import {
    NumberDataTypeOptions,
    OneOfDataTypeOptions,
    ReleationDataTypeOptions,
} from './field-options';

interface BaseField {
    name: string;
}

export interface StringField extends BaseField {
    type: 'string';
    options: never;
}
export interface NumberField extends BaseField {
    type: 'number';
    options: NumberDataTypeOptions;
}
export interface OneOfField extends BaseField {
    type: 'oneof';
    options: OneOfDataTypeOptions;
}
export interface BooleanField extends BaseField {
    type: 'boolean';
    options: never;
}
export interface RelationField extends BaseField {
    type: 'relation';
    options: ReleationDataTypeOptions;
}

export type ResourceField =
    | StringField
    | NumberField
    | OneOfField
    | BooleanField
    | RelationField;
