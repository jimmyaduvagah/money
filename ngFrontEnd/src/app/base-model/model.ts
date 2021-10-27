export class BaseModel {
    constructor(public id: number, public modified_on: Date, public created_on: Date,
        public modified_by: string,  public created_by: string) {
    }
}

export class User {
    constructor(
        public firstName: string, public lastName: string,
        public email: string, public passWord?: string,
        public gender?: string,
        public otherName?: string, public phoneNumber?: string
        )
        { }       
}



export interface LoginUser {
    firstName?: string;
    lastName?: string;
    email?: string;
    access?: string;
    refresh?: string;
}

export interface Token {
    access: string;
    refresh: string;
  }
