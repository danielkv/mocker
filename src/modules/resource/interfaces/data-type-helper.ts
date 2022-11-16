import { DataType } from '../interfaces/data-type';

export interface ResourceDataTypeHelper<
    Field extends DataType.Field = DataType.Field,
    Value = any,
> {
    /**
     * Checks if the value meets the requirements of the data type.
     * Throws a FieldValidationException in case is not valid
     * Returns true in case of valid
     *
     * @param value Value of the field
     * @param options Field options
     */
    validate(value: Value, field: Field, update: boolean): boolean;

    /**
     * Generate the random data from options and field type
     *
     * @param value Value of the field
     * @param field Field options
     */
    generate(field: Field): Value;
}

export type DataTypeHelperProviders = Record<
    DataType.FieldType,
    ResourceDataTypeHelper
>;
