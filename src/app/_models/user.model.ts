export class User implements IUser {
    // _id: string;
    // username: string;
    // email: string;
    // password: string;
    // createdDate: string;
    // lastUpdate: string;  

    constructor(
        public _id: string,
        public username: string,
        public email: string,
        public password: string,
        public createdDate: Date,
        public lastUpdate: Date) {

        // _id: username;
        // this.username = username;
        // this.email = email;
        // this.password = password;
        // this.lastUpdate = "";
    }
}

export interface IUser {
    _id: string,
    username: string,
    email: string,
    password: string,
    lastUpdate: Date,
    createdDate: Date
}