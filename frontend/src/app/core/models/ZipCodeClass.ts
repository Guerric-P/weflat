export class ZipCodeClass {
    public id: number;
    public number: string;
    public active: boolean;

    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}