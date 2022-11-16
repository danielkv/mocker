export class FieldValidationException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'FIELD_VALIDATION_EXCEPTION';
    }
}
