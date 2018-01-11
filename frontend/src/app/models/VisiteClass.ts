import { ZipCodeClass } from 'app/models/ZipCodeClass'
import { AcheteurClass } from 'app/models/AcheteurClass';

export class VisiteClass {
    id: number;
    acheteur: AcheteurClass;
    idArchitecte: number;
    zipCode: ZipCodeClass;
    city: string;
    route: string;
    streetNumber: string;
    visiteDate: Date;
}