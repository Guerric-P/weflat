import { ZipCodeClass } from 'app/models/ZipCodeClass'

export class VisiteClass {
    id: number;
    idAcheteur: number;
    idArchitecte: number;
    zipCode: ZipCodeClass;
    city: string;
    route: string;
    streetNumber: string;
    visiteDate: Date;
}