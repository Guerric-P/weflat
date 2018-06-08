export class PositionClass {
    public id: number;
    public label: string;
    public mandatory: boolean;

    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}
