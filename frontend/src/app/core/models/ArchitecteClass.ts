import { UserClass } from "./UserClass";
import { ArchitectTypeClass } from "./ArchitectTypeClass";
import { ZipCodeClass } from "./ZipCodeClass";
import { VisiteClass } from "./VisiteClass";
import { ArchitectSituationClass } from "./ArchitectSituationClass";

export class ArchitecteClass extends UserClass{
    public webSite: String;
    public architectsOrder: boolean;
    public cfai: boolean;
    public professionalResponsibility: boolean;
    public decennialInsurance: boolean;
    public motivation: String;
    public practicingSince: Date;
    public type: ArchitectTypeClass;
    public zipCodes: ZipCodeClass[];
    public visites: VisiteClass[];
    public potentialVisites: VisiteClass[];
    public situation: ArchitectSituationClass;
    public cgu: boolean;
    public status: number;
    public iban: string

    constructor(obj?: any) {
        super();
        Object.assign(this, obj);
    }
}