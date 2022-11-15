export class DataGeneratorException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DATA_GENERATOR_EXCEPTION';
    }
}
