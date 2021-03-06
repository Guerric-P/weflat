import { PositionClass } from '@weflat/app/core/models/PositionClass';

export class RenovationClass {
    public id: number;
    public position: PositionClass;
    public condition: number;
    public remarks: string;
    public estimatedWork: number;

    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}
