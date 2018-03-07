import { UserClass } from "app/models/UserClass";

export class AcheteurClass extends UserClass {
    public project: string;

    constructor(obj?: any) {
        super();
        Object.assign(this, obj);
    }
}