export class Customer implements ICustomer{
    _id?: string;
    name: string;
    fantasyName: string;    
    subscription: number;    
    phone: number;    
    email: string;    
    //address1th: Address;            
    // contacts: Contact[];    
    // otherAddress: Address[];    
    // legalData: LegalData;

    // sytem data     
    code: string;     
    sellerCode: string;    
    sellerName: string;
    lastUpdate: Date;    
    createdDate: Date;
}

export interface ICustomer {
    _id?: string,
    name: string,
    fantasyName: string;    
    subscription: number;    
    phone: number;    
    email: string;    
    //address1th: Address;            
    // contacts: Contact[];    
    // otherAddress: Address[];    
    // legalData: LegalData;

    // sytem data     
    code: string;     
    sellerCode: string;    
    sellerName: string;      
    lastUpdate: Date;    
    createdDate: Date;
}
