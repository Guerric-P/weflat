import { VisitClass } from '@weflat/core/models/VisitClass';

export class DashboardClass {
    newVisits: VisitClass[];
    amountEarned: number;
    doneVisitsCount: number;

    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}
