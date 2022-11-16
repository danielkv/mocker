export class DataValidationException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DATA_VALIDATOR_EXCEPTION';
    }
}
