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
    public status: number;
    public annoucementUrl: string;

    formattedAddress() {
        return this.streetNumber
        + ', '
        + this.route
        + ' - '
        + this.zipCode.number
        + ' '
        + this.city;
    }

    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}