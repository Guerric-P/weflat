import { UserClass } from "app/models/UserClass";

export class AcheteurClass extends UserClass {
    constructor(obj?: any) {
        super();
        Object.assign(this, obj);
    }
}