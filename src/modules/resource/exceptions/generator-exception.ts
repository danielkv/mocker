export class GeneratorException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'GENERATOR_EXCEPTION';
    }
}
