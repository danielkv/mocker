export namespace DataType {
    export type FieldType =
        | 'string'
        | 'oneof'
        | 'number'
        | 'boolean'
        | 'relation';

    export const FieldTypeArr: FieldType[] = [
        'string',
        'oneof',
        'number',
        'boolean',
        'relation',
    ];

    // ==================== FIELD OPTIONS

    interface FieldDataTypeBase {
        required: boolean;
    }

    interface StringDataTypeOptions extends FieldDataTypeBase {}
    interface BooleanDataTypeOptions extends FieldDataTypeBase {}

    interface NumberDataTypeOptions extends FieldDataTypeBase {
        min: number;
        max: number;
    }

    interface OneOfDataTypeOptions extends FieldDataTypeBase {
        values: string[];
    }

    type RelationTypeOption = 'many-to-one' | 'one-to-many';
    interface ReleationDataTypeOptions extends FieldDataTypeBase {
        type: RelationTypeOption;
        resourceId: string;
        collectionName: string;
        populate: boolean;
    }

    export type FieldOptions =
        | NumberDataTypeOptions
        | OneOfDataTypeOptions
        | ReleationDataTypeOptions
        | StringDataTypeOptions
        | BooleanDataTypeOptions;

    // ==================== FIELD

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
        options: BooleanDataTypeOptions;
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
}
