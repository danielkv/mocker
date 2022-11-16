export class DataValidationException extends Error {
    constructor(readonly errors: string[]) {
        super('Some fields are not valid');

        this.name = 'DATA_VALIDATION_EXCEPTION';
    }
}
