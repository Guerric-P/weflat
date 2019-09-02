import { RenovationClass } from '@weflat/core/models/RenovationClass';
import { VisitClass } from '@weflat/core/models/VisitClass';

export class ReportClass {
    private _visite: VisitClass;
    public id: number;
    public renovations: RenovationClass[];
    public floor: number;
    public generalRemarks: string;
    public orientation: string; ;
    public rooms: number;
    public surface: number;
    public expectations: string;
    public globalQualityRemarks: string;
    public globalCondition: string;

    get visite() {
        return this._visite;
    }

    set visite(obj: any) {
        this._visite = new VisitClass(obj);
    }

    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}

