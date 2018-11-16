import { makeStateKey } from '@angular/platform-browser';

export class Constantes {
    public static readonly EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    public static readonly ROLE_ARCHITECTE = 'architect';
    public static readonly ROLE_ACHETEUR = 'customer';
    public static readonly ROLE_ADMIN = 'admin';
    public static readonly NOT_FOUND_URL = 'not-found';

    public static readonly SHOULD_NOT_LOAD_CLIENT = makeStateKey('SHOULD_LOAD_CLIENT');
}
