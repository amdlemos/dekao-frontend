import Dexie from 'dexie';
import { IUser } from '../_models/user.model';
import { ICustomer } from '../_models/customer.model';

export class DekaoDatabase extends Dexie {
    users: Dexie.Table<IUser, string>;
    customers: Dexie.Table<ICustomer, string>;

    constructor() {
        super('dekaoDb');        
        
        this.version(2).stores({
            users: '_id, username, email, password, lastUpdate',
            customers: '_id, name, cpfCnpj, email, tel, contactName, contactCel, salespeopleId, lastUpdate'
        });


        this.users = this.table('users');
        this.customers = this.table('customers');
    }
}






