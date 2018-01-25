export class PositionClass {
    public id: number;
    public label: string;

    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}