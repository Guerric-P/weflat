import { RenovationClass } from "app/models/RenovationClass";
import { VisiteClass } from "app/models/visiteclass";

export class ReportClass {
    public id: number;
	public renovations: RenovationClass[];
	public floor: number;
	public generalRemarks: string;
	public orientation: string;;
	public rooms: number;
    public surface: number;
    public visite: VisiteClass;
    public expectations: string;
    public globalQualityRemarks: string;
    public globalCondition: string;
    
    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}

