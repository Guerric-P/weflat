export class ZipCodeClass {
    public id: number;
    public number: string;
    public active: boolean;
    public county: string;
    public town: string;

    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}
