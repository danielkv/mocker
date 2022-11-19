import { FieldValidationException } from '../exceptions/field-validation-exception';
import { DataType } from '../interfaces/data-type';

export abstract class ResourceDataBaseHelper {
    validate(value: unknown, field: DataType.Field, update: boolean): boolean {
        if (update && typeof value === 'undefined') return true;

        if (field.options.required === true && typeof value === 'undefined')
            throw new FieldValidationException(
                `Field ${field.name} is required`,
            );

        if (field.options.allowEmpty === false && value === '')
            throw new FieldValidationException(`Field ${field.name} is empty`);

        switch (field.type) {
            case 'boolean':
                if (typeof value !== 'boolean')
                    throw new FieldValidationException(
                        `Field ${field.name} expects a boolean value`,
                    );
                break;
            case 'number':
                if (typeof value !== 'number')
                    throw new FieldValidationException(
                        `Field ${field.name} expects a number value`,
                    );
                break;
            case 'string':
                if (typeof value !== 'string')
                    throw new FieldValidationException(
                        `Field ${field.name} expects a string value`,
                    );
                break;
            default:
                return true;
        }
        return true;
    }
}
