import { DataType } from '../interfaces/data-type';

export interface ResourceDataTypeHelper<
    Field extends DataType.ResourceField = DataType.ResourceField,
    Value = any,
> {
    /**
     * Checks if the value meets the requirements of the data type.
     * Throws a DataValidationException in case is not valid
     * Returns true in case of valid
     *
     * @param value Value of the field
     * @param options Field options
     */
    validate(value: Value, field: Field): boolean;

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
