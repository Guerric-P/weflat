export class ZipCodeClass {
    public id: number;
    public number: string;

    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}