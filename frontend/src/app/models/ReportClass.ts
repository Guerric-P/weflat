import { RenovationClass } from "app/models/RenovationClass";

export class ReportClass {
    public id: number;
	public renovations: RenovationClass[];
	public floor: number;
	public generalRemarks: string;
	public orientation: string;;
	public rooms: number;
    public surface: number;
    
    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}

