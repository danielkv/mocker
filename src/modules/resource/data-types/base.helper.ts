export abstract class ResourceDataBaseHelper {
    isRequiredValid(value: unknown, required: boolean): boolean {
        if (required === true && !value) return false;

        return true;
    }
}
