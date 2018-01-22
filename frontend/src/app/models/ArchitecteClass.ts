import { UserClass } from "app/models/UserClass";
import { ArchitectSituationClass } from "app/models/ArchitectSituationClass";
import { ArchitectTypeClass } from "app/models/ArchitectTypeClass";
import { ZipCodeClass } from "app/models/ZipCodeClass";
import { VisiteClass } from "app/models/visiteclass";

export class ArchitecteClass extends UserClass{
    webSite : String;
    architectsOrder : boolean;
    cfai : boolean;
    professionalResponsibility : boolean;
    decennialInsurance : boolean;
    motivation : String;
    practicingSince : Date;
    order : ArchitectSituationClass;
    type : ArchitectTypeClass;
    zipCodes : ZipCodeClass[];
    visites : VisiteClass[];
    potentialVisites : VisiteClass[];
}