import { AcheteurClass } from "./AcheteurClass";
import { ArchitecteClass } from "./ArchitecteClass";
import { ZipCodeClass } from "./ZipCodeClass";

export class VisiteClass {
    public id: number;
    public acheteur: AcheteurClass;
    public architecte: ArchitecteClass;
    public idArchitecte: number;
    public zipCode: ZipCodeClass;
    public city: string;
    public route: string;
    public streetNumber: string;
    public visiteDate: Date;
    public status: number;
    public announcementUrl: string;

    get formattedAddress() {
        try {
            return this.streetNumber
                + ', '
                + this.route
                + ' - '
                + this.zipCode.number
                + ' '
                + this.city;
        }
        catch (err) {
            // Ignore
        }
    }

    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}