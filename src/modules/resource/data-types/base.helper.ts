import { DataValidationException } from '../exceptions/data-validation-exception';
import { DataType } from '../interfaces/data-type';

export abstract class ResourceDataBaseHelper {
    validate(value: unknown, field: DataType.Field): boolean {
        if (field.options.required === true && typeof value === 'undefined')
            throw new DataValidationException(
                `Field ${field.name} is required`,
            );

        if (field.options.allowEmpty === false && value === '')
            throw new DataValidationException(`Field ${field.name} is empty`);

        switch (field.type) {
            case 'boolean':
                if (typeof value !== 'boolean')
                    throw new DataValidationException(
                        `Field ${field.name} expects a boolean value`,
                    );
            case 'number':
                if (typeof value !== 'number')
                    throw new DataValidationException(
                        `Field ${field.name} expects a number value`,
                    );
            case 'string':
                if (typeof value !== 'string')
                    throw new DataValidationException(
                        `Field ${field.name} expects a string value`,
                    );
            default:
                return true;
        }
    }
}
