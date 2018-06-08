import { UserClass } from './UserClass';

export class CustomerClass extends UserClass {
    public project: string;

    constructor(obj?: any) {
        super();
        Object.assign(this, obj);
    }
}
