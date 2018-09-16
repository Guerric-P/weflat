import { VisitClass } from "./VisitClass";

export class DashboardClass {
    newVisits: VisitClass[];
    amountEarned: number;
    doneVisitsCount: number;

    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}