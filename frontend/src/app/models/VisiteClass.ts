import { ZipCodeClass } from 'app/models/ZipCodeClass'
import { AcheteurClass } from 'app/models/AcheteurClass';

export class VisiteClass {
    public id: number;
    public acheteur: AcheteurClass;
    public idArchitecte: number;
    public zipCode: ZipCodeClass;
    public city: string;
    public route: string;
    public streetNumber: string;
    public visiteDate: Date;

    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}