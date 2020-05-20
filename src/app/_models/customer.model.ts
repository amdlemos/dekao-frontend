export class Customer implements ICustomer{
    id?: string;
    name: string;
    cpfCnpj: string;
    email: string;
    tel: string;
    contactName: string;
    contactCel: string;
    salespeopleId: string;
    lastUpdate: string;
}

export interface ICustomer {
    id?: string,
    name: string,
    cpfCnpj: string,
    email: string,
    tel: string,
    contactName: string,
    contactCel: string,
    salespeopleId: string,
    lastUpdate: string
}
