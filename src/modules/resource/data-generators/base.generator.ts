import {
    GeneratorOptionSingleType,
    GeneratorOptionType,
} from '../interfaces/data-generator';

export abstract class BaseGenerator {
    translateTypeOptions(
        options: string,
    ): GeneratorOptionType | GeneratorOptionSingleType {
        // pattern: opt1=value;opt2=value
        const regex = /([a-zA-Z][a-zA-Z\d]*)\=([a-zA-Z\d]*)\;?/g;
        const objectMatch = [...options.matchAll(regex)];

        if (!objectMatch?.length) {
            return this.translateValueType(options);
        }

        return objectMatch.reduce<GeneratorOptionType>((object, option) => {
            const key = option[1];
            const value = this.translateValueType(option[2]);

            object[key] = value;
            return object;
        }, {});
    }

    private translateValueType(value: string): GeneratorOptionSingleType {
        if (value === 'true') return true;
        if (value === 'false') return false;
        if (Number(value) !== NaN) return Number(value);
        return value;
    }
}
