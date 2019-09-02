import { ArchitectSituationClass } from '@weflat/core/models/ArchitectSituationClass';
import { ArchitectTypeClass } from '@weflat/core/models/ArchitectTypeClass';
import { PaymentTypeClass } from '@weflat/core/models/PaymentTypeClass';
import { UserClass } from '@weflat/core/models/UserClass';
import { VisitClass } from '@weflat/core/models/VisitClass';
import { ZipCodeClass } from '@weflat/core/models/ZipCodeClass';

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
