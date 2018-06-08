export class Constantes {
    public static get EMAIL_REGEX(): RegExp { return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/ }
    public static get ROLE_ARCHITECTE(): string { return 'architect' }
    public static get ROLE_ACHETEUR(): string { return 'customer' }
    public static get ROLE_ADMIN(): string { return 'admin' }
}
