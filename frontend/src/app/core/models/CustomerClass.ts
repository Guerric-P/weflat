import { UserClass } from '@weflat/app/core/models/UserClass';

export class CustomerClass extends UserClass {
    public project: string;

    constructor(obj?: any) {
        super();
        Object.assign(this, obj);
    }
}
