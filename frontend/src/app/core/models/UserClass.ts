export class UserClass {
    public id: number;
    public password: string;
    public firstName: string;
    public lastName: string;
    public telephone: string;
    public email: string;
    public birthDate: Date;

    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}
