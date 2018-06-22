import { UserClass } from './UserClass';
import { ArchitectTypeClass } from './ArchitectTypeClass';
import { ZipCodeClass } from './ZipCodeClass';
import { VisitClass } from './VisitClass';
import { ArchitectSituationClass } from './ArchitectSituationClass';
import { PaymentTypeClass } from './PaymentTypeClass';

export class ArchitectClass extends UserClass {
    public webSite: String;
    public architectsOrder: boolean;
    public cfai: boolean;
    public professionalResponsibility: boolean;
    public decennialInsurance: boolean;
    public motivation: String;
    public practicingSince: Date;
    public type: ArchitectTypeClass;
    public zipCodes: ZipCodeClass[];
    public visites: VisitClass[];
    public potentialVisites: VisitClass[];
    public situation: ArchitectSituationClass;
    public cgu: boolean;
    public status: number;
    public iban: string;
    public paymentType: PaymentTypeClass;

    constructor(obj?: any) {
        super();
        Object.assign(this, obj);
    }
}
