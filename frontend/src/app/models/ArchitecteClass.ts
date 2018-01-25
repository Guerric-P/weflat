import { UserClass } from "app/models/UserClass";
import { ArchitectSituationClass } from "app/models/ArchitectSituationClass";
import { ArchitectTypeClass } from "app/models/ArchitectTypeClass";
import { ZipCodeClass } from "app/models/ZipCodeClass";
import { VisiteClass } from "app/models/visiteclass";

export class ArchitecteClass extends UserClass{
    public webSite : String;
    public architectsOrder : boolean;
    public cfai : boolean;
    public professionalResponsibility : boolean;
    public decennialInsurance : boolean;
    public motivation : String;
    public practicingSince : Date;
    public type : ArchitectTypeClass;
    public zipCodes : ZipCodeClass[];
    public visites : VisiteClass[];
    public potentialVisites : VisiteClass[];
    public situation: ArchitectSituationClass;

    constructor(obj?: any) {
        super();
        Object.assign(this, obj);
    }
}