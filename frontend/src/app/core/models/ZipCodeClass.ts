export class ZipCodeClass {
    public id: number;
    public number: string;
    public active: boolean;
    public county: string;
    public town: string;
    public latitude: number;
    public longitude: number;
    public marker: any;

    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}
